import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { IconCamera, IconX } from '@tabler/icons-react';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { backdropFade, scaleIn } from '@/lib/motion';

interface Tile {
  gradient: string;
  span: string;
}

// Mosaic: one big tile, one wide, the rest small. Fills a 3-column grid with no holes.
const TILES: Tile[] = [
  { gradient: 'from-band to-soft', span: 'col-span-2 row-span-2' },
  { gradient: 'from-line/30 to-band', span: '' },
  { gradient: 'from-soft to-band', span: '' },
  { gradient: 'from-band to-line', span: 'col-span-2' },
  { gradient: 'from-soft/70 to-line/30', span: '' },
];

function TilePreview({ tile, onClose }: { tile: Tile; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, onClose);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink/60 px-6"
      variants={backdropFade}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Pré-visualização da foto"
    >
      <motion.div
        ref={dialogRef}
        className={`relative flex h-[70svh] w-full max-w-lg items-center justify-center rounded-card bg-linear-to-br ${tile.gradient}`}
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-surface/70 text-ink"
        >
          <IconX size={18} />
        </button>
        <p className="px-6 text-center text-sm text-ink">foto real entra aqui, isto é só para testar o clique</p>
      </motion.div>
    </motion.div>
  );
}

export default function GalleryPlaceholder() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const preview = (
    <AnimatePresence>
      {openIndex !== null && <TilePreview tile={TILES[openIndex]} onClose={() => setOpenIndex(null)} />}
    </AnimatePresence>
  );

  return (
    <>
      <div className="grid auto-rows-[84px] grid-flow-dense grid-cols-3 gap-2 sm:auto-rows-[120px]">
        {TILES.map((tile, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Abrir foto ${index + 1}`}
            onClick={() => setOpenIndex(index)}
            className={`flex items-center justify-center rounded-tile bg-linear-to-br text-ink/50 transition-transform hover:scale-[1.02] ${tile.gradient} ${tile.span}`}
          >
            <IconCamera size={22} />
          </button>
        ))}
      </div>

      {isMounted ? createPortal(preview, document.body) : null}
    </>
  );
}