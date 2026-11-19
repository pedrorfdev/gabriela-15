import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

interface PixCopyCardProps {
  title: string;
  description: string;
  pixKey: string;
}

export default function PixCopyCard({ title, description, pixKey }: PixCopyCardProps) {
  const { status, copy } = useCopyToClipboard();

  return (
    <div className="rounded-card bg-band p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-medium text-ink">{title}</p>
          <p className="text-sm text-muted">{description}</p>
        </div>

        <button
          type="button"
          onClick={() => copy(pixKey)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-action px-5 py-3 text-xs uppercase tracking-wide text-on-action transition-colors hover:bg-action/90"
        >
          {status === 'copied' ? <IconCheck size={16} /> : <IconCopy size={16} />}
          {status === 'copied' ? 'Chave copiada' : 'Copiar chave'}
        </button>
      </div>

      {status === 'failed' && (
        <p className="mt-4 break-all text-sm text-ink" role="status">
          Não deu pra copiar. A chave é: <span className="font-medium">{pixKey}</span>
        </p>
      )}
    </div>
  );
}