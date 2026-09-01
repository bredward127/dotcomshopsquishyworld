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
            <>
              <p>
                Measurement is off until you allow it. When you first arrive, a banner asks whether
                Google Analytics and Google Ads measurement may run. Until you choose Allow, storage
                and advertising signals are set to denied and no measurement cookies are set.
                Declining costs you nothing here — every page works the same either way.
              </p>
              <p>
                If you allow it, Google&rsquo;s gtag.js runs and may set cookies and share your IP
                address, browser, and the pages you view with Google. Your choice is remembered in
                this browser. To change it, clear this site&rsquo;s data in your browser settings
                and the banner will ask again.
              </p>

              <h2>What we record, and what we never do</h2>
              <p>
                We record a short, fixed list of actions — pages viewed, which topic area you picked
                on the question page, which filters you used in the directory, and which listings
                you contacted. Every event and every field it may carry is written down in the
                measurement plan kept in this site&rsquo;s source code.
              </p>
              <p>
                What is never sent: the text of any question you type, the city or ZIP you type into
                the directory filter, your email address or phone number, and anything about health,
                symptoms, or a diagnosis. The code strips these before sending rather than relying
                on care at the point of use — a question you type is not transmitted even if
                something goes wrong elsewhere.
              </p>

              <h2>Campaign links</h2>
              <p>
                If you arrive from an ad or a campaign link, the campaign tags in the address
                (utm_source, gclid, and similar) are kept for this browser session only, and only if
                you allowed measurement. They are used solely to attribute an enquiry you choose to
                send, are discarded when you close the tab, and expire after 30 days regardless.
                They are not attached to page views.
              </p>
            </>
          ) : (
            <p>
              No analytics or advertising scripts are currently loaded. If measurement is added, this
              page will be updated to say what runs and what it collects, and it will be off until
              you allow it.
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
