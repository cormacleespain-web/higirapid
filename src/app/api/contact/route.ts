import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, message } = body;

    if (!name || typeof name !== "string" || !email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 }
      );
    }

    // Optional: send email via Resend, SendGrid, or Formspree.
    // For now we just validate and return success. Set CONTACT_EMAIL or use Formspree URL in env.
    const contactEmail = process.env.CONTACT_EMAIL;
    if (contactEmail) {
      // TODO: integrate with your email provider
      // await sendEmail({ to: contactEmail, subject: `HigiRapid: ${service || "Contact"}`, body: `${name} <${email}>: ${message || ""}` });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
