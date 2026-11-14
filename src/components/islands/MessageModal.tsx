import { useRef } from 'react';
import { motion } from 'motion/react';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { backdropFade } from '@/lib/motion';
import type { SeedMessage } from '@/data/event';

interface MessageModalProps {
  message: SeedMessage;
  onClose: () => void;
}

export default function MessageModal({ message, onClose }: MessageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, onClose);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink/50 px-6"
      variants={backdropFade}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Recado ${message.sender}`}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md"
        style={{ perspective: 1000 }}
        onClick={(event) => event.stopPropagation()}
      >
        <motion.div
          className="rounded-card bg-surface p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <p className="mb-5 font-display text-xl italic leading-relaxed text-ink">{message.message}</p>
          <p className="mb-5 text-sm text-accent">— {message.sender}</p>
          <button type="button" onClick={onClose} className="text-xs uppercase tracking-wide text-muted">
            Fechar
          </button>
        </motion.div>

        {/* The flap covers the letter and flips open. backfaceVisibility makes it
            disappear past 90deg instead of showing a mirrored rectangle. */}
        <motion.div
          className="absolute inset-0 rounded-card bg-soft"
          style={{ transformOrigin: 'top center', backfaceVisibility: 'hidden' }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: 180 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}