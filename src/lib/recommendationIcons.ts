import { IconBed, IconSparkles } from '@tabler/icons-react';
import type { Recommendation } from '@/data/event';

export const recommendationIcons: Record<Recommendation['category'], typeof IconBed> = {
  lodging: IconBed,
  beauty: IconSparkles,
};