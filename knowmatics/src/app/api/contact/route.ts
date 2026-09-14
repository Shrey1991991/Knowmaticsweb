import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Handles both the general Contact form and the Submit-a-Press-Release form
 * (they share a shape, distinguished by `formType`).
 *
 * This validates input and returns success, but does not yet deliver the
 * message anywhere. To go live, either:
 *   - Send an email via Resend/Postmark/SendGrid from here, or
 *   - Forward `payload` to a Sanity "submission" document so it shows up
 *     in the Studio for review.
 */
export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  const name = typeof payload?.name === "string" ? payload.name.trim() : "";
  const email = typeof payload?.email === "string" ? payload.email.trim() : "";
  const message = typeof payload?.message === "string" ? payload.message.trim() : "";
  const formType = payload?.formType === "press-release" ? "press-release" : "contact";

  if (!name || !EMAIL_RE.test(email) || !message) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name, a valid email, and a message." },
      { status: 400 }
    );
  }

  // TODO: send this on to email/Sanity. Logged for now so nothing is lost silently.
  console.log(`[contact:${formType}]`, { name, email, company: payload?.company, message });

  return NextResponse.json({ ok: true });
}
