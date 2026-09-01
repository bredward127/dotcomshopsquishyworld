import Link from 'next/link';

export default function LocalFocus() {
  return (
    <section aria-labelledby="local-heading" className="border-y border-mist-400 bg-navy text-white">
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">Local focus</p>
            <h2 id="local-heading" className="mt-2 text-2xl font-bold sm:text-3xl">
              Starting in Metro Detroit and Southeast Michigan
            </h2>
            <p className="mt-4 max-w-prose leading-relaxed text-mist-400">
              This is a pilot, and the geography is deliberately narrow. Rather than covering the
              whole state thinly, the aim is to get one region right first. The local directory is
              still being built, and no listings are published yet.
            </p>
          </div>

          <div className="rounded-card bg-white/10 p-6">
            <h3 className="font-semibold">Work in this region?</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist-400">
              Local practices and organizations can read how listings will work before the directory
              opens.
            </p>
            <Link
              href="/for-providers"
              className="mt-4 inline-block rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-navy hover:bg-gold-600"
            >
              Information for providers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
