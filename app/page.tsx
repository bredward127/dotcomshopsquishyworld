import Link from 'next/link';
import { navGroups } from '@/lib/nav';
import { site } from '@/lib/site';
import Disclaimer from '@/components/Disclaimer';

export default function HomePage() {
  return (
    <>
      <section className="border-b border-mist-400 bg-mist">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-24">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-teal">
            {site.region}
          </p>
          <h1 className="max-w-prose text-4xl font-bold leading-tight text-navy sm:text-5xl">
            Find sensory support information close to home
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-muted">
            Sensory Access Michigan is a starting point for families, educators, and adults looking
            for clear information about sensory processing and for services in their own region.
            Everything here is written in plain language, and every outside link is labeled so you
            know where it goes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/families"
              className="rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy-900"
            >
              Start here
            </Link>
            <Link
              href="/resources"
              className="rounded-md border border-navy px-6 py-3 text-sm font-semibold text-navy hover:bg-white"
            >
              Browse resources
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-navy">Where to go next</h2>
        <p className="mt-3 max-w-prose leading-relaxed text-ink-muted">
          Four sections, depending on what you are looking for.
        </p>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {navGroups.map((group) => (
            <li
              key={group.href}
              className="rounded-card border border-mist-400 p-6 transition-colors hover:border-teal-300"
            >
              <h3 className="text-lg font-semibold text-navy">
                <Link href={group.href} className="hover:underline">
                  {group.label}
                </Link>
              </h3>
              <ul className="mt-3 space-y-1.5">
                {group.links.map((link) => (
                  <li key={link.href} className="text-sm leading-relaxed text-ink-muted">
                    <Link href={link.href} className="underline-offset-4 hover:text-navy hover:underline">
                      {link.label}
                    </Link>
                    {' — '}
                    {link.description}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <Disclaimer />
      </section>
    </>
  );
}
