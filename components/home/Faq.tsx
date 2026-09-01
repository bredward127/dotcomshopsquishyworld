import Link from 'next/link';

/**
 * Native details/summary: keyboard accessible and screen-reader friendly with
 * no JavaScript, which keeps the home page static and fast.
 */
const faqs = [
  {
    q: 'What is a sensory diet?',
    a: (
      <>
        It is a term used in occupational therapy for a planned set of everyday activities and
        adjustments meant to help someone stay comfortable and focused through the day. Despite the
        name it has nothing to do with food. The approach is associated with the work of
        occupational therapist Patricia Wilbarger. A plan like this is normally put together with a
        qualified professional who knows the individual, because what helps one person may not suit
        another.
      </>
    ),
  },
  {
    q: 'Is this medical advice?',
    a: (
      <>
        No. Everything here is general education. This site does not assess anyone, does not
        diagnose, and does not provide treatment or emergency help. For questions about a specific
        person, speak with a licensed professional. If someone is in immediate danger, contact local
        emergency services.
      </>
    ),
  },
  {
    q: 'How do provider listings work?',
    a: (
      <>
        The directory is still being built and no listings are published yet. When it opens,
        providers will appear only if they have agreed to be listed and their details have been
        confirmed. Listings will describe what a practice says it offers — they are not a review, a
        rating, or a check of clinical quality, and not every listed provider will have been vetted
        beyond confirming basic details. Any paid placement will be labeled as paid. See the{' '}
        <Link href="/disclosure" className="underline underline-offset-4 hover:text-navy">
          disclosure page
        </Link>
        .
      </>
    ),
  },
  {
    q: 'Is the site free for families?',
    a: (
      <>
        Yes. Reading the site and using the directory is free, with no account required. Nothing is
        currently for sale here. If that ever changes, it will be stated plainly on the{' '}
        <Link href="/disclosure" className="underline underline-offset-4 hover:text-navy">
          disclosure page
        </Link>{' '}
        before it goes live.
      </>
    ),
  },
];

export default function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="mx-auto max-w-content px-4 py-14 sm:px-6 sm:py-16">
      <h2 id="faq-heading" className="text-2xl font-bold text-navy sm:text-3xl">
        Common questions
      </h2>

      <div className="mt-8 max-w-prose divide-y divide-mist-400 border-y border-mist-400">
        {faqs.map((faq) => (
          <details key={faq.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy">
              {faq.q}
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
                className="shrink-0 text-teal transition-transform group-open:rotate-45"
              >
                <path d="M9 4v10M4 9h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
