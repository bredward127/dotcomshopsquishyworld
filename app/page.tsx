import Link from 'next/link';
import PathCards from '@/components/home/PathCards';
import HowItWorks from '@/components/home/HowItWorks';
import ExternalResources from '@/components/home/ExternalResources';
import LocalFocus from '@/components/home/LocalFocus';
import Faq from '@/components/home/Faq';

export default function HomePage() {
  return (
    <>
      <section className="border-b border-mist-400">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-24">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-teal">
            Metro Detroit and Southeast Michigan
          </p>
          <h1 className="max-w-prose text-4xl font-bold leading-[1.1] text-navy sm:text-5xl">
            Find a practical next step for sensory support.
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-muted">
            Helping families, adults, and educators find educational resources, relevant videos, and
            local support options in Southeast Michigan.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/ask"
              className="rounded-md bg-navy px-6 py-3 text-center text-sm font-semibold text-white hover:bg-navy-900"
            >
              Ask a question
            </Link>
            <Link
              href="/find-help"
              className="rounded-md border border-navy px-6 py-3 text-center text-sm font-semibold text-navy hover:bg-mist"
            >
              Find local help
            </Link>
          </div>
        </div>
      </section>

      <PathCards />
      <HowItWorks />
      <ExternalResources />
      <LocalFocus />
      <Faq />
    </>
  );
}
