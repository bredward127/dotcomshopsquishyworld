import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Disclaimer from '@/components/Disclaimer';
import { navGroups } from '@/lib/nav';

export const metadata: Metadata = {
  title: 'For families',
  description:
    'How to use Sensory Access Michigan, what it covers, and what it deliberately leaves to qualified professionals.',
  alternates: { canonical: '/families' },
};

const familyLinks = navGroups[0].links.filter((link) => link.href !== '/families');

export default function FamiliesPage() {
  return (
    <>
      <PageHeader
        eyebrow="For Families"
        title="Start here"
        intro="A short orientation to what this site is, who it is for, and how to get something useful out of it."
      />

      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="prose-page max-w-prose">
          <h2>What this site is</h2>
          <p>
            This is an information hub. It collects plain-language background on sensory processing,
            points to outside organizations that publish reliable material, and — as it grows — will
            help you find services in Metro Detroit and Southeast Michigan.
          </p>

          <h2>What this site is not</h2>
          <p>
            It is not a therapy practice and not a place to get an assessment, a diagnosis, or a
            personalized plan. Those come from a qualified professional who has actually met the
            person involved. Nothing here should be treated as a substitute for that.
          </p>

          <h2>How to use it</h2>
          <ul>
            <li>Read general background first, so terms you encounter elsewhere make sense.</li>
            <li>Follow the outside links when you want depth from established organizations.</li>
            <li>Bring specific questions to a professional who can answer them for your situation.</li>
          </ul>
        </div>

        <h2 className="mt-12 text-xl font-semibold text-navy">More in this section</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {familyLinks.map((link) => (
            <li key={link.href} className="rounded-card border border-mist-400 p-5">
              <h3 className="font-semibold text-navy">
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{link.description}</p>
            </li>
          ))}
        </ul>

        <Disclaimer />
      </div>
    </>
  );
}
