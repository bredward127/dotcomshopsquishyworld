'use client';

import { ExternalIcon } from '@/components/Icons';
import { track } from '@/lib/analytics/track';
import { hostOf } from '@/lib/analytics/events';

/**
 * Outside links. These are independent organizations with no relationship to
 * this site: no partnership, affiliation, sponsorship, or endorsement is
 * implied in either direction.
 */
const resources = [
  {
    id: 'ot-toolbox-free-resources',
    href: 'https://www.theottoolbox.com/category/free-resources/',
    title: 'The OT Toolbox — Free resources',
    attribution:
      'Free pediatric OT worksheets, handouts, and activity ideas from The OT Toolbox.',
    blurb: 'A large library of printable material organized by skill area.',
  },
];

export default function ExternalResources() {
  return (
    <section
      aria-labelledby="external-heading"
      className="mx-auto max-w-content px-4 py-14 sm:px-6 sm:py-16"
    >
      <h2 id="external-heading" className="text-2xl font-bold text-navy sm:text-3xl">
        Resources from other organizations
      </h2>
      <p className="mt-3 max-w-prose leading-relaxed text-ink-muted">
        Published and maintained by independent organizations. Listing them here is not an
        endorsement, and we are not affiliated with them.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {resources.map((resource) => (
          <li key={resource.href}>
            <a
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track('outbound_resource_click', {
                  resource_id: resource.id,
                  destination_host: hostOf(resource.href) ?? undefined,
                })
              }
              className="group flex h-full flex-col rounded-card border border-mist-400 p-5
                         transition-colors hover:border-teal hover:bg-mist-200"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="font-semibold text-navy group-hover:underline">
                  {resource.title}
                </span>
                <span className="mt-0.5 shrink-0 text-teal">
                  <ExternalIcon />
                </span>
              </span>
              <span className="mt-2 text-sm leading-relaxed text-ink-muted">{resource.blurb}</span>
              <span className="mt-3 text-sm leading-relaxed text-ink-muted">
                {resource.attribution}
              </span>
              <span className="mt-3 text-xs uppercase tracking-wide text-teal">
                Opens in a new tab
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
