import { useEffect, useRef, useState } from 'react';
import { partyPage } from '@/data/party';
import { uploadPartyPhoto } from '@/lib/partyApi';
import { resizeImage } from '@/lib/resizeImage';

export type PhotoStatus = 'ready' | 'sending' | 'done' | 'error';

export interface QueuedPhoto {
  id: string;
  file: File;
  previewUrl: string;
  status: PhotoStatus;
}

const { maxFilesPerBatch, maxEdgePx, jpegQuality } = partyPage.photos;

/** The photos a guest picked, and the sequential upload of them. Photos are sent one at a time to spare the mobile network. */
export function usePhotoQueue() {
  const [photos, setPhotos] = useState<QueuedPhoto[]>([]);
  const [isSending, setIsSending] = useState(false);
  const photosRef = useRef<QueuedPhoto[]>([]);
  const lastId = useRef(0);

  useEffect(() => {
    photosRef.current = photos;
  });

  // Free the preview URLs when the page closes.
  useEffect(() => {
    return () => photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
  }, []);

  const remaining = maxFilesPerBatch - photos.filter((photo) => photo.status !== 'done').length;

  function setStatus(id: string, status: PhotoStatus) {
    setPhotos((current) => current.map((photo) => (photo.id === id ? { ...photo, status } : photo)));
  }

  function addFiles(files: FileList | File[]) {
    const images = Array.from(files).filter((file) => file.type.startsWith('image/'));
    const accepted = images.slice(0, Math.max(0, remaining));
    if (accepted.length === 0) return;

    const added: QueuedPhoto[] = accepted.map((file) => ({
      id: String((lastId.current += 1)),
      file,
      previewUrl: URL.createObjectURL(file),
      status: 'ready',
    }));
    setPhotos((current) => [...current, ...added]);
  }

  function remove(id: string) {
    const target = photosRef.current.find((photo) => photo.id === id);
    if (target) URL.revokeObjectURL(target.previewUrl);
    setPhotos((current) => current.filter((photo) => photo.id !== id));
  }

  async function sendAll() {
    if (isSending) return;
    setIsSending(true);

    const queue = photosRef.current.filter((photo) => photo.status === 'ready' || photo.status === 'error');
    for (const photo of queue) {
      setStatus(photo.id, 'sending');
      try {
        const blob = await resizeImage(photo.file, maxEdgePx, jpegQuality);
        const result = await uploadPartyPhoto(blob, photo.file.name);
        setStatus(photo.id, result.ok ? 'done' : 'error');
      } catch {
        setStatus(photo.id, 'error');
      }
    }

    setIsSending(false);
  }

  return { photos, isSending, remaining, addFiles, remove, sendAll };
}