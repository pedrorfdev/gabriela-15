import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'motion/react';
import { IconPencil } from '@tabler/icons-react';
import AddMessageModal from '@/components/islands/AddMessageModal';

export default function ComposeMessageButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // document.body only exists in the browser; Astro also renders this on the server.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-action px-6 py-3.5 text-xs uppercase tracking-wide text-on-action transition-colors hover:bg-action/90"
      >
        <IconPencil size={16} />
        Escrever recado
      </button>

      {isMounted &&
        createPortal(
          <AnimatePresence>{isOpen && <AddMessageModal onClose={() => setIsOpen(false)} />}</AnimatePresence>,
          document.body,
        )}
    </>
  );
}