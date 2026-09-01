import Link from 'next/link';
import { navGroups, footerLinks } from '@/lib/nav';
import { site } from '@/lib/site';
import Disclaimer from './Disclaimer';

export default function Footer() {
  return (
    <footer className="mt-20 bg-navy text-white">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {navGroups.map((group) => (
            <nav key={group.label} aria-label={group.label}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold">
                {group.label}
              </h2>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-mist-400 underline-offset-4 hover:text-white hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-white/15 pt-8">
          <Disclaimer variant="footer" />
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">{site.name}</p>
            <p className="mt-0.5 text-sm text-mist-600">{site.descriptor}</p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-mist-400 underline underline-offset-4 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
