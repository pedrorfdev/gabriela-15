import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { IconMenu2 } from '@tabler/icons-react';
import { backdropFade } from '@/lib/motion';
import DrawerPanel from './nav/DrawerPanel';

export default function NavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.08 }}
        className="fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-action text-on-action"
      >
        <IconMenu2 size={22} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-ink/40"
            variants={backdropFade}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={close}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>{isOpen && <DrawerPanel key="panel" onClose={close} />}</AnimatePresence>
    </>
  );
}