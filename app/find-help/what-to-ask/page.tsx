import type { Metadata } from 'next';
import Link from 'next/link';
import EducationalTopicTemplate from '@/components/templates/EducationalTopicTemplate';
import { ExternalResourceCard } from '@/components/seo/SourceAttribution';
import type { FAQItem } from '@/components/seo/VisibleFAQ';
import type { VerifiedSource } from '@/components/seo/SourceAttribution';

export const metadata: Metadata = {
  title: 'What to Ask a Provider: Intake Screening Guide',
  description:
    'Key questions to ask during a first consultation with a pediatric therapy clinic: clinical approach, sensory gyms, insurance, waitlists, and family involvement.',
  alternates: { canonical: '/find-help/what-to-ask' },
};

const faqs: FAQItem[] = [
  {
    question: 'Can I do an initial consultation over the phone before booking an evaluation?',
    answer:
      'Yes. Many pediatric practices offer a complimentary 10- to 15-minute phone screening with an intake coordinator or clinical director to ensure your child’s needs match their clinical scope before scheduling a full evaluation.',
  },
  {
    question: 'What should I bring to our child’s first clinical assessment?',
    answer:
      'Bring copies of your pediatrician’s prescription/referral, insurance cards, any prior developmental or speech evaluations, IEP or 504 accommodation documents, and comfortable clothing that allows your child to move freely on gym equipment.',
  },
];

const sources: VerifiedSource[] = [
  {
    title: 'Consumer Guide: Navigating Occupational Therapy for Children',
    authorOrOrg: 'American Occupational Therapy Association (AOTA)',
    url: 'https://www.aota.org',
    verifiedDate: '2026-08-15',
    verificationNote:
      'Human-verified national consumer guidance on screening therapy practitioners and setting functional family goals.',
  },
  {
    title: 'Free Pediatric OT Worksheets, Guides & Sensory Evaluation Hub',
    authorOrOrg: 'The OT Toolbox',
    url: 'https://www.theottoolbox.com/free-resources/',
    verifiedDate: '2026-08-20',
    verificationNote:
      'Human-verified library of developmental questions, milestone checklists, and sensory regulation strategies.',
  },
];

export default function WhatToAskPage() {
  return (
    <EducationalTopicTemplate
      eyebrow="Find Local Help"
      title="What to ask a provider"
      intro="Practical questions worth bringing to a first conversation with a local occupational therapy or sensory support practice."
      lastUpdated="August 2026"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Find local support', href: '/find-help' },
        { label: 'What to ask a provider' },
      ]}
      faqs={faqs}
      sources={sources}
      relatedLinks={[
        {
          title: 'Full 10-question checklist for choosing an OT',
          href: '/topics/questions-to-ask-occupational-therapist',
          description: 'Detailed criteria on clinical philosophy, equipment, and discharge cycles.',
        },
        {
          title: 'Finding pediatric OT in Metro Detroit',
          href: '/topics/find-pediatric-occupational-therapy-metro-detroit',
          description: 'Regional advice on navigating waitlists and insurance authorizations.',
        },
        {
          title: 'Browse local provider directory',
          href: '/find-help',
          description: 'Search confirmed sensory clinics across Southeast Michigan.',
        },
      ]}
      primaryCta={{
        text: 'Browse Local Provider Directory',
        href: '/find-help',
        subtext: 'Apply these questions when contacting confirmed regional clinics.',
      }}
    >
      <h2>Preparing for Your First Conversation</h2>
      <p>
        When reaching out to a local sensory or occupational therapy clinic, having a clear set of
        focused questions helps you quickly evaluate whether their clinical philosophy, facility, and
        availability match what your family needs.
      </p>

      <h2>Top Questions for an Intake Coordinator</h2>
      <ul>
        <li>
          <strong>Waitlist & Intake Timeline:</strong> What is your current wait time for an initial
          evaluation, and does having flexible morning/early afternoon availability shorten that
          estimate?
        </li>
        <li>
          <strong>Clinical Approach to Regulation:</strong> How does your team support children who
          become dysregulated or overwhelmed during testing? Is family presence encouraged?
        </li>
        <li>
          <strong>Equipment & Space:</strong> Does your clinic offer a full sensory gym with suspended
          swings, climbing apparatus, and a quiet low-stimulus room if my child gets overloaded?
        </li>
        <li>
          <strong>Insurance Coverage:</strong> Are you an in-network provider for our insurance
          carrier, and what prior authorization paperwork is needed from our pediatrician?
        </li>
      </ul>

      <p className="mt-6">
        For an in-depth, itemized evaluation guide covering credentials, treatment duration, and
        superbills, read our complete guide:{' '}
        <Link
          href="/topics/questions-to-ask-occupational-therapist"
          className="font-medium text-navy underline hover:text-teal"
        >
          Questions to ask before choosing an occupational therapist
        </Link>
        .
      </p>

      <h2>External Educational Reading</h2>
      <div className="my-6">
        <ExternalResourceCard
          category="Pediatric OT Educational Library"
          title="Free Pediatric Occupational Therapy Guides & Handouts"
          org="The OT Toolbox"
          description="Access free educational resources and articles explaining pediatric sensory interventions and developmental milestones."
          url="https://www.theottoolbox.com/free-resources/"
        />
      </div>
    </EducationalTopicTemplate>
  );
}
