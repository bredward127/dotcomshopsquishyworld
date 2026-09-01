'use client';

import { useRef, useState } from 'react';
import { AUDIENCES, CATEGORIES, type AudienceId, type CategoryId } from '@/lib/ask/taxonomy';
import { MAX_QUESTION_LENGTH } from '@/lib/ask/safety';
import type { AnswerPayload } from '@/lib/ask/types';
import { NotMedicalAdvice, NoEmergencyUse, PrivacyNotice } from './SafetyBanner';
import AnswerPanel from './AnswerPanel';

/**
 * Records that a question was routed, using only the category.
 * The typed question is never included — no free text is sent to analytics.
 */
function trackCategoryOnly(category: CategoryId | null) {
  if (typeof window === 'undefined' || !category) return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== 'function') return;
  gtag('event', 'ask_topic_selected', { topic: category });
}

export default function AskForm({ aiEnabled }: { aiEnabled: boolean }) {
  const [audience, setAudience] = useState<AudienceId | ''>('');
  const [category, setCategory] = useState<CategoryId | ''>('');
  const [question, setQuestion] = useState('');
  const [location, setLocation] = useState('');
  const [consent, setConsent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<AnswerPayload | null>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!category) {
      setError('Please choose a topic area so there is something to show you.');
      return;
    }

    setPending(true);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audience: audience || null,
          category,
          question,
          location,
          consentToProcess: consent,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? 'Something went wrong. Please try again.');
        return;
      }
      setAnswer(data as AnswerPayload);
      trackCategoryOnly(category);
      requestAnimationFrame(() => answerRef.current?.focus());
    } catch {
      setError('Could not reach the server. Please try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <div className="space-y-4">
        <NotMedicalAdvice />
        <NoEmergencyUse />
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <fieldset>
          <legend className="text-base font-semibold text-navy">Who is this for?</legend>
          <p className="mt-1 text-sm text-ink-muted">Optional. It changes how things are worded.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {AUDIENCES.map((option) => {
              const selected = audience === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setAudience(selected ? '' : option.id)}
                  className={`rounded-md border px-4 py-2.5 text-sm font-medium transition-colors ${
                    selected
                      ? 'border-navy bg-navy text-white'
                      : 'border-mist-600 text-navy hover:bg-mist'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-base font-semibold text-navy">
            What area are you looking into?
          </legend>
          <p className="mt-1 text-sm text-ink-muted">Required. This selects what is shown.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {CATEGORIES.map((option) => {
              const selected = category === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setCategory(option.id)}
                  className={`rounded-md border px-4 py-3 text-left transition-colors ${
                    selected
                      ? 'border-navy bg-navy text-white'
                      : 'border-mist-600 text-navy hover:bg-mist'
                  }`}
                >
                  <span className="block text-sm font-medium">{option.label}</span>
                  <span
                    className={`mt-0.5 block text-xs ${
                      selected ? 'text-mist-400' : 'text-ink-muted'
                    }`}
                  >
                    {option.hint}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor="question" className="block text-base font-semibold text-navy">
            Your question
          </label>
          <p className="mt-1 text-sm text-ink-muted">
            Optional. Please leave out names and identifying details.
          </p>
          <textarea
            id="question"
            value={question}
            onChange={(event) => setQuestion(event.target.value.slice(0, MAX_QUESTION_LENGTH))}
            rows={3}
            maxLength={MAX_QUESTION_LENGTH}
            className="mt-3 w-full rounded-md border border-mist-600 px-3 py-2.5 text-base text-ink placeholder:text-mist-600 focus:border-teal focus:outline-none"
            placeholder="For example: transitions between activities are hard and I am not sure where to start."
          />
          <p className="mt-1 text-xs text-ink-muted">
            {question.length} of {MAX_QUESTION_LENGTH} characters. Not saved.
          </p>
        </div>

        <div>
          <label htmlFor="location" className="block text-base font-semibold text-navy">
            City or ZIP
          </label>
          <p className="mt-1 text-sm text-ink-muted">
            Optional. Used only to show local options, and never sent off this site.
          </p>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            autoComplete="off"
            maxLength={60}
            className="mt-3 w-full max-w-xs rounded-md border border-mist-600 px-3 py-2.5 text-base text-ink placeholder:text-mist-600 focus:border-teal focus:outline-none"
            placeholder="Detroit, or 48226"
          />
        </div>

        <PrivacyNotice aiEnabled={aiEnabled} />

        {aiEnabled && (
          <div className="rounded-card border border-mist-600 px-5 py-4">
            <label htmlFor="consent" className="flex items-start gap-3">
              <input
                id="consent"
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-navy"
              />
              <span className="text-sm leading-relaxed text-ink-muted">
                Send the text of my question to Anthropic&rsquo;s API so a reply can be composed for
                it. Without this, you will get the material written in advance for the topic you
                picked.
              </span>
            </label>
          </div>
        )}

        {error && (
          <p role="alert" className="text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy-900 disabled:opacity-60"
        >
          {pending ? 'Working…' : 'Show me what is here'}
        </button>
      </form>

      <div ref={answerRef} tabIndex={-1}>
        {answer && <AnswerPanel answer={answer} />}
      </div>
    </div>
  );
}
