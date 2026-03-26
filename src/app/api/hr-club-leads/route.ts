import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/db/index";
import { hrClubLeads, siteSettings } from "@/db/schema";

type Payload = {
  locale?: string;
  sourcePath?: string;
  name?: string;
  email?: string;
  phone?: string;
  inquiryType?: string;
  message?: string;
  consent?: boolean;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function notifyLead(recipient: string | null, payload: Payload) {
  if (!recipient) return;
  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL;
  if (!resendKey || !resendFrom) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFrom,
      to: [recipient],
      subject: `New HR-Club lead: ${payload.name ?? "Unknown"}`,
      text: [
        `Name: ${payload.name ?? ""}`,
        `Email: ${payload.email ?? ""}`,
        `Phone: ${payload.phone ?? ""}`,
        `Type: ${payload.inquiryType ?? ""}`,
        `Locale: ${payload.locale ?? ""}`,
        `Source: ${payload.sourcePath ?? ""}`,
        "",
        payload.message ?? "",
      ].join("\n"),
    }),
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Payload;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const inquiryType = String(body.inquiryType ?? "").trim();
    const message = String(body.message ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const locale = String(body.locale ?? "en").trim();
    const sourcePath = String(body.sourcePath ?? "").trim() || `/${locale}/hr-club`;
    const consent = body.consent === true;

    if (!name || name.length < 2 || name.length > 80) {
      return NextResponse.json({ message: "Invalid name" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }
    if (!inquiryType) {
      return NextResponse.json({ message: "Inquiry type is required" }, { status: 400 });
    }
    if (!message || message.length < 10 || message.length > 2000) {
      return NextResponse.json({ message: "Message must be 10-2000 characters" }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ message: "Consent is required" }, { status: 400 });
    }

    let recipient = process.env.HR_CLUB_RECIPIENT_EMAIL ?? process.env.CONTACT_EMAIL ?? null;
    let persisted = false;
    if (isDatabaseConfigured()) {
      try {
        const db = getDb();
        const now = new Date().toISOString();
        await db.insert(hrClubLeads).values({
          createdAt: now,
          updatedAt: now,
          locale,
          sourcePath,
          name,
          email,
          phone: phone || null,
          inquiryType,
          message,
          consent,
          status: "new",
          internalNotes: null,
          contactedAt: null,
          closedAt: null,
        });
        persisted = true;

        const settings = await db.select().from(siteSettings).where(eq(siteSettings.id, 1)).limit(1);
        recipient = settings[0]?.hrClubRecipientEmail ?? recipient;
      } catch (err) {
        console.error("HR-Club lead DB write failed:", err);
        return NextResponse.json(
          { message: "We could not save your request right now. Please try again in a moment." },
          { status: 503 }
        );
      }
    } else {
      // If database is intentionally unavailable, keep email fallback behavior.
      persisted = false;
    }
    await notifyLead(recipient, { locale, sourcePath, name, email, phone, inquiryType, message });

    return NextResponse.json({ success: true, persisted });
  } catch {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
