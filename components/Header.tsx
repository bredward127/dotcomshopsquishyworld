'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navGroups } from '@/lib/nav';
import { site } from '@/lib/site';
import MobileDrawer from './MobileDrawer';

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-mist-400">
      {/*
        backdrop-blur (backdrop-filter) lives on this inner row, not on
        <header> itself. filter/backdrop-filter/transform on an ancestor
        creates a new containing block for position:fixed descendants - with
        it on <header>, MobileDrawer's `fixed inset-0` was anchored to the
        header's own 64px box instead of the viewport, collapsing the drawer
        to a sliver with its content painting outside it with no background.
      */}
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 bg-white/95 px-4 backdrop-blur sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 rounded-md">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-sm font-bold text-gold"
          >
            SA
          </span>
          <span className="text-[15px] font-semibold leading-tight text-navy sm:text-base">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navGroups.map((group) => {
              const active = pathname === group.href || pathname.startsWith(`${group.href}/`);
              return (
                <li key={group.href}>
                  <Link
                    href={group.href}
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-md px-3 py-2 text-[15px] transition-colors ${
                      active
                        ? 'bg-mist font-semibold text-navy'
                        : 'text-ink-muted hover:bg-mist hover:text-navy'
                    }`}
                  >
                    {group.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-expanded={drawerOpen}
          aria-haspopup="dialog"
          className="inline-flex items-center gap-2 rounded-md border border-mist-600 px-3 py-2
                     text-sm font-medium text-navy hover:bg-mist lg:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M2 4.5h14M2 9h14M2 13.5h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Menu
        </button>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
