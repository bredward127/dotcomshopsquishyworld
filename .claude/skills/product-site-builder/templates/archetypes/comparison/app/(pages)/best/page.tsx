import type { Metadata } from 'next';
import { site } from '@/data/site';
import { picks, table, method } from '@/data/comparison';
import SiteHeader from '@/components/sections/SiteHeader';
import Hero from '@/components/sections/Hero';
import ProductGrid from '@/components/sections/ProductGrid';
import ComparisonTable from '@/components/sections/ComparisonTable';
import FeatureGrid from '@/components/sections/FeatureGrid';
import Faq from '@/components/sections/Faq';
import SiteFooter from '@/components/sections/SiteFooter';

export const metadata: Metadata = {
  title: { absolute: `The Best [Product] for [Use] | ${site.brand}` },
  description: 'Three picks for different needs, compared on the facts that matter.',
  alternates: { canonical: '/best' },
};

/** Archetype: comparison / "best of" review page (see references/archetypes.md). */
export default function BestOf() {
  return (
    <>
      <SiteHeader brand={site.brand} badge={site.badge} />
      <Hero
        eyebrow="Updated monthly"
        title="The best [product] for [use]"
        accent="[product]"
        subtitle="Three picks for three kinds of buyer, and exactly why each one made the list."
        cta={{ label: 'Jump to the picks', href: '#picks', id: 'hero-picks' }}
      />
      <div id="picks" className="scroll-mt-4">
        <ProductGrid title="Our picks" products={picks} slot="picks" />
      </div>
      <ComparisonTable {...table} />
      <FeatureGrid title="How we chose" items={method} />
      <Faq items={[{ q: 'Do you earn from these links?', a: `Yes. ${site.disclosure} It never changes the order of the picks.` }]} />
      <SiteFooter
        brand={site.brand}
        disclosures={[{ title: 'Affiliate disclosure', body: `${site.disclosure} Prices and availability are set by the retailer.` }]}
        links={site.footerLinks}
      />
    </>
  );
}
