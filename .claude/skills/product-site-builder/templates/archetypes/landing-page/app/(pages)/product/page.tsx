import type { Metadata } from 'next';
import { site } from '@/data/site';
import { landing } from '@/data/landing';
import SiteHeader from '@/components/sections/SiteHeader';
import Hero from '@/components/sections/Hero';
import ProofBar from '@/components/sections/ProofBar';
import ProblemSolution from '@/components/sections/ProblemSolution';
import FeatureGrid from '@/components/sections/FeatureGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import Faq from '@/components/sections/Faq';
import PromiseBox from '@/components/sections/PromiseBox';
import FinalCta from '@/components/sections/FinalCta';
import SiteFooter from '@/components/sections/SiteFooter';

export const metadata: Metadata = {
  title: { absolute: `${landing.hero.title} | ${site.brand}` },
  description: landing.hero.subtitle,
  alternates: { canonical: '/product' },
};

/** Archetype: single-product landing page (see references/archetypes.md). */
export default function ProductLanding() {
  return (
    <>
      <SiteHeader brand={site.brand} badge={site.badge} cta={landing.hero.cta} />
      <Hero {...landing.hero} />
      <ProofBar items={landing.proof} />
      <ProblemSolution {...landing.problem} />
      <FeatureGrid title="Why it works" items={landing.features} />
      <div id="how" className="scroll-mt-4">
        <HowItWorks steps={landing.steps} />
      </div>
      <Faq items={landing.faq} />
      <PromiseBox {...landing.promise} />
      <FinalCta {...landing.final} />
      <SiteFooter
        brand={site.brand}
        disclosures={[{ title: 'Affiliate disclosure', body: `${site.disclosure} Buttons on this page may be affiliate links.` }]}
        links={site.footerLinks}
      />
    </>
  );
}
