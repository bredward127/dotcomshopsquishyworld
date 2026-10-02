import { NextResponse } from 'next/server';

/**
 * Lead intake. Validates, then forwards to LEAD_WEBHOOK_URL (Zapier, Make,
 * Slack, a CRM, Formspree...). Nothing is logged or stored here, so personal
 * details never sit in server logs. Without a webhook configured it says so
 * honestly instead of pretending the message was sent.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = 2000;

export async function POST(request: Request) {
  const webhook = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!webhook) {
    return NextResponse.json({ error: 'This form is not connected yet. Please contact us directly.' }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const str = (k: string) => (typeof body[k] === 'string' ? (body[k] as string).trim().slice(0, MAX) : '');
  const lead = {
    formId: str('formId'),
    name: str('name'),
    email: str('email'),
    phone: str('phone'),
    message: str('message'),
    consent: body.consent === 'yes',
    submittedAt: new Date().toISOString(),
  };

  if (!lead.name || !EMAIL_RE.test(lead.email)) {
    return NextResponse.json({ error: 'Please add your name and a valid email.' }, { status: 400 });
  }
  if (!lead.consent) {
    return NextResponse.json({ error: 'Please tick the consent box so we can reply.' }, { status: 400 });
  }

  const res = await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) }).catch(() => null);
  if (!res || !res.ok) {
    return NextResponse.json({ error: 'We could not send that just now. Please try again.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
