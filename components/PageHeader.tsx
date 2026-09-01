export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="border-b border-mist-400 bg-mist">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-16">
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-teal">{eyebrow}</p>
        )}
        <h1 className="max-w-prose text-3xl font-bold leading-tight text-navy sm:text-4xl">
          {title}
        </h1>
        {intro && <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-muted">{intro}</p>}
      </div>
    </div>
  );
}
