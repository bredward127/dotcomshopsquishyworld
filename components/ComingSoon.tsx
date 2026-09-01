import Link from 'next/link';

/**
 * Honest placeholder for routes that exist but are not populated yet.
 *
 * There is deliberately no signup form or contact link here: no submission
 * endpoint or monitored inbox exists yet, and a form that discards what people
 * type is worse than no form at all.
 */
export default function ComingSoon({
  what,
  detail,
}: {
  what: string;
  detail: string;
}) {
  return (
    <div className="rounded-card border border-mist-400 bg-mist-200 px-6 py-10 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-teal">In progress</p>
      <h2 className="mt-2 text-xl font-semibold text-navy">{what} is not published yet</h2>
      <p className="mx-auto mt-3 max-w-prose leading-relaxed text-ink-muted">{detail}</p>
      <p className="mx-auto mt-4 max-w-prose text-sm leading-relaxed text-ink-muted">
        There is no sign-up form on this page yet. Once there is a monitored inbox to receive
        messages, a real contact path will be added here rather than a placeholder.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-900"
      >
        Back to home
      </Link>
    </div>
  );
}
