// ============================================================
// src/data/photos.ts
//
// Photos shown on the site. Drop the image files into
// src/assets/photos/ and import them here, e.g.:
//
//   import shoot1 from '@/assets/photos/shoot-1.jpg';
//   { image: shoot1, alt: 'Gabriela no ensaio de 15 anos' }
// ============================================================

import type { ImageMetadata } from 'astro';

export interface HeroPhoto {
  image: ImageMetadata;
  alt: string;
}

export interface GalleryPhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/** Slides inside the entrance ticket stub. Empty: the stub shows the soft pink gradient. */
// TODO: add the photo shoot pictures that slide inside the entrance ticket.
export const heroPhotos: HeroPhoto[] = [];

/** Fixed, curated photos of the gallery section. */
// TODO: add the photo shoot pictures for the gallery.
export const galleryPhotos: GalleryPhoto[] = [];