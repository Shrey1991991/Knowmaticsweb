import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter signup endpoint.
 *
 * This validates the email and returns success, but does not yet send it
 * anywhere — no email service provider is connected. To go live, plug in
 * one of these here (pick one, add its API key to .env.local):
 *   - Mailchimp: https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/
 *   - Brevo (Sendinblue): https://developers.brevo.com/reference/createcontact
 *   - ConvertKit: https://developers.convertkit.com/#create-a-subscriber
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  // TODO: forward `email` to your email service provider here.
  console.log("[newsletter] signup:", email);

  return NextResponse.json({ ok: true });
}
