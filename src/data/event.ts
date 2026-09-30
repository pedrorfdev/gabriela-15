export interface Recommendation {
  id: string;
  category: 'lodging' | 'beauty';
  categoryLabel: string;
  name: string;
  description: string;
  mapsUrl: string;
  imageColor: string;
}

export interface GiftOption {
  id: string;
  icon: string;
  title: string;
  description?: string;
  link?: string;
}

export interface SeedMessage {
  id: string;
  sender: string;
  message: string;
}

export interface SocialLink {
  platform: 'instagram' | 'whatsapp';
  url: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface StudioCredit {
  name: string;
  url: string;
}

export const eventConfig = {
  person: { name: 'Gabriela', age: 15 },

  date: {
    iso: '2027-02-15T20:00:00-03:00',
    displayDate: '15 de fevereiro de 2027',
    displayTime: '20h00',
  },

  rsvpDeadline: {
    iso: '2027-02-01T23:59:59-03:00',
    display: '01 de fevereiro de 2027',
  },

  venue: {
    name: 'Clube Comercial',
    address: '609, R. Mal. Floriano Peixoto, 451 - Centro, Rosário do Sul - RS, 97590-000',
    mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.287619024498!2d-54.918082399999996!3d-30.257385199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9500e67e09bd6d7f%3A0xbf962564c4254e11!2sClube%20Comercial!5e0!3m2!1spt-BR!2sbr!4v1790788482772!5m2!1spt-BR!2sbr',
    mapsLinkUrl: 'https://www.google.com/maps/place/Clube+Comercial/@-30.2573852,-54.9180824,17z/data=!3m1!4b1!4m6!3m5!1s0x9500e67e09bd6d7f:0xbf962564c4254e11!8m2!3d-30.2573852!4d-54.9180824!16s%2Fg%2F1tkbzctv?entry=ttu&g_ep=EgoyMDI2MDkyNy4xIKXMDSoASAFQAw%3D%3D',
    lat: 0,
    lng: 0,
  },

  dressCode: {
    title: 'Traje',
    description: 'Esporte fino',
  },

  gate: { hint: '' },

  hashtag: '#GabrielaFaz15',

  social: [
    { platform: 'instagram', url: 'TODO: instagram link' },
    { platform: 'whatsapp', url: 'TODO: wa.me link' },
  ] as SocialLink[],

  credit: 'feito com carinho pelo irmão da aniversariante',

  studio: {
    name: 'Ferreira.studio',
    url: 'https://ferreira-studio.vercel.app/',
  } as StudioCredit,
};

export const recommendations: Recommendation[] = [
  {
    id: 'hotel-1',
    category: 'lodging',
    categoryLabel: 'Hospedagem',
    name: 'TODO: real hotel name',
    description: 'Conforto e praticidade perto do salão.',
    mapsUrl: '',
    imageColor: '#D9A3B8',
  },
  {
    id: 'salon-1',
    category: 'beauty',
    categoryLabel: 'Beleza',
    name: 'TODO: real studio name',
    description: 'Cabelo e maquiagem — vale reservar com antecedência.',
    mapsUrl: '',
    imageColor: '#D8C08A',
  },
];

export const giftOptions: GiftOption[] = [
  { id: 'trip', icon: 'plane', title: 'Contribuir com uma viagem' },
  { id: 'gift-list', icon: 'gift', title: 'Ver lista de presentes', link: '' },
  { id: 'pix', icon: 'heart', title: 'Contribuição livre (Pix)', description: 'chave: TODO' },
];

export const seedMessages: SeedMessage[] = [
  { id: 'msg-1', sender: 'da vovó', message: 'TODO: real message from grandma' },
  { id: 'msg-2', sender: 'da madrinha', message: 'TODO: real message from godmother' },
  { id: 'msg-3', sender: 'do padrinho', message: 'TODO: real message from godfather' },
];

export const navLinks: NavLink[] = [
  { label: 'Detalhes', href: '#details' },
  { label: 'Mapa', href: '#venue' },
  { label: 'Presentes', href: '#gifts' },
  { label: 'Galeria', href: '#gallery' },
  { label: 'Mensagens', href: '#messages' },
];