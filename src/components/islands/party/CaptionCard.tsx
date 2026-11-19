import { IconBrandInstagram, IconCheck, IconCopy, IconPhoto } from '@tabler/icons-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { instagramLinks } from '@/lib/instagram';

const LINK =
  'inline-flex items-center justify-center gap-2 rounded-full border border-border-strong px-5 py-3 text-xs uppercase tracking-wide text-ink transition-colors hover:border-accent hover:text-accent';

export default function CaptionCard() {
  const { status, copy } = useCopyToClipboard();
  const { caption, profileUrl, hashtagUrl } = instagramLinks;
  const isCopied = status === 'copied';

  return (
    <div>
      <p className="mb-5 select-all rounded-tile bg-band px-4 py-4 text-center font-display text-xl italic text-ink">
        {caption}
      </p>

      <button
        type="button"
        onClick={() => copy(caption)}
        className="mb-3 flex w-full items-center justify-center gap-2 rounded-full bg-action px-6 py-3.5 text-xs uppercase tracking-wide text-on-action transition-colors hover:bg-action/90"
      >
        {isCopied ? <IconCheck size={16} /> : <IconCopy size={16} />}
        {isCopied ? 'Legenda copiada' : 'Copiar legenda'}
      </button>

      {status === 'failed' && (
        <p role="status" className="mb-3 text-center text-sm text-muted">
          Não deu para copiar. Toque no texto acima para selecioná-lo e copie manualmente.
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
          <IconBrandInstagram size={16} />
          Abrir o perfil
        </a>
        <a href={hashtagUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
          <IconPhoto size={16} />
          Ver no Instagram
        </a>
      </div>
    </div>
  );
}