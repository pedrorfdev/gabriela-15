import { useRef } from 'react';
import { IconCamera } from '@tabler/icons-react';
import { partyPage } from '@/data/party';
import { usePhotoQueue } from '@/hooks/usePhotoQueue';
import PhotoThumb from './PhotoThumb';

const { uploadsOpen, closedNotice, maxFilesPerBatch } = partyPage.photos;

const BUTTON =
  'flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs uppercase tracking-wide transition-colors disabled:opacity-60';
const PRIMARY = `${BUTTON} bg-action text-on-action hover:bg-action/90`;
const SECONDARY = `${BUTTON} border border-border-strong text-ink hover:border-accent hover:text-accent`;

function plural(count: number, one: string, many: string) {
  return count === 1 ? one : many;
}

export default function PhotoUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { photos, isSending, remaining, addFiles, remove, sendAll } = usePhotoQueue();

  if (!uploadsOpen) return <p className="text-center text-sm text-muted">{closedNotice}</p>;

  const pending = photos.filter((photo) => photo.status === 'ready' || photo.status === 'error');
  const doneCount = photos.filter((photo) => photo.status === 'done').length;
  const hasError = photos.some((photo) => photo.status === 'error');

  let message = `Até ${maxFilesPerBatch} fotos por vez.`;
  if (hasError) {
    message = 'Algumas fotos não foram enviadas. Confira a conexão e toque em enviar de novo.';
  } else if (doneCount > 0 && pending.length === 0) {
    message = `Pronto! ${doneCount} ${plural(doneCount, 'foto enviada', 'fotos enviadas')}. Obrigada!`;
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        tabIndex={-1}
        className="sr-only"
        onChange={(event) => {
          if (event.target.files) addFiles(event.target.files);
          event.target.value = '';
        }}
      />

      {photos.length > 0 && (
        <ul className="mb-4 grid grid-cols-3 gap-2">
          {photos.map((photo) => (
            <li key={photo.id}>
              <PhotoThumb photo={photo} canRemove={!isSending} onRemove={() => remove(photo.id)} />
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isSending || remaining <= 0}
          className={SECONDARY}
        >
          <IconCamera size={16} />
          {photos.length === 0 ? 'Escolher fotos' : 'Adicionar mais fotos'}
        </button>

        {pending.length > 0 && (
          <button type="button" onClick={sendAll} disabled={isSending} className={PRIMARY}>
            {isSending ? 'Enviando…' : `Enviar ${pending.length} ${plural(pending.length, 'foto', 'fotos')}`}
          </button>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-muted" role="status">
        {message}
      </p>
    </div>
  );
}