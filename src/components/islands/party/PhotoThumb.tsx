import { IconAlertTriangle, IconCheck, IconLoader2, IconX } from '@tabler/icons-react';
import type { QueuedPhoto } from '@/hooks/usePhotoQueue';

interface PhotoThumbProps {
  photo: QueuedPhoto;
  canRemove: boolean;
  onRemove: () => void;
}

const STATUS_ICON = {
  sending: <IconLoader2 size={22} className="animate-spin" />,
  done: <IconCheck size={22} />,
  error: <IconAlertTriangle size={22} />,
} as const;

export default function PhotoThumb({ photo, canRemove, onRemove }: PhotoThumbProps) {
  const overlay = photo.status === 'ready' ? null : STATUS_ICON[photo.status];

  return (
    <div className="relative aspect-square overflow-hidden rounded-tile bg-band">
      <img src={photo.previewUrl} alt="" className="size-full object-cover" />

      {overlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-scrim text-on-photo">{overlay}</div>
      )}

      {canRemove && photo.status !== 'done' && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remover foto"
          className="absolute right-1 top-1 flex size-7 items-center justify-center rounded-full bg-scrim text-on-photo"
        >
          <IconX size={14} />
        </button>
      )}
    </div>
  );
}