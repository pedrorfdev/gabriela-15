import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { IconCamera, IconX } from '@tabler/icons-react';
import { backdropFade, scaleIn } from '@/lib/motion';

const GRADIENTS = [
  'from-[#E3B9C8] to-[#D8C08A]',
  'from-[#D8C08A] to-[#A3AE8C]',
  'from-[#D9A3B8] to-[#E3B9C8]',
  'from-[#A3AE8C] to-[#D9A3B8]',
  'from-[#E3B9C8] to-[#A3AE8C]',
  'from-[#D8C08A] to-[#D9A3B8]',
];

export default function GalleryPlaceholder() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const preview = (
    <AnimatePresence>
      {openIndex !== null && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink/60 px-6"
          variants={backdropFade}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setOpenIndex(null)}
        >
          <motion.div
            className={`relative flex h-[70vh] w-full max-w-lg items-center justify-center rounded-2xl bg-gradient-to-br ${GRADIENTS[openIndex]}`}
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setOpenIndex(null)}
              aria-label="Fechar"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white"
            >
              <IconX size={18} />
            </button>
            <p className="text-sm text-white/85">foto real entra aqui — isso é só pra testar o clique</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {GRADIENTS.map((gradient, index) => (
          <button
            key={index}
            onClick={() => setOpenIndex(index)}
            className={`flex aspect-square items-center justify-center bg-gradient-to-br ${gradient} transition-transform hover:scale-[1.02]`}
          >
            <IconCamera size={28} className="text-white/85" />
          </button>
        ))}
      </div>

      {isMounted ? createPortal(preview, document.body) : null}
    </>
  );
}