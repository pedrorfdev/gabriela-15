import { useEffect, useRef, useState } from 'react';

export type CopyStatus = 'idle' | 'copied' | 'failed';

const RESET_DELAY_MS = 2500;
export function useCopyToClipboard() {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
    } catch {
      // The Clipboard API needs HTTPS or localhost; callers can show the text to copy by hand.
      setStatus('failed');
    }

    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setStatus('idle'), RESET_DELAY_MS);
  }

  return { status, copy };
}