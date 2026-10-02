/**
 * Sensory Match quiz: questions, personas, and the affiliate product inventory.
 *
 * Everything the quiz shows is declared here so copy and products can change
 * without touching components. Scoring lives in lib/quiz/scoring.ts and link
 * building in lib/quiz/affiliate.ts.
 *
 * Honesty rules for this file:
 * - `rating` and `reviewCount` are optional and left unset. They render only
 *   when filled with figures copied from a live listing, never invented ones.
 * - No prices are stored or shown. Amazon limits displaying prices that do
 *   not come from its Product Advertising API, so every CTA reads
 *   "See price on Amazon" and opens the live listing.
 * - Until a specific listing is chosen, `amazonQuery` sends the visitor to a
 *   tagged Amazon search. Set `asin` to link a single product page instead.
 */

export type Trait = 'calm' | 'tactile' | 'compression' | 'focus';

export const TRAITS: readonly Trait[] = ['calm', 'tactile', 'compression', 'focus'];

/** Lucide icon names used by the quiz. Mapped to components in components/quiz/icons.tsx. */
export type QuizIcon =
  | 'laptop'
  | 'school'
  | 'hand'
  | 'heart'
  | 'cloud'
  | 'dumbbell'
  | 'droplets'
  | 'mouse-pointer-click'
  | 'volume-x'
  | 'backpack'
  | 'monitor'
  | 'shield'
  | 'washing-machine'
  | 'feather'
  | 'layers'
  | 'package'
  | 'sparkles'
  | 'circle-dot';

/** Pastel tile used as the option and product illustration. */
export type Tone = 'mint' | 'lavender' | 'peach' | 'sky';

export interface QuizOption {
  id: string;
  label: string;
  description: string;
  icon: QuizIcon;
  tone: Tone;
  trait: Trait;
}

export interface QuizQuestion {
  id: number;
  /** Short label for the progress bar. */
  step: string;
  title: string;
  subtitle: string;
  options: QuizOption[];
}

/**
 * The spec's `ProductRecommendation`, with two additions: `slots` says which
 * results tier a product may fill, and `quiet` marks products suitable for
 * meetings and classrooms.
 */
export interface ProductRecommendation {
  id: string;
  name: string;
  badge: string;
  rating?: number;
  reviewCount?: number;
  description: string;
  traits: Trait[];
  /** Short reasons shown under "Why it matches". */
  highlights: string[];
  slots: Array<'best' | 'quiet' | 'multipack'>;
  quiet: boolean;
  icon: QuizIcon;
  tone: Tone;
  /** Amazon search phrase used until a specific listing is picked. */
  amazonQuery: string;
  /** Set to link directly to one product page. Takes precedence over amazonQuery. */
  asin?: string;
  /** Optional hosted image. Without one, a pastel icon tile is drawn. */
  imageUrl?: string;
}

export interface Persona {
  trait: Trait;
  name: string;
  /** Adjective used when a second trait is combined into the profile badge. */
  badgeWord: string;
  tagline: string;
  summary: string;
  icon: QuizIcon;
  tone: Tone;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    step: 'Who',
    title: 'Who is this squishy for?',
    subtitle: 'Pick the one that sounds most like the person holding it.',
    options: [
      {
        id: 'desk-focus',
        label: 'Deep focus & desk work',
        description: 'Long calls, study sessions, restless hands at a keyboard.',
        icon: 'laptop',
        tone: 'sky',
        trait: 'focus',
      },
      {
        id: 'classroom',
        label: 'Classroom & student calm',
        description: 'Something small that settles a kid without distracting a room.',
        icon: 'school',
        tone: 'mint',
        trait: 'calm',
      },
      {
        id: 'tactile',
        label: 'Tactile & sensory exploring',
        description: 'Loves textures, squeezing, stretching, and poking at things.',
        icon: 'hand',
        tone: 'peach',
        trait: 'tactile',
      },
      {
        id: 'decompress',
        label: 'Everyday decompression',
        description: 'A hard squeeze at the end of a long, loud day.',
        icon: 'heart',
        tone: 'lavender',
        trait: 'compression',
      },
    ],
  },
  {
    id: 2,
    step: 'Feel',
    title: 'Which feel do they reach for first?',
    subtitle: 'Go with the gut answer. There is no wrong texture.',
    options: [
      {
        id: 'slow-rise',
        label: 'Ultra slow-rise squish',
        description: 'Sinks under a thumb and melts back into shape.',
        icon: 'cloud',
        tone: 'lavender',
        trait: 'calm',
      },
      {
        id: 'heavy-squeeze',
        label: 'Resistant & heavy squeeze',
        description: 'Pushes back. Takes real grip strength to flatten.',
        icon: 'dumbbell',
        tone: 'peach',
        trait: 'compression',
      },
      {
        id: 'jelly',
        label: 'Liquid jelly & water-bead',
        description: 'Cool, squelchy, and a little bit gooey to hold.',
        icon: 'droplets',
        tone: 'sky',
        trait: 'tactile',
      },
      {
        id: 'fidget-texture',
        label: 'Clicky but silent texture',
        description: 'Ridges, nubs, and pops that make no sound.',
        icon: 'mouse-pointer-click',
        tone: 'mint',
        trait: 'focus',
      },
    ],
  },
  {
    id: 3,
    step: 'Where',
    title: 'Where will it spend most of its time?',
    subtitle: 'Noise and size decide more than people expect.',
    options: [
      {
        id: 'silent',
        label: '100% silent',
        description: 'Meeting- and classroom-friendly. Nobody else notices.',
        icon: 'volume-x',
        tone: 'mint',
        trait: 'focus',
      },
      {
        id: 'pocket',
        label: 'Pocket-sized & on the go',
        description: 'Backpack, car, waiting rooms, bedtime.',
        icon: 'backpack',
        tone: 'lavender',
        trait: 'calm',
      },
      {
        id: 'desk-centerpiece',
        label: 'Big two-handed desk piece',
        description: 'Stays put, gets squeezed hard and often.',
        icon: 'monitor',
        tone: 'peach',
        trait: 'compression',
      },
    ],
  },
  {
    id: 4,
    step: 'Care',
    title: 'What matters most for it to last?',
    subtitle: 'Last one. Your match is ready after this.',
    options: [
      {
        id: 'tough',
        label: 'Tough & tear-resistant',
        description: 'Survives nails, teeth marks, and being thrown.',
        icon: 'shield',
        tone: 'peach',
        trait: 'compression',
      },
      {
        id: 'washable',
        label: 'Washable & dust-proof',
        description: 'Rinses clean. No lint, no sticky residue.',
        icon: 'washing-machine',
        tone: 'sky',
        trait: 'tactile',
      },
      {
        id: 'plush',
        label: 'Cloud-soft plush outside',
        description: 'Fabric-covered and cozy, never tacky.',
        icon: 'feather',
        tone: 'lavender',
        trait: 'calm',
      },
    ],
  },
];

export const personas: Record<Trait, Persona> = {
  focus: {
    trait: 'focus',
    name: 'Quiet Desk Focus',
    badgeWord: 'Quiet Focus',
    tagline: 'Busy hands, quiet room.',
    summary:
      'You want something the hands can work on while the head stays on the task. Silent textures and a small footprint matter more than softness, so your matches favor ridged, nubby, and slow-rise pieces that make no sound in a meeting or a classroom.',
    icon: 'laptop',
    tone: 'sky',
  },
  calm: {
    trait: 'calm',
    name: 'Slow-Rise Calm Keeper',
    badgeWord: 'Slow-Rise Calm',
    tagline: 'Soft, slow, and always within reach.',
    summary:
      'You lean toward gentle, pillowy textures that take their time. A squeeze that sinks in and slowly returns gives a steady rhythm to follow, so your matches favor slow-rise foam and plush-covered pieces small enough to keep in a pocket.',
    icon: 'cloud',
    tone: 'lavender',
  },
  compression: {
    trait: 'compression',
    name: 'Deep Compression Seeker',
    badgeWord: 'Deep Pressure',
    tagline: 'The harder the squeeze, the better.',
    summary:
      'You want resistance: something that pushes back and can take a full-strength grip. Your matches favor dense, heavier, tear-resistant pieces, including two-handed sizes that give the whole hand real work to do.',
    icon: 'dumbbell',
    tone: 'peach',
  },
  tactile: {
    trait: 'tactile',
    name: 'Texture Explorer',
    badgeWord: 'Texture',
    tagline: 'Every surface is worth a poke.',
    summary:
      'You are drawn to novelty and texture: squelchy gel, water beads, stretch, and bumps. Your matches favor varied, washable pieces that feel different every time and rinse clean afterwards.',
    icon: 'droplets',
    tone: 'mint',
  },
};

export const products: ProductRecommendation[] = [
  // --- focus ---
  {
    id: 'silent-texture-cube',
    name: 'Silent Texture Fidget Cube',
    badge: 'Meeting-safe',
    description: 'Six soft-touch faces of ridges, nubs, and rollers with no clicks.',
    traits: ['focus', 'tactile'],
    highlights: ['Makes no sound', 'Fits in one palm', 'Different texture on every side'],
    slots: ['best', 'quiet'],
    quiet: true,
    icon: 'circle-dot',
    tone: 'sky',
    amazonQuery: 'silent fidget cube soft texture',
  },
  {
    id: 'desk-stress-ball-set',
    name: 'Soft-Grip Desk Stress Balls',
    badge: 'Desk favorite',
    description: 'Palm-sized foam balls with a matte finish that stays quiet under pressure.',
    traits: ['focus', 'calm'],
    highlights: ['Silent squeeze', 'Matte, non-sticky finish', 'Easy one-hand use'],
    slots: ['best', 'quiet'],
    quiet: true,
    icon: 'sparkles',
    tone: 'mint',
    amazonQuery: 'quiet desk stress ball foam adult',
  },
  // --- calm ---
  {
    id: 'slow-rise-mochi',
    name: 'Slow-Rise Memory Foam Squishy',
    badge: 'Softest pick',
    description: 'Pillowy foam that sinks slowly under the thumb and rises back over seconds.',
    traits: ['calm', 'focus'],
    highlights: ['Very slow rise', 'Pocket-sized', 'Silent'],
    slots: ['best', 'quiet'],
    quiet: true,
    icon: 'cloud',
    tone: 'lavender',
    amazonQuery: 'slow rising squishy memory foam',
  },
  {
    id: 'plush-squish-pal',
    name: 'Plush-Covered Squish Pal',
    badge: 'Cozy pick',
    description: 'A soft fabric outer over a squeezable core. Warm to hold, never tacky.',
    traits: ['calm', 'compression'],
    highlights: ['Fabric outer, no residue', 'Great for bedtime', 'Holds up to hugging'],
    slots: ['best'],
    quiet: true,
    icon: 'feather',
    tone: 'lavender',
    amazonQuery: 'plush squishy toy soft squeeze',
  },
  // --- compression ---
  {
    id: 'heavy-resistance-ball',
    name: 'Heavy-Resistance Squeeze Ball',
    badge: 'Firmest pick',
    description: 'Dense, thick-walled ball built to take a full-strength grip and bounce back.',
    traits: ['compression', 'focus'],
    highlights: ['High resistance', 'Tear-resistant shell', 'Silent'],
    slots: ['best', 'quiet'],
    quiet: true,
    icon: 'dumbbell',
    tone: 'peach',
    amazonQuery: 'heavy resistance stress ball tear resistant',
  },
  {
    id: 'jumbo-two-hand-squishy',
    name: 'Jumbo Two-Hand Squishy',
    badge: 'Big squeeze',
    description: 'A large, dense desk centerpiece that gives both hands real work.',
    traits: ['compression', 'calm'],
    highlights: ['Two-handed size', 'Deep, slow compression', 'Stays put on a desk'],
    slots: ['best'],
    quiet: true,
    icon: 'layers',
    tone: 'peach',
    amazonQuery: 'jumbo squishy large slow rise',
  },
  // --- tactile ---
  {
    id: 'water-bead-gel-ball',
    name: 'Water-Bead Gel Squeeze Ball',
    badge: 'Most squelchy',
    description: 'A clear, stretchy shell packed with gel beads you can see and feel shift.',
    traits: ['tactile', 'calm'],
    highlights: ['Cool gel feel', 'Visual and tactile', 'Wipes clean'],
    slots: ['best'],
    quiet: false,
    icon: 'droplets',
    tone: 'sky',
    amazonQuery: 'water bead squeeze ball sensory',
  },
  {
    id: 'washable-textured-set',
    name: 'Washable Textured Squeeze Set',
    badge: 'Easy clean',
    description: 'Bumpy, spiky, and ridged silicone shapes that go straight under the tap.',
    traits: ['tactile', 'compression'],
    highlights: ['Rinse-clean silicone', 'No dust or lint', 'Several textures'],
    slots: ['best', 'quiet'],
    quiet: true,
    icon: 'washing-machine',
    tone: 'mint',
    amazonQuery: 'washable textured sensory balls silicone',
  },
  // --- multi-packs ---
  {
    id: 'mini-squishy-variety-pack',
    name: 'Mini Squishy Variety Pack',
    badge: 'Best value',
    description: 'A bag of small slow-rise squishies. Keep one in every room and backpack.',
    traits: ['calm', 'tactile'],
    highlights: ['Many pieces, one price', 'Pocket-sized', 'Classroom sharing'],
    slots: ['multipack'],
    quiet: true,
    icon: 'package',
    tone: 'lavender',
    amazonQuery: 'mini squishy variety pack slow rise',
  },
  {
    id: 'stress-ball-multipack',
    name: 'Stress Ball Resistance Multi-Pack',
    badge: 'Best value',
    description: 'Soft, medium, and firm balls in one set, so every grip level is covered.',
    traits: ['compression', 'focus'],
    highlights: ['Three resistance levels', 'Silent', 'Share at home or work'],
    slots: ['multipack'],
    quiet: true,
    icon: 'package',
    tone: 'peach',
    amazonQuery: 'stress ball set multiple resistance levels',
  },
  {
    id: 'sensory-fidget-bundle',
    name: 'Sensory Fidget Bundle',
    badge: 'Best value',
    description: 'A mixed kit of gel, textured, and stretchy fidgets for trying everything.',
    traits: ['tactile', 'focus'],
    highlights: ['Wide texture mix', 'Find a favorite fast', 'Good for groups'],
    slots: ['multipack'],
    quiet: false,
    icon: 'package',
    tone: 'mint',
    amazonQuery: 'sensory fidget toys bundle squishy',
  },
];

/** Affiliate tag from the spec. Override per environment with NEXT_PUBLIC_AMAZON_TAG. */
export const DEFAULT_AFFILIATE_TAG = 'top100blog-20';

/** "View All Squishies" destination in the funnel header. */
export const ALL_SQUISHIES_QUERY = 'sensory squishy toys';
