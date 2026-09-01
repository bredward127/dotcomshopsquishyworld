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
    ],
  },
  {
    label: 'Find Local Help',
    href: '/directory',
    links: [
      {
        label: 'Local service directory',
        href: '/directory',
        description: 'Regional listings for sensory-related services.',
      },
      {
        label: 'What to ask a provider',
        href: '/directory/what-to-ask',
        description: 'Questions to bring to a first conversation.',
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
    ],
  },
  {
    label: 'For Providers',
    href: '/providers',
    links: [
      {
        label: 'About listings',
        href: '/providers',
        description: 'Information for local practices and organizations.',
      },
    ],
  },
];

export const footerLinks: NavLink[] = [
  { label: 'About', href: '/about', description: 'Who runs this site and why.' },
  { label: 'Privacy', href: '/privacy', description: 'How this site handles data.' },
  { label: 'Disclosure', href: '/disclosure', description: 'Funding and affiliate disclosure.' },
];

/** Flattened list used by the in-drawer navigation filter. */
export const allNavLinks: NavLink[] = [
  ...navGroups.flatMap((group) => group.links),
  ...footerLinks,
];
