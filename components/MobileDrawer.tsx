'use client';

import Link from 'next/link';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { navGroups, footerLinks, type NavGroup } from '@/lib/nav';

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

function matches(text: string, query: string) {
  return text.toLowerCase().includes(query.toLowerCase());
}

/**
 * Left-side navigation drawer.
 *
 * The search field filters the navigation links that are already on this page.
 * It does not call a search backend, so it never leaves the user waiting on a
 * request that cannot be answered.
 */
export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const [query, setQuery] = useState('');
  const [openGroups, setOpenGroups] = useState<string[]>([navGroups[0].label]);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const searchId = useId();
  const titleId = useId();

  // Move focus into the drawer when it opens, and lock background scrolling.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Escape closes; Tab is trapped inside the panel while it is open.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const filteredGroups = useMemo<NavGroup[]>(() => {
    const trimmed = query.trim();
    if (!trimmed) return navGroups;

    return navGroups
      .map((group) => {
        if (matches(group.label, trimmed)) return group;
        return {
          ...group,
          links: group.links.filter(
            (link) => matches(link.label, trimmed) || matches(link.description, trimmed),
          ),
        };
      })
      .filter((group) => group.links.length > 0);
  }, [query]);

  const resultCount = filteredGroups.reduce((total, group) => total + group.links.length, 0);
  const searching = query.trim().length > 0;

  function toggleGroup(label: string) {
    setOpenGroups((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    );
  }

  function handleNavigate() {
    setQuery('');
    onClose();
  }

  return (
    <div
      className={`fixed inset-0 z-40 lg:hidden ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-navy-900/50 transition-opacity duration-200 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-white shadow-xl
                    transition-transform duration-200 ease-out ${
                      open ? 'translate-x-0' : '-translate-x-full'
                    }`}
      >
        <div className="flex items-center justify-between border-b border-mist-400 px-5 py-4">
          <h2 id={titleId} className="text-base font-semibold text-navy">
            Menu
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-navy hover:bg-mist"
          >
            <span className="sr-only">Close menu</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="border-b border-mist-400 px-5 py-4">
          <label htmlFor={searchId} className="mb-1.5 block text-sm font-medium text-navy">
            Filter navigation
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type to filter pages"
            autoComplete="off"
            className="w-full rounded-md border border-mist-600 px-3 py-2 text-base text-ink
                       placeholder:text-mist-600 focus:border-teal focus:outline-none"
          />
          <p className="mt-1.5 text-xs text-ink-muted" role="status" aria-live="polite">
            {searching
              ? `${resultCount} ${resultCount === 1 ? 'page' : 'pages'} match "${query.trim()}"`
              : 'Filters the pages listed below.'}
          </p>
        </div>

        <nav aria-label="Site" className="flex-1 overflow-y-auto px-2 py-3">
          {filteredGroups.map((group) => {
            const expanded = searching || openGroups.includes(group.label);
            const panelId = `drawer-group-${group.label.replace(/\s+/g, '-').toLowerCase()}`;

            return (
              <div key={group.label} className="mb-1">
                <button
                  type="button"
                  onClick={() => toggleGroup(group.label)}
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2.5
                             text-left text-[15px] font-semibold text-navy hover:bg-mist"
                >
                  {group.label}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className={`shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
                  >
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <ul id={panelId} hidden={!expanded} className="mb-2 space-y-0.5 pl-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={handleNavigate}
                        className="block rounded-md px-3 py-2 text-[15px] text-ink-muted hover:bg-mist hover:text-navy"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {searching && resultCount === 0 && (
            <p className="px-3 py-6 text-sm text-ink-muted">
              No pages match that. Try a shorter word, or clear the filter to see everything.
            </p>
          )}
        </nav>

        <div className="border-t border-mist-400 px-5 py-4">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={handleNavigate}
                  className="text-sm text-ink-muted underline underline-offset-4 hover:text-navy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
