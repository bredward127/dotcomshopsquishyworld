import Link from 'next/link';
import { Logo } from './FunnelHeader';

export default function FunnelFooter() {
  return (
    <footer className="border-t border-cream-300 bg-cream-200/60">
      <div className="mx-auto max-w-3xl space-y-3 px-4 py-10 text-sm leading-relaxed text-plum-muted sm:px-6">
        <Logo />
        <p>
          <strong className="text-plum">Affiliate disclosure:</strong> product buttons on this page are affiliate
          links. As an Amazon Associate we earn from qualifying purchases, at no extra cost to you. Your match is
          calculated from your answers alone; commission plays no part in it.
        </p>
        <p>
          <strong className="text-plum">Not medical advice:</strong> squishies and fidgets are comfort tools. They
          are not a treatment for anxiety, ADHD, autism, or sensory processing differences. Prices and availability
          are set by the retailer and can change.
        </p>
        <p>
          <Link href="/privacy" className="font-semibold text-lavender-700 underline-offset-2 hover:underline">
            Privacy
          </Link>{' '}
          ·{' '}
          <Link href="/disclosure" className="font-semibold text-lavender-700 underline-offset-2 hover:underline">
            Disclosure
          </Link>
        </p>
        <p>© {new Date().getFullYear()} Shop Squishy World</p>
      </div>
    </footer>
  );
}
