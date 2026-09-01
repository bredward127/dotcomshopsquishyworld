import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsentBanner from '@/components/analytics/ConsentBanner';
import RouteEvents from '@/components/analytics/RouteEvents';
import { site, absoluteUrl } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Sensory support information for Southeast Michigan`,
    template: `%s | ${site.name}`,
  },
  description: site.shortDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: site.name,
    description: site.shortDescription,
    url: site.url,
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#0D3040',
  width: 'device-width',
  initialScale: 1,
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': absoluteUrl('/#organization'),
      name: site.name,
      url: site.url,
      description: site.description,
    },
    {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      name: site.name,
      url: site.url,
      description: site.shortDescription,
      inLanguage: 'en-US',
      publisher: { '@id': absoluteUrl('/#organization') },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <ConsentBanner />
        <RouteEvents />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
