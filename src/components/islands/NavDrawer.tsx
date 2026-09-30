import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconMenu2, IconX, IconSun, IconMoon } from '@tabler/icons-react';
import { navLinks, eventConfig } from '@/data/event';
import { useCountdown } from '@/hooks/useCountdown';
import { useTheme } from '@/hooks/useTheme';
import { backdropFade, slideFromRight } from '@/lib/motion';

export default function NavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { days, hours } = useCountdown(eventConfig.date.iso);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menu"
        whileHover={{ scale: 1.08 }}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white"
      >
        <IconMenu2 size={22} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/40"
              variants={backdropFade}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              className="fixed right-0 top-0 z-50 h-full w-72 bg-bg px-8 py-10"
              variants={slideFromRight}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <div className="absolute right-6 top-6 flex items-center gap-3">
                <button
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted"
                >
                  {theme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
                </button>
                <button onClick={() => setIsOpen(false)} aria-label="Fechar menu" className="text-muted">
                  <IconX size={18} />
                </button>
              </div>

              <p className="mb-1 font-display text-2xl italic text-accent">
                {eventConfig.person.name}
              </p>
              <p className="mb-9 text-xs text-muted">
                {days} dias · {hours} horas restantes
              </p>

              <nav className="mb-9 flex flex-col gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm uppercase tracking-wide text-ink hover:text-accent"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <a
                href="#rsvp"
                onClick={() => setIsOpen(false)}
                className="block rounded-full bg-accent py-3 text-center text-xs uppercase tracking-wide text-white"
              >
                Confirmar presença
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}