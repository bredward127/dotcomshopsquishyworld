export function NotMedicalAdvice() {
  return (
    <div className="rounded-card border-l-4 border-teal bg-mist px-5 py-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-navy">
        Not medical advice
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        This page gives general educational information only. It does not diagnose, assess, or treat
        anyone, and it cannot tell you what is right for a specific person. For that, talk with a
        licensed professional who has met them.
      </p>
    </div>
  );
}

export function NoEmergencyUse() {
  return (
    <div className="rounded-card border-l-4 border-gold bg-mist-200 px-5 py-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-navy">
        Do not use this in an emergency
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        Nobody reads what you type here. If someone is in immediate danger call{' '}
        <strong className="text-navy">911</strong>. For thoughts of suicide or self-harm, call or
        text <strong className="text-navy">988</strong> to reach the Suicide and Crisis Lifeline,
        available 24 hours a day.
      </p>
    </div>
  );
}

export function PrivacyNotice({ aiEnabled }: { aiEnabled: boolean }) {
  return (
    <div className="rounded-card border border-mist-600 px-5 py-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-navy">
        Before you type anything
      </h2>
      <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink-muted">
        <li>Your question is not saved. It is not written to any database or log by this site.</li>
        <li>No account is created and you are not identified.</li>
        <li>
          City or ZIP is optional. It is used only to show local options and is never sent anywhere
          off this site.
        </li>
        {aiEnabled ? (
          <li>
            If you tick the box below, the text of your question — and nothing else — is sent to
            Anthropic&rsquo;s API to compose a reply. Leave it unticked and your question stays on
            this server.
          </li>
        ) : (
          <li>
            Nothing you type leaves this server. Replies come from material written in advance.
          </li>
        )}
        <li>Please leave out names and anything you would not want to type into a public page.</li>
      </ul>
    </div>
  );
}
