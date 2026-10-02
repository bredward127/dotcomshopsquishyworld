import type { Metadata } from 'next';
import { CalendarCheck, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import { site } from '@/data/site';
import SiteHeader from '@/components/sections/SiteHeader';
import Hero from '@/components/sections/Hero';
import ProofBar from '@/components/sections/ProofBar';
import HowItWorks from '@/components/sections/HowItWorks';
import Faq from '@/components/sections/Faq';
import LeadForm from '@/components/sections/LeadForm';
import SiteFooter from '@/components/sections/SiteFooter';

export const metadata: Metadata = {
  title: { absolute: `Book a free consultation | ${site.brand}` },
  description: 'Tell us what you need and we will reply within one business day.',
  alternates: { canonical: '/contact' },
};

/**
 * Archetype: lead generation / service enquiry (see references/archetypes.md).
 * With no affiliate links on the site, set `disclosure: ''` in data/site.ts so the
 * Amazon strip does not show.
 */
export default function Contact() {
  return (
    <>
      <SiteHeader brand={site.brand} badge={site.badge} />
      <Hero
        eyebrow="Service area or specialty"
        title="Get [outcome] without [hassle]"
        accent="[outcome]"
        subtitle="Who you help, where, and what the first conversation looks like."
        cta={{ label: 'Request a call back', href: '#form', id: 'hero-form' }}
        bullets={['Reply within 1 business day', 'No obligation']}
      />
      <ProofBar
        items={[
          { icon: MapPin, label: 'Real service area' },
          { icon: CalendarCheck, label: 'Real availability' },
          { icon: MessageCircle, label: 'Real response time' },
          { icon: ShieldCheck, label: 'Licensed / insured (if true)' },
        ]}
      />
      <HowItWorks
        steps={[
          { title: 'Tell us what you need', body: 'Two minutes, no account.' },
          { title: 'We reply', body: 'A real person, within one business day.' },
          { title: 'You decide', body: 'A clear quote, no pressure.' },
        ]}
      />
      <section id="form" className="scroll-mt-4 px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-xl">
          <LeadForm
            id="contact-main"
            title="Request a call back"
            fields={[
              { name: 'name', label: 'Name', required: true, autoComplete: 'name' },
              { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
              { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
              { name: 'message', label: 'What do you need help with?', type: 'textarea' },
            ]}
            consentLabel="I agree to be contacted about this request. See the privacy page for how details are handled."
            submitLabel="Send request"
          />
        </div>
      </section>
      <Faq items={[{ q: 'What happens to my details?', a: 'They are sent to our team to answer this request and nothing else.' }]} />
      <SiteFooter brand={site.brand} disclosures={[]} links={site.footerLinks} />
    </>
  );
}
