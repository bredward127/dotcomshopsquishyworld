'use client';

import { track } from '@/lib/analytics/track';
import type { EventName } from '@/lib/analytics/events';

/**
 * A mailto link that records that the contact route was used.
 * The address itself is never sent to analytics.
 */
export default function MailtoLink({
  href,
  event,
  method,
  className,
  children,
}: {
  href: string;
  event: EventName;
  method: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} onClick={() => track(event, { method })} className={className}>
      {children}
    </a>
  );
}
