import type { GiftIconName } from '@/lib/giftIcons';

export interface GiftCategory {
  id: string;
  icon: GiftIconName;
  title: string;
  hint?: string;
}

export interface PixInfo {
  enabled: boolean;
  title: string;
  description: string;
  key: string;
}

const categories: GiftCategory[] = [
  { id: 'clothing', icon: 'shirt', title: 'Roupas', hint: 'tamanho M / 40' },
  { id: 'perfume', icon: 'flower', title: 'Perfumes', hint: 'florais e doces' },
  { id: 'jewelry', icon: 'diamond', title: 'Joias', hint: 'prata e dourado, berloque' },
  { id: 'shoes', icon: 'shoe', title: 'Calçados', hint: 'número 38/39' },
];

// Hidden until the family confirms a key. Prefer a random key or email over
// CPF/phone: anyone who gets past the gate can read it.
const pix: PixInfo = {
  enabled: false,
  title: 'Prefere contribuir?',
  description: 'Chave Pix da família',
  key: 'TODO: chave pix',
};

export const giftsPage = {
  intro: 'Algumas pistas do que a Gabi gosta, para te ajudar a escolher.',
  categories,
  pix,
};