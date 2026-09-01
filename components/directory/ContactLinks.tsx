'use client';

import { track } from '@/lib/analytics/track';
import { hostOf } from '@/lib/analytics/events';

type Props = {
  slug: string;
  phone?: string;
  tel: string | null;
  website: string | null;
  stacked?: boolean;
};

/**
 * Contact buttons. The events record which listing was contacted, never the
 * phone number or the visitor.
 */
export default function ContactLinks({ slug, phone, tel, website, stacked }: Props) {
  if (!tel && !website) return null;

  const layout = stacked ? 'space-y-2' : 'flex flex-wrap gap-2';
  const button = stacked ? 'block text-center' : '';

  return (
    <div className={layout}>
      {tel && (
        <a
          href={tel}
          onClick={() => track('click_provider_phone', { provider_slug: slug })}
          className={`${button} rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-900`}
        >
          Call {phone}
        </a>
      )}
      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track('click_provider_website', {
              provider_slug: slug,
              destination_host: hostOf(website) ?? undefined,
            })
          }
          className={`${button} rounded-md border border-navy px-4 py-2.5 text-sm font-semibold text-navy hover:bg-mist`}
        >
          Visit website
        </a>
      )}
    </div>
  );
}
