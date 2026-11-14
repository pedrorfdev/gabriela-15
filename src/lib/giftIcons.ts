import { IconDiamond, IconFlower, IconGift, IconShirt, IconShoe } from '@tabler/icons-react';

/** Icons a gift category can use. Add a new one here and it becomes valid in data/gifts.ts. */
export const giftIcons = {
  shirt: IconShirt,
  flower: IconFlower,
  diamond: IconDiamond,
  shoe: IconShoe,
  gift: IconGift,
} as const;

export type GiftIconName = keyof typeof giftIcons;

/** Alternating icon-circle colors, so neighbouring categories don't look identical. */
export const giftTints = ['bg-brand/10 text-brand', 'bg-band text-accent'] as const;