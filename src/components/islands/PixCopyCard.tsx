import { useState } from 'react';
import { IconCheck, IconCopy } from '@tabler/icons-react';

interface PixCopyCardProps {
  title: string;
  description: string;
  pixKey: string;
}

type CopyStatus = 'idle' | 'copied' | 'failed';

const RESET_DELAY_MS = 2500;

export default function PixCopyCard({ title, description, pixKey }: PixCopyCardProps) {
  const [status, setStatus] = useState<CopyStatus>('idle');

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(pixKey);
      setStatus('copied');
    } catch {
      // Clipboard API needs HTTPS or localhost; show the key so it can be copied by hand.
      setStatus('failed');
    }
    window.setTimeout(() => setStatus('idle'), RESET_DELAY_MS);
  }

  return (
    <div className="rounded-2xl bg-blush-band p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-medium text-ink">{title}</p>
          <p className="text-sm text-muted">{description}</p>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-xs uppercase tracking-wide text-white transition-colors hover:bg-accent-deep"
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