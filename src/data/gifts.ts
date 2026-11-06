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

// TODO: confirm categories with the birthday girl.
const categories: GiftCategory[] = [
  { id: 'perfumes', icon: 'flower', title: 'Perfumes', hint: 'ex.: O Boticário' },
  { id: 'beauty', icon: 'brush', title: 'Maquiagem e skincare', hint: 'kits, cuidados com a pele' },
  { id: 'fashion', icon: 'shirt', title: 'Roupas e acessórios', hint: 'bolsas, bijuterias' },
  { id: 'books', icon: 'book', title: 'Livros', hint: 'ficção, diários, arte' },
];

// TODO: real key. Prefer a random key or email over CPF/phone: anyone who
// gets past the gate can read it.
const pix: PixInfo = {
  enabled: true,
  title: 'Prefere contribuir?',
  description: 'Chave Pix da família',
  key: 'TODO: chave pix',
};

export const giftsPage = {
  intro: 'Sem lista fechada: escolha o que combina com a Gabi.',
  categories,
  pix,
};