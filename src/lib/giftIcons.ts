import { IconFlower, IconBrush, IconShirt, IconBook, IconGift } from '@tabler/icons-react';

/** Icons a gift category can use. Add a new one here and it becomes valid in data/gifts.ts. */
export const giftIcons = {
  flower: IconFlower,
  brush: IconBrush,
  shirt: IconShirt,
  book: IconBook,
  gift: IconGift,
} as const;

export type GiftIconName = keyof typeof giftIcons;