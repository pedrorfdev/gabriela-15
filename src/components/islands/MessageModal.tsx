import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { backdropFade } from '@/lib/motion';
import type { SeedMessage } from '@/data/event';

interface MessageModalProps {
  message: SeedMessage;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function MessageModal({ message, onClose }: MessageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl) return;

    const focusables = modalEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || focusables.length === 0) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-ink/50 px-6"
      variants={backdropFade}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-sm"
        style={{ perspective: 900 }}
        onClick={(event) => event.stopPropagation()}
      >
        <motion.div
          className="relative z-1 rounded-xl bg-surface p-7 text-center"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: -36, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-4 font-serif italic leading-relaxed text-ink">{message.message}</p>
          <p className="mb-4 text-xs text-accent">— {message.sender}</p>
          <button onClick={onClose} className="text-xs uppercase tracking-wide text-muted">
            Fechar
          </button>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 z-2 h-24 rounded-b-xl bg-accent-soft" />

        <motion.div
          className="absolute inset-x-0 top-0 z-3 h-24 rounded-t-xl bg-accent-soft"
          style={{ transformOrigin: 'top center', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: 160 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}