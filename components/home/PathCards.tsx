import Link from 'next/link';
import { ChildIcon, AdultIcon, MapPinIcon, ClipboardIcon } from '@/components/Icons';

const paths = [
  {
    href: '/families',
    label: 'For a child',
    blurb: 'Background for parents and caregivers, written in plain language.',
    Icon: ChildIcon,
  },
  {
    href: '/for-adults',
    label: 'For an adult',
    blurb: 'Information for adults looking into their own sensory needs.',
    Icon: AdultIcon,
  },
  {
    href: '/find-help',
    label: 'Find local support',
    blurb: 'Services in Metro Detroit and Southeast Michigan.',
    Icon: MapPinIcon,
  },
  {
    href: '/for-providers',
    label: 'For providers',
    blurb: 'How listings will work for local practices and organizations.',
    Icon: ClipboardIcon,
  },
];

export default function PathCards() {
  return (
    <section aria-labelledby="paths-heading" className="mx-auto max-w-content px-4 py-14 sm:px-6 sm:py-16">
      <h2 id="paths-heading" className="text-2xl font-bold text-navy sm:text-3xl">
        Where would you like to start?
      </h2>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {paths.map(({ href, label, blurb, Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex h-full flex-col rounded-card border border-mist-400 p-5
                         transition-colors hover:border-teal hover:bg-mist-200"
            >
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-mist text-teal
                               transition-colors group-hover:bg-white">
                <Icon />
              </span>
              <span className="mt-4 font-semibold text-navy group-hover:underline">{label}</span>
              <span className="mt-1.5 text-sm leading-relaxed text-ink-muted">{blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
