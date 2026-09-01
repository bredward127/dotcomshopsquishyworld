const steps = [
  {
    title: 'Tell us what you are looking for',
    body: 'Pick the path that fits your situation — a child, an adult, or a local service.',
  },
  {
    title: 'Explore education and videos',
    body: 'Read plain-language background and watch material from established sources.',
  },
  {
    title: 'Connect with a local service if appropriate',
    body: 'When it makes sense, move on to a provider in your area on your own terms.',
  },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="border-y border-mist-400 bg-mist">
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6 sm:py-16">
        <h2 id="how-heading" className="text-2xl font-bold text-navy sm:text-3xl">
          How it works
        </h2>

        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-card bg-white p-6">
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center rounded-full bg-navy text-sm font-bold text-gold"
              >
                {index + 1}
              </span>
              <h3 className="mt-4 font-semibold text-navy">
                <span className="sr-only">{`Step ${index + 1}: `}</span>
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-prose rounded-card border border-mist-600 bg-white px-5 py-4 text-sm leading-relaxed text-ink-muted">
          This site provides general education and directory information only. It does not diagnose,
          treat, or provide emergency help. If someone is in immediate danger, contact local
          emergency services.
        </p>
      </div>
    </section>
  );
}
