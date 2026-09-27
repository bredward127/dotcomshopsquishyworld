import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Disclaimer from '@/components/Disclaimer';
import AskForm from '@/components/ask/AskForm';

// Read at request time, not build time: whether a key is configured must be
// able to change without rebuilding the site.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Ask a question',
  description:
    'Pick a topic area and see general educational information, a small next step, and where to look for local support in Southeast Michigan.',
  alternates: { canonical: '/ask' },
};

export default function AskPage() {
  // Whether the model path is available at all. Only the boolean reaches the
  // browser; the key itself never leaves the server.
  const aiEnabled = Boolean(process.env.ANTHROPIC_API_KEY);

  return (
    <>
      <PageHeader
        eyebrow="Ask a question"
        title="Ask a question"
        intro="Tell us roughly what you are looking into and we will show you the general information we have, plus where to go next."
      />

      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="max-w-prose">
          <AskForm aiEnabled={aiEnabled} />
          <Disclaimer />
        </div>
      </div>
    </>
  );
}
