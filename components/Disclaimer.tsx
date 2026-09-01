type DisclaimerProps = {
  variant?: 'inline' | 'footer';
};

/**
 * Global educational / non-medical disclaimer.
 * Rendered on every page via the root layout footer, and available inline
 * for pages that discuss sensory processing in more depth.
 */
export default function Disclaimer({ variant = 'inline' }: DisclaimerProps) {
  const body = (
    <>
      Sensory Access Michigan publishes general educational information and links to outside
      organizations and local services. It is not a medical provider, occupational therapy
      practice, diagnostic tool, or crisis service, and nothing here is medical advice or a
      substitute for care from a qualified professional. Listings and links are not endorsements.
      For questions about a specific person, talk with a licensed clinician. If someone is in
      immediate danger, contact local emergency services.
    </>
  );

  if (variant === 'footer') {
    return (
      <div className="text-sm leading-relaxed text-mist-600">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-mist-400">
          Important
        </h2>
        <p>{body}</p>
      </div>
    );
  }

  return (
    <aside
      aria-label="Educational information notice"
      className="mt-10 rounded-card border border-mist-400 bg-mist px-5 py-4 text-sm leading-relaxed text-ink-muted"
    >
      <p>{body}</p>
    </aside>
  );
}
