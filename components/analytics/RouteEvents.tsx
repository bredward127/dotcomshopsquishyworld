'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { track, resetDedupeForPath } from '@/lib/analytics/track';
import { CONSENT_GRANTED_EVENT } from '@/lib/analytics/consent';

/**
 * Fires the page-scoped view events on navigation.
 *
 * Dedupe state is keyed to the path, so a re-render, a React Strict Mode
 * double-effect, or a shallow URL change cannot produce a second event, while
 * genuinely navigating back to a page later does.
 *
 * It also re-fires on consent grant. Without that, the view of the page the
 * visitor was on when they pressed Allow is lost — which is the entry page,
 * and the one worth knowing about. A blocked attempt is not recorded as
 * fired, so this cannot double-count.
 */
export default function RouteEvents() {
  const pathname = usePathname();

  const fire = useCallback(() => {
    if (pathname === '/') {
      track('view_home', {}, { once: true });
      return;
    }
    if (pathname === '/resources') {
      track('view_resource', { resource_id: 'resources-index' }, { once: true });
      return;
    }
    if (pathname === '/for-providers') {
      track('view_for_providers', {}, { once: true });
      return;
    }
    if (pathname.startsWith('/providers/')) {
      const slug = pathname.slice('/providers/'.length);
      track('view_provider', { provider_slug: slug }, { once: true });
    }
  }, [pathname]);

  useEffect(() => {
    resetDedupeForPath(pathname);
    fire();
  }, [pathname, fire]);

  useEffect(() => {
    window.addEventListener(CONSENT_GRANTED_EVENT, fire);
    return () => window.removeEventListener(CONSENT_GRANTED_EVENT, fire);
  }, [fire]);

  return null;
}
