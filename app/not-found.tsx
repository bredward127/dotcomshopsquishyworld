import Link from 'next/link';
import { navGroups } from '@/lib/nav';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-4 py-20 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-teal">404</p>
      <h1 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">This page doesn&rsquo;t exist</h1>
      <p className="mt-4 max-w-prose leading-relaxed text-ink-muted">
        The address may be mistyped, or the page may not have been published yet. Here is what is
        available right now.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {navGroups.map((group) => (
          <li key={group.href} className="rounded-card border border-mist-400 p-5">
            <h2 className="font-semibold text-navy">
              <Link href={group.href} className="hover:underline">
                {group.label}
              </Link>
            </h2>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="mt-8 inline-block rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy-900"
      >
        Back to home
      </Link>
    </div>
  );
}
