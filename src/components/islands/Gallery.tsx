import { useState } from 'react';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { galleryPhotos } from '@/data/photos';
import GalleryPlaceholder from './GalleryPlaceholder';

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(-1);

  if (galleryPhotos.length === 0) {
    return <GalleryPlaceholder />;
  }

  return (
    <>
      <PhotoAlbum
        photos={galleryPhotos}
        layout="masonry"
        columns={(width) => (width < 640 ? 2 : width < 1024 ? 3 : 4)}
        onClick={({ index }) => setOpenIndex(index)}
      />

      <Lightbox
        open={openIndex >= 0}
        index={openIndex}
        close={() => setOpenIndex(-1)}
        slides={galleryPhotos}
      />
    </>
  );
}
