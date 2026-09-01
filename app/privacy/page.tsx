import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy',
  description: `How ${site.name} handles data and what analytics are in use.`,
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  const analyticsActive = Boolean(site.googleTagId);

  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy"
        intro="What this site collects, and what it does not."
      />

      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="prose-page max-w-prose">
          <h2>Information you give us</h2>
          <p>
            None. There are currently no forms, accounts, logins, comments, or newsletter signups on
            this site, so there is no way for you to submit personal information through it. If that
            changes, this page will be updated before any form goes live.
          </p>

          <h2>Measurement</h2>
          {analyticsActive ? (
            <p>
              This site loads Google&rsquo;s gtag.js to measure traffic and advertising performance.
              That script may set cookies and share information such as your IP address, browser,
              and the pages you view with Google. It runs on every page. You can limit it with
              browser privacy settings, an ad blocker, or Google&rsquo;s own opt-out tools.
            </p>
          ) : (
            <p>
              No analytics or advertising scripts are currently loaded. If measurement is added, this
              page will be updated to say what runs and what it collects.
            </p>
          )}

          <h2>Hosting</h2>
          <p>
            The site is served by a third-party hosting provider that keeps standard server logs,
            which typically include IP addresses and request details.
          </p>

          <h2>Outside links</h2>
          <p>
            Links to other organizations are governed by those organizations&rsquo; own privacy
            policies, not this one.
          </p>

          <h2>Children</h2>
          <p>
            This site is written for parents, educators, and adults. It does not knowingly collect
            information from children.
          </p>
        </div>
      </div>
    </>
  );
}
