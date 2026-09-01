import type { ComponentType } from 'react';
import WhatIsASensoryDiet from './content/what-is-a-sensory-diet';
import WhatIsProprioception from './content/what-is-proprioception';
import HeavyWorkActivitiesAtHome from './content/heavy-work-activities-at-home';
import WhatIsVestibularProcessing from './content/what-is-vestibular-processing';
import WhyKidsRefuseClothingTextures from './content/why-kids-refuse-clothing-textures';
import WhatIsTactileDefensiveness from './content/what-is-tactile-defensiveness';
import WhyLoudNoisesAreDistressing from './content/why-loud-noises-are-distressing';
import WhatIsInteroception from './content/what-is-interoception';
import ToolsForSoundSensitivity from './content/tools-for-sound-sensitivity';
import SoundFriendlyClassroomStrategies from './content/sound-friendly-classroom-strategies';
import WhyFluorescentLightsFeelOverwhelming from './content/why-fluorescent-lights-feel-overwhelming';
import HowToSetUpALowStimulationSpace from './content/how-to-set-up-a-low-stimulation-space';
import WhatIsOralSensorySeeking from './content/what-is-oral-sensory-seeking';
import SafeChewableSensoryTools from './content/safe-chewable-sensory-tools';
import HelpingAPickyEaterWithFoodTextures from './content/helping-a-picky-eater-with-food-textures';
import WhyKidsSpinRockAndSeekMovement from './content/why-kids-spin-rock-and-seek-movement';
import SafeMovementActivitiesDuringTheDay from './content/safe-movement-activities-during-the-day';
import WhyPushingAndSqueezingFeelsCalming from './content/why-pushing-and-squeezing-feels-calming';
import WhyKidsMissHungerThirstBathroomSignals from './content/why-kids-miss-hunger-thirst-bathroom-signals';
import BuildingBodyAwarenessAsAnAdult from './content/building-body-awareness-as-an-adult';
import HowSchoolBasedOtWorks from './content/how-school-based-ot-works';
import ClassroomSensoryAccommodations from './content/classroom-sensory-accommodations';
import TalkingToATeacherAboutSensoryNeeds from './content/talking-to-a-teacher-about-sensory-needs';
import QuestionsAboutCostInsuranceAndScheduling from './content/questions-about-cost-insurance-and-scheduling';
import QuestionsAboutApproachAndExperience from './content/questions-about-approach-and-experience';
import WorkplaceSensoryAccommodations from './content/workplace-sensory-accommodations';
import AdultSensoryAssessmentWhatToExpect from './content/adult-sensory-assessment-what-to-expect';
import SensoryFriendlyDailyRoutinesForAdults from './content/sensory-friendly-daily-routines-for-adults';

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
  'tools-for-sound-sensitivity': ToolsForSoundSensitivity,
  'sound-friendly-classroom-strategies': SoundFriendlyClassroomStrategies,
  'why-fluorescent-lights-feel-overwhelming': WhyFluorescentLightsFeelOverwhelming,
  'how-to-set-up-a-low-stimulation-space': HowToSetUpALowStimulationSpace,
  'what-is-oral-sensory-seeking': WhatIsOralSensorySeeking,
  'safe-chewable-sensory-tools': SafeChewableSensoryTools,
  'helping-a-picky-eater-with-food-textures': HelpingAPickyEaterWithFoodTextures,
  'why-kids-spin-rock-and-seek-movement': WhyKidsSpinRockAndSeekMovement,
  'safe-movement-activities-during-the-day': SafeMovementActivitiesDuringTheDay,
  'why-pushing-and-squeezing-feels-calming': WhyPushingAndSqueezingFeelsCalming,
  'why-kids-miss-hunger-thirst-bathroom-signals': WhyKidsMissHungerThirstBathroomSignals,
  'building-body-awareness-as-an-adult': BuildingBodyAwarenessAsAnAdult,
  'how-school-based-ot-works': HowSchoolBasedOtWorks,
  'classroom-sensory-accommodations': ClassroomSensoryAccommodations,
  'talking-to-a-teacher-about-sensory-needs': TalkingToATeacherAboutSensoryNeeds,
  'questions-about-cost-insurance-and-scheduling': QuestionsAboutCostInsuranceAndScheduling,
  'questions-about-approach-and-experience': QuestionsAboutApproachAndExperience,
  'workplace-sensory-accommodations': WorkplaceSensoryAccommodations,
  'adult-sensory-assessment-what-to-expect': AdultSensoryAssessmentWhatToExpect,
  'sensory-friendly-daily-routines-for-adults': SensoryFriendlyDailyRoutinesForAdults,
};
