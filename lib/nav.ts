export type NavLink = {
  label: string;
  href: string;
  description: string;
};

export type NavGroup = {
  label: string;
  href: string;
  links: NavLink[];
};

/**
 * Every href below resolves to a route implemented in this repository.
 * Nothing here points at a placeholder anchor or an unbuilt page.
 */
export const navGroups: NavGroup[] = [
  {
    label: 'For Families',
    href: '/families',
    links: [
      {
        label: 'Start here',
        href: '/families',
        description: 'How to use this site and what it does and does not cover.',
      },
      {
        label: 'Sensory basics',
        href: '/families/sensory-basics',
        description: 'Plain-language background on sensory processing.',
      },
      {
        label: 'School and classroom',
        href: '/families/school-support',
        description: 'General information about support in school settings.',
      },
      {
        label: 'What is a sensory diet?',
        href: '/topics/what-is-a-sensory-diet',
        description: 'Plain-language explanation of OT regulation schedules.',
      },
    ],
  },
  {
    label: 'Find Local Help',
    href: '/find-help',
    links: [
      {
        label: 'Find local support',
        href: '/find-help',
        description: 'Regional listings for sensory-related services.',
      },
      {
        label: 'What to ask a provider',
        href: '/find-help/what-to-ask',
        description: 'Questions to bring to a first conversation.',
      },
      {
        label: 'Pediatric OT in Metro Detroit',
        href: '/topics/find-pediatric-occupational-therapy-metro-detroit',
        description: 'Local guide to referrals, waitlists, and clinics.',
      },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    links: [
      {
        label: 'External resources',
        href: '/resources',
        description: 'Reputable organizations and public information.',
      },
      {
        label: 'Glossary',
        href: '/resources/glossary',
        description: 'Terms you may encounter, explained simply.',
      },
      {
        label: 'Editorial policy',
        href: '/editorial-policy',
        description: 'Verification standards, disclosures, and corrections.',
      },
    ],
  },
  {
    label: 'For Providers',
    href: '/for-providers',
    links: [
      {
        label: 'About listings',
        href: '/for-providers',
        description: 'Information for local practices and organizations.',
      },
    ],
  },
];

/**
 * Routes reached from the home page and in-page links rather than the main
 * nav groups. Listed here so the sitemap stays complete.
 */
export const standaloneLinks: NavLink[] = [
  { label: 'Ask a question', href: '/ask', description: 'Where to find answers on this site today.' },
  { label: 'For an adult', href: '/for-adults', description: 'Information for adults considering their own sensory needs.' },
  {
    label: 'Sensory support for adults in Michigan',
    href: '/topics/sensory-friendly-support-adults-southeast-michigan',
    description: 'Workplace and daily living guidance for adults.',
  },
  {
    label: 'Questions to ask an OT',
    href: '/topics/questions-to-ask-occupational-therapist',
    description: '10-question screening checklist for choosing an occupational therapist.',
  },
  {
    label: 'Pediatric OT in Royal Oak',
    href: '/services/pediatric-occupational-therapy-royal-oak',
    description: 'Local guide and directory for South Oakland County.',
  },
  {
    label: 'Pediatric OT in Troy',
    href: '/services/pediatric-occupational-therapy-troy',
    description: 'Local guide and directory for North Oakland County.',
  },
  {
    label: 'Pediatric OT in Dearborn',
    href: '/services/pediatric-occupational-therapy-dearborn',
    description: 'Local guide and directory for Western Wayne County.',
  },
];

export const footerLinks: NavLink[] = [
  { label: 'About', href: '/about', description: 'Who runs this site and why.' },
  { label: 'Editorial Policy', href: '/editorial-policy', description: 'Verification standards and sponsorship policy.' },
  { label: 'Privacy', href: '/privacy', description: 'How this site handles data.' },
  { label: 'Disclosure', href: '/disclosure', description: 'Funding and affiliate disclosure.' },
];

/** Flattened list used by the in-drawer navigation filter. */
export const allNavLinks: NavLink[] = [
  ...navGroups.flatMap((group) => group.links),
  ...standaloneLinks,
  ...footerLinks,
];
