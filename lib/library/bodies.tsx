import type { ComponentType } from 'react';
import WhatIsASensoryDiet from './content/what-is-a-sensory-diet';
import WhatIsProprioception from './content/what-is-proprioception';
import HeavyWorkActivitiesAtHome from './content/heavy-work-activities-at-home';
import WhatIsVestibularProcessing from './content/what-is-vestibular-processing';
import WhyKidsRefuseClothingTextures from './content/why-kids-refuse-clothing-textures';
import WhatIsTactileDefensiveness from './content/what-is-tactile-defensiveness';
import WhyLoudNoisesAreDistressing from './content/why-loud-noises-are-distressing';
import WhatIsInteroception from './content/what-is-interoception';

/**
 * Slug -> article body component.
 *
 * Kept out of lib/library/articles.ts deliberately: these files contain JSX,
 * and articles.ts is imported by plain Node unit tests that only strip
 * TypeScript types, not JSX syntax. Only app code (built through Next/SWC)
 * imports this file.
 */
export const libraryBodies: Record<string, ComponentType> = {
  'what-is-a-sensory-diet': WhatIsASensoryDiet,
  'what-is-proprioception': WhatIsProprioception,
  'heavy-work-activities-at-home': HeavyWorkActivitiesAtHome,
  'what-is-vestibular-processing': WhatIsVestibularProcessing,
  'why-kids-refuse-clothing-textures': WhyKidsRefuseClothingTextures,
  'what-is-tactile-defensiveness': WhatIsTactileDefensiveness,
  'why-loud-noises-are-distressing': WhyLoudNoisesAreDistressing,
  'what-is-interoception': WhatIsInteroception,
};
