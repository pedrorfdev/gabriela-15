import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { backdropFade, scaleIn } from '@/lib/motion';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface AddMessageModalProps {
  onClose: () => void;
}

const fieldClassName =
  'w-full border-0 border-b border-border-strong bg-transparent px-0.5 py-2 text-sm text-ink outline-none focus:border-accent';

export default function AddMessageModal({ onClose }: AddMessageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, onClose);

  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit() {
    if (!name.trim() || !text.trim()) return;
    // TODO: wire this up to sheetsApi.ts once the Apps Script backend exists.
    console.log('New guest message', { name, text });
    setIsSubmitted(true);
  }

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
      <motion.div
        ref={modalRef}
        className="w-full max-w-md rounded-2xl bg-surface p-8 text-center"
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        onClick={(event) => event.stopPropagation()}
      >
        {isSubmitted ? (
          <>
            <p className="mb-2 font-display text-2xl italic text-ink">Obrigada!</p>
            <p className="mb-6 text-sm text-muted">seu recado chegou até a Gabriela ♥</p>
            <button onClick={onClose} className="text-xs uppercase tracking-wide text-muted">
              Fechar
            </button>
          </>
        ) : (
          <>
            <p className="mb-6 font-display text-2xl italic text-ink">Deixe seu recado</p>

            <div className="mb-5 text-left">
              <label className="mb-2 block text-[10px] uppercase tracking-wide text-muted">
                Seu nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Como quer assinar"
                className={fieldClassName}
              />
            </div>

            <div className="mb-7 text-left">
              <label className="mb-2 block text-[10px] uppercase tracking-wide text-muted">
                Sua mensagem
              </label>
              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Escreva um recado pra Gabriela"
                className={`${fieldClassName} min-h-22.5 resize-none`}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="mb-3 w-full rounded-full bg-accent py-3.5 text-xs uppercase tracking-wide text-white"
            >
              Enviar recado
            </button>
            <button onClick={onClose} className="text-xs uppercase tracking-wide text-muted">
              Cancelar
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}