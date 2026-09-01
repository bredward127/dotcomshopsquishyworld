import type { Metadata } from 'next';
import Link from 'next/link';
import EducationalTopicTemplate from '@/components/templates/EducationalTopicTemplate';
import { ExternalResourceCard } from '@/components/seo/SourceAttribution';
import type { FAQItem } from '@/components/seo/VisibleFAQ';
import type { VerifiedSource } from '@/components/seo/SourceAttribution';

export const metadata: Metadata = {
  title: 'Sensory Basics: How the Nervous System Processes Information',
  description:
    'A plain-language guide to the eight sensory systems, modulation thresholds, sensory seeking versus avoiding, and everyday regulation.',
  alternates: { canonical: '/families/sensory-basics' },
};

const faqs: FAQItem[] = [
  {
    question: 'Are there more than the five traditional senses?',
    answer:
      'Yes. In occupational therapy and sensory integration theory, eight sensory systems are recognized: visual, auditory, tactile, olfactory (smell), gustatory (taste), vestibular (balance and head movement in space), proprioceptive (muscle and joint position/force feedback), and interoceptive (internal body sensations like hunger, heartbeat, temperature, and bladder fullness).',
  },
  {
    question: 'Is sensory processing difference considered a medical diagnosis on its own?',
    answer:
      'Sensory Processing Disorder (SPD) is not currently classified as a stand-alone psychiatric diagnosis in the DSM-5. However, sensory processing differences are widely documented in neurodevelopmental literature, recognized as core features of autism and ADHD, and formally evaluated and treated by licensed occupational therapists.',
  },
];

const sources: VerifiedSource[] = [
  {
    title: 'Sensory Integration: Theory and Practice (3rd Edition)',
    authorOrOrg: 'Bundy, A. C., & Lane, S. J. (F.A. Davis)',
    verifiedDate: '2026-08-10',
    verificationNote:
      'Academic reference for the neurological systems governing sensory modulation, vestibular processing, and motor planning.',
  },
  {
    title: 'Free Sensory Systems Educational Guides & Worksheets Hub',
    authorOrOrg: 'The OT Toolbox',
    url: 'https://www.theottoolbox.com/free-resources/',
    verifiedDate: '2026-08-20',
    verificationNote:
      'Human-reviewed library of parent-friendly guides explaining the 8 sensory systems and sensory regulation strategies.',
  },
];

export default function SensoryBasicsPage() {
  return (
    <EducationalTopicTemplate
      eyebrow="For Families"
      title="Sensory basics"
      intro="Plain-language background on how the central nervous system perceives, organizes, and responds to sensory inputs from the environment and within the body."
      lastUpdated="August 2026"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'For Families', href: '/families' },
        { label: 'Sensory basics' },
      ]}
      faqs={faqs}
      sources={sources}
      relatedLinks={[
        {
          title: 'What is a sensory diet?',
          href: '/topics/what-is-a-sensory-diet',
          description: 'How occupational therapists structure regulating activities throughout the day.',
        },
        {
          title: 'School and classroom support',
          href: '/families/school-support',
          description: 'Sensory accommodations for classroom desks and transitions.',
        },
        {
          title: 'Questions to ask an occupational therapist',
          href: '/topics/questions-to-ask-occupational-therapist',
          description: 'Intake questions when seeking a formal evaluation.',
        },
      ]}
      primaryCta={{
        text: 'Explore sensory diet concepts',
        href: '/topics/what-is-a-sensory-diet',
        subtext: 'Learn how specific sensory inputs nourish nervous system regulation.',
      }}
    >
      <h2>The Eight Sensory Systems</h2>
      <p>
        Most people are familiar with the five external senses (sight, sound, touch, taste, and
        smell). However, when occupational therapists assess sensory regulation, three internal
        sensory systems are equally essential:
      </p>
      <ul>
        <li>
          <strong>Proprioception (Joint & Muscle Feedback):</strong> Provides continuous feedback
          regarding body position in space and how much muscular force is exerted. Activities like
          pushing, lifting, pulling, or chewing provide heavy proprioceptive input that is calming
          and organizing.
        </li>
        <li>
          <strong>Vestibular (Balance & Motion):</strong> Receptors in the inner ear detect gravity,
          speed, and changes in head direction. Vestibular input dictates balance, posture, visual
          tracking, and physical alertness.
        </li>
        <li>
          <strong>Interoception (Internal Body Cues):</strong> Tells the brain what is happening
          inside the body—such as hunger, satiety, heart rate, respiration, bathroom urgency, and
          emotional activation.
        </li>
      </ul>

      <h2>Sensory Modulation: High vs. Low Thresholds</h2>
      <p>
        Every person has a unique neurological threshold for noticing sensory stimuli. Dr. Winnie
        Dunn&rsquo;s model identifies four primary patterns:
      </p>
      <ul>
        <li>
          <strong>Sensory Sensitive / Avoiding (Low Threshold):</strong> The brain registers input
          readily with minimal stimulation. Loud sounds, crowded rooms, or stiff fabrics can quickly
          overwhelm the nervous system, prompting protective withdrawal or fight-or-flight reactions.
        </li>
        <li>
          <strong>Sensory Seeking (High Threshold):</strong> The brain requires greater intensity,
          duration, or frequency of stimulation to reach optimal alertness. Individuals may jump,
          crash, spin, touch everything, or seek intense auditory feedback.
        </li>
        <li>
          <strong>Low Registration (High Threshold):</strong> Input is missed or takes longer to
          register. A child might not notice food on their face, respond when their name is called in
          a busy room, or realize their clothing is twisted.
        </li>
      </ul>

      <h2>External Educational Reading</h2>
      <p>
        For further parent-friendly explanations and developmental activity ideas, consult verified
        pediatric occupational therapy resources:
      </p>

      <div className="my-6">
        <ExternalResourceCard
          category="Pediatric OT Educational Library"
          title="Free Sensory Processing Resources, Handouts & Activities"
          org="The OT Toolbox"
          description="A curated public library of sensory processing articles, heavy work activity suggestions, and developmental guides created by licensed occupational therapists."
          url="https://www.theottoolbox.com/free-resources/"
        />
      </div>
    </EducationalTopicTemplate>
  );
}
