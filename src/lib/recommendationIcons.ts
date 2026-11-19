import { IconBed, IconMapPin, IconSparkles } from '@tabler/icons-react';
import type { Recommendation } from '@/data/event';

const ICONS: Record<Recommendation['category'], typeof IconBed> = {
  lodging: IconBed,
  beauty: IconSparkles,
};

export function getRecommendationIcon(category: string): typeof IconBed {
  return ICONS[category as Recommendation['category']] ?? IconMapPin;
}