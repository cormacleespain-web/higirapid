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
  /** When set, lead is tied to a service (Our Services / booking). */
  serviceSlug?: string;
  serviceTitle?: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type NotifyResult = { sent: boolean; resendId?: string };

const DEFAULT_RESEND_TEMPLATE_SERVICE = "higirapid-enquiry-template";
const DEFAULT_RESEND_TEMPLATE_HR_CLUB = "hr-club-enquiry";

/** Absolute URL for template "Source" links; falls back to path if no public base URL is set. */
function sourceUrlForTemplate(sourcePath: string): string {
  const path = String(sourcePath ?? "").trim();
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const base = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "");
  if (!base) return path.startsWith("/") ? path : `/${path}`;
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

/**
 * Keys match published Resend templates (hr-club-enquiry, higirapid-enquiry-template).
 * Avoid bare `EMAIL` / `FIRST_NAME` / `LAST_NAME` — those are reserved by Resend.
 */
function buildTemplateVariables(payload: Payload, submittedAtIso: string): Record<string, string> {
  const serviceSlug = String(payload.serviceSlug ?? "").trim();
  const serviceTitle = String(payload.serviceTitle ?? "").trim();
  return {
    SUBMITTER_NAME: String(payload.name ?? ""),
    SUBMITTER_EMAIL: String(payload.email ?? ""),
    PHONE: String(payload.phone ?? "").trim(),
    ENQUIRY_TYPE: String(payload.inquiryType ?? ""),
    MESSAGE: String(payload.message ?? ""),
    LOCALE: String(payload.locale ?? ""),
    SOURCE_URL: sourceUrlForTemplate(String(payload.sourcePath ?? "")),
    SERVICE_SLUG: serviceSlug,
    SERVICE_TITLE: serviceTitle,
    SUBMITTED_AT: submittedAtIso,
  };
}

/** Sends via Resend (published templates). Check server logs for recipient, template, Resend id, and API errors. */
async function notifyLead(recipient: string | null, payload: Payload): Promise<NotifyResult> {
  const to = recipient?.trim();
  if (!to) {
    console.warn(
      "[hr-club-leads] Email skipped: no recipient. Set HR_CLUB_RECIPIENT_EMAIL or CONTACT_EMAIL, or Site settings → HR-Club recipient in admin."
    );
    return { sent: false };
  }
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const resendFrom = process.env.RESEND_FROM_EMAIL?.trim();
  if (!resendKey || !resendFrom) {
    console.warn(
      "[hr-club-leads] Email skipped: set RESEND_API_KEY and RESEND_FROM_EMAIL (see .env.example). Resend requires a verified domain or their test sender."
    );
    return { sent: false };
  }
  const serviceSlug = String(payload.serviceSlug ?? "").trim();
  const serviceTitle = String(payload.serviceTitle ?? "").trim();
  const isServiceEnquiry = Boolean(serviceSlug && serviceTitle);
  const templateId = (
    isServiceEnquiry
      ? process.env.RESEND_TEMPLATE_SERVICE?.trim() || DEFAULT_RESEND_TEMPLATE_SERVICE
      : process.env.RESEND_TEMPLATE_HR_CLUB?.trim() || DEFAULT_RESEND_TEMPLATE_HR_CLUB
  );
  const subject = isServiceEnquiry
    ? `Service inquiry: ${serviceTitle} — ${payload.name ?? "Unknown"}`
    : `New HR-Club lead: ${payload.name ?? "Unknown"}`;
  const submittedAtIso = new Date().toISOString();
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resendFrom,
        to: [to],
        reply_to: payload.email,
        subject,
        template: {
          id: templateId,
          variables: buildTemplateVariables(payload, submittedAtIso),
        },
      }),
    });
    const json = (await res.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
      name?: string;
    };
    if (!res.ok) {
      console.error("[hr-club-leads] Resend API rejected send:", res.status, JSON.stringify(json));
      return { sent: false };
    }
    const resendId = typeof json.id === "string" ? json.id : undefined;
    if (resendId) {
      console.info(
        `[hr-club-leads] Resend accepted → to=${to} template=${templateId} id=${resendId}`
      );
    } else {
      console.warn("[hr-club-leads] Resend returned OK but no id in body (unexpected):", JSON.stringify(json));
    }
    return { sent: true, resendId };
  } catch (e) {
    console.error("[hr-club-leads] Resend request failed:", e);
    return { sent: false };
  }
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
    const serviceSlug = String(body.serviceSlug ?? "").trim() || null;
    const serviceTitle = String(body.serviceTitle ?? "").trim() || null;

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
          serviceSlug,
          message,
          consent,
          status: "new",
          internalNotes: null,
          contactedAt: null,
          closedAt: null,
        });
        persisted = true;

        const settings = await db.select().from(siteSettings).where(eq(siteSettings.id, 1)).limit(1);
        // Empty string in DB must not override env (?? only replaces null/undefined).
        const fromDb = settings[0]?.hrClubRecipientEmail?.trim();
        recipient = fromDb || recipient;
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
    const { sent: emailSent, resendId } = await notifyLead(recipient, {
      locale,
      sourcePath,
      name,
      email,
      phone,
      inquiryType,
      message,
      serviceSlug: serviceSlug ?? undefined,
      serviceTitle: serviceTitle ?? undefined,
    });

    if (!persisted && !emailSent) {
      console.error("[hr-club-leads] Lead lost: database unavailable or save failed, and email was not sent.");
      return NextResponse.json(
        {
          message:
            "We could not save or email your request from this server. Please contact us via WhatsApp or try again later.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true as const,
      persisted,
      emailSent,
      ...(resendId ? { resendEmailId: resendId } : {}),
    });
  } catch {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
