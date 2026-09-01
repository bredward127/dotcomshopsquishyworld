import { NextResponse } from 'next/server';
import { z } from 'zod';
import { isAudienceId, isCategoryId, categoryLabel } from '@/lib/ask/taxonomy';
import { detectSafetyLevel, validateQuestion, validateLocation } from '@/lib/ask/safety';
import { curatedAnswer } from '@/lib/ask/curated';
import { ASK_SYSTEM_PROMPT } from '@/lib/ask/systemPrompt';
import { EMERGENCY_NOTICE, URGENT_NOTICE, type AnswerPayload } from '@/lib/ask/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const AnswerSchema = z.object({
  generalGuidance: z.string(),
  nextStep: z.string(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Could not read the request.' }, { status: 400 });
  }

  const input = (body ?? {}) as Record<string, unknown>;

  const audience = isAudienceId(input.audience) ? input.audience : null;
  const category = isCategoryId(input.category) ? input.category : null;

  const question = validateQuestion(input.question);
  if (!question.ok) {
    return NextResponse.json({ error: question.error }, { status: 400 });
  }

  const location = validateLocation(input.location);
  if (!location.ok) {
    return NextResponse.json({ error: location.error }, { status: 400 });
  }

  // Safety screening runs first, before anything else is considered.
  const safety = detectSafetyLevel(question.value);

  const curated = curatedAnswer(category);
  const base: AnswerPayload = {
    source: 'curated',
    safety,
    category,
    audience,
    ...curated,
  };

  if (safety === 'emergency') {
    // No model call, whatever the visitor consented to.
    return NextResponse.json({
      ...base,
      safetyNotice: EMERGENCY_NOTICE,
      generalGuidance:
        'This page cannot help with an emergency, and nobody is reading what you type here.',
      nextStep: 'Use the emergency contacts above.',
      learnMore: [],
    } satisfies AnswerPayload);
  }

  const notice = safety === 'urgent' ? { safetyNotice: URGENT_NOTICE } : {};

  // The model path requires BOTH a configured key and the visitor's explicit
  // consent to send their typed question off this server. Without either, the
  // curated response is returned and labeled as curated.
  const consented = input.consentToProcess === true;
  const hasQuestion = question.value.length > 0;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || !consented || !hasQuestion) {
    return NextResponse.json({ ...base, ...notice } satisfies AnswerPayload);
  }

  try {
    const Anthropic = (await import('@anthropic-ai/sdk')).default;
    const { zodOutputFormat } = await import('@anthropic-ai/sdk/helpers/zod');
    const client = new Anthropic({ apiKey });

    // Location is deliberately not sent: it is collected only to show local
    // options on this site, and is not needed to answer the question.
    const context = [
      audience ? `Reader: ${audience === 'parent' ? 'a parent or caregiver' : audience === 'adult' ? 'an adult asking about themselves' : 'an educator or school staff member'}.` : null,
      category ? `Topic area: ${categoryLabel(category)}.` : null,
      `Question: ${question.value}`,
    ]
      .filter(Boolean)
      .join('\n');

    const response = await client.messages.parse({
      model: 'claude-opus-5',
      max_tokens: 4096,
      system: ASK_SYSTEM_PROMPT,
      thinking: { type: 'adaptive' },
      output_config: {
        effort: 'medium',
        format: zodOutputFormat(AnswerSchema),
      },
      messages: [{ role: 'user', content: context }],
    });

    if (response.stop_reason === 'refusal' || !response.parsed_output) {
      return NextResponse.json({ ...base, ...notice } satisfies AnswerPayload);
    }

    return NextResponse.json({
      ...base,
      ...notice,
      source: 'ai',
      generalGuidance: response.parsed_output.generalGuidance,
      nextStep: response.parsed_output.nextStep,
    } satisfies AnswerPayload);
  } catch {
    // Any failure falls back to the curated answer rather than an error page.
    return NextResponse.json({ ...base, ...notice } satisfies AnswerPayload);
  }
}
