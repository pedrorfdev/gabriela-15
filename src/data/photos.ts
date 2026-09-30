// ============================================================
// src/data/photos.ts
//
// TODO: add real photos here once available. Each entry needs
// width/height so react-photo-album can lay out the mosaic
// correctly. Drop image files into src/assets/images/gallery/
// and import them here.
// ============================================================

export interface GalleryPhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export const galleryPhotos: GalleryPhoto[] = [];
