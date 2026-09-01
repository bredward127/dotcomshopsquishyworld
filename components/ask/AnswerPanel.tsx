import Link from 'next/link';
import VideoList from './VideoList';
import type { AnswerPayload } from '@/lib/ask/types';

export default function AnswerPanel({ answer }: { answer: AnswerPayload }) {
  const emergency = answer.safety === 'emergency';

  return (
    <div className="mt-10 space-y-8" id="answer" tabIndex={-1}>
      {answer.safetyNotice && (
        <div
          role="alert"
          className={`rounded-card border-l-4 px-5 py-4 ${
            emergency ? 'border-red-600 bg-red-50' : 'border-gold bg-mist-200'
          }`}
        >
          <h2 className={`font-semibold ${emergency ? 'text-red-900' : 'text-navy'}`}>
            {emergency ? 'Please stop and get help now' : 'Worth raising promptly'}
          </h2>
          <p
            className={`mt-2 text-sm leading-relaxed ${
              emergency ? 'text-red-900' : 'text-ink-muted'
            }`}
          >
            {answer.safetyNotice}
          </p>
        </div>
      )}

      <section aria-labelledby="guidance-heading">
        <h3 id="guidance-heading" className="text-lg font-semibold text-navy">
          General guidance
        </h3>
        <p className="mt-2 leading-relaxed text-ink-muted">{answer.generalGuidance}</p>
      </section>

      {!emergency && (
        <section aria-labelledby="next-step-heading">
          <h3 id="next-step-heading" className="text-lg font-semibold text-navy">
            Try a small next step
          </h3>
          <p className="mt-2 leading-relaxed text-ink-muted">{answer.nextStep}</p>
        </section>
      )}

      {answer.learnMore.length > 0 && (
        <section aria-labelledby="learn-more-heading">
          <h3 id="learn-more-heading" className="text-lg font-semibold text-navy">
            Learn more
          </h3>
          <ul className="mt-3 space-y-2">
            {answer.learnMore.map((link) => (
              <li key={link.href}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] underline underline-offset-4 hover:text-navy"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="text-[15px] underline underline-offset-4 hover:text-navy"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {!emergency && <VideoList category={answer.category} />}

      <section aria-labelledby="local-help-heading">
        <h3 id="local-help-heading" className="text-lg font-semibold text-navy">
          Find local help
        </h3>
        <p className="mt-2 leading-relaxed text-ink-muted">{answer.findLocalHelp}</p>
        <Link
          href="/find-help"
          className="mt-4 inline-block rounded-md border border-navy px-5 py-2.5 text-sm font-semibold text-navy hover:bg-mist"
        >
          Go to Find local help
        </Link>
      </section>

      <p className="border-t border-mist-400 pt-4 text-xs leading-relaxed text-ink-muted">
        {answer.source === 'ai'
          ? 'This response was composed by an AI model from your question. It is general education, it has not been reviewed by a clinician, and it may be wrong.'
          : 'This response was written in advance for the topic you selected. No AI was used to produce it.'}
      </p>
    </div>
  );
}
