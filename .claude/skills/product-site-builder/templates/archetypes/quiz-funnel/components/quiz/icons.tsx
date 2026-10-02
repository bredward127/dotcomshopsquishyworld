import {
  Backpack,
  CircleDot,
  Cloud,
  Droplets,
  Dumbbell,
  Feather,
  Hand,
  Heart,
  Laptop,
  Layers,
  Monitor,
  MousePointerClick,
  Package,
  School,
  Shield,
  Sparkles,
  VolumeX,
  WashingMachine,
  type LucideIcon,
} from 'lucide-react';
import type { QuizIcon, Tone } from '@/data/quizData';

const ICONS: Record<QuizIcon, LucideIcon> = {
  laptop: Laptop,
  school: School,
  hand: Hand,
  heart: Heart,
  cloud: Cloud,
  dumbbell: Dumbbell,
  droplets: Droplets,
  'mouse-pointer-click': MousePointerClick,
  'volume-x': VolumeX,
  backpack: Backpack,
  monitor: Monitor,
  shield: Shield,
  'washing-machine': WashingMachine,
  feather: Feather,
  layers: Layers,
  package: Package,
  sparkles: Sparkles,
  'circle-dot': CircleDot,
};

/** Full class strings so Tailwind can see them. */
export const TONE_CLASSES: Record<Tone, { tile: string; icon: string; blob: string; text: string }> = {
  mint: {
    tile: 'bg-gradient-to-br from-mint-100 to-mint-200',
    icon: 'text-mint-700',
    blob: 'bg-mint-400/40',
    text: 'text-mint-700',
  },
  lavender: {
    tile: 'bg-gradient-to-br from-lavender-100 to-lavender-200',
    icon: 'text-lavender-700',
    blob: 'bg-lavender-400/40',
    text: 'text-lavender-700',
  },
  peach: {
    tile: 'bg-gradient-to-br from-peach-100 to-peach-200',
    icon: 'text-peach-500',
    blob: 'bg-peach-500/25',
    text: 'text-peach-500',
  },
  sky: {
    tile: 'bg-gradient-to-br from-sky-100 to-sky-200',
    icon: 'text-sky-500',
    blob: 'bg-sky-500/20',
    text: 'text-sky-500',
  },
};

export function QuizGlyph({ name, className }: { name: QuizIcon; className?: string }) {
  const Icon = ICONS[name];
  return <Icon aria-hidden="true" className={className} strokeWidth={1.75} />;
}

/**
 * Pastel illustration tile: a soft blob behind a Lucide icon. Stands in for
 * photography wherever no real product image is available.
 */
export function ToneTile({
  icon,
  tone,
  className = '',
  iconClassName = 'h-9 w-9',
}: {
  icon: QuizIcon;
  tone: Tone;
  className?: string;
  iconClassName?: string;
}) {
  const t = TONE_CLASSES[tone];
  return (
    <div className={`relative isolate grid place-items-center overflow-hidden ${t.tile} ${className}`}>
      <span aria-hidden="true" className={`absolute -right-4 -top-4 -z-10 aspect-square w-2/3 rounded-full ${t.blob}`} />
      <span aria-hidden="true" className={`absolute -bottom-5 -left-5 -z-10 aspect-square w-1/2 rounded-full ${t.blob}`} />
      <QuizGlyph name={icon} className={`${iconClassName} ${t.icon}`} />
    </div>
  );
}
