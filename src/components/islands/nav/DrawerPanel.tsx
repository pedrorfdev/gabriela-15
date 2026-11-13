import { useRef } from 'react';
import { motion } from 'motion/react';
import { IconMoon, IconSun, IconX } from '@tabler/icons-react';
import Seal from '@/components/ui/Seal';
import { eventConfig, navLinks } from '@/data/event';
import { useCountdown } from '@/hooks/useCountdown';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useTheme } from '@/hooks/useTheme';
import { slideFromRight } from '@/lib/motion';

interface DrawerPanelProps {
  onClose: () => void;
}

const ICON_BUTTON =
  'flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:text-ink';

export default function DrawerPanel({ onClose }: DrawerPanelProps) {
  const panelRef = useRef<HTMLElement>(null);
  useFocusTrap(panelRef, onClose);

  const { days, hours } = useCountdown(eventConfig.date.iso);
  const { theme, toggleTheme } = useTheme();
  const themeLabel = theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro';

  return (
    <motion.aside
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-bg px-8 py-8"
      variants={slideFromRight}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
    >
      <div className="flex items-start justify-between">
        <Seal className="size-14" />
        <div className="flex items-center gap-1">
          <button type="button" onClick={toggleTheme} aria-label={themeLabel} className={ICON_BUTTON}>
            {theme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
          </button>
          <button type="button" onClick={onClose} aria-label="Fechar menu" className={ICON_BUTTON}>
            <IconX size={18} />
          </button>
        </div>
      </div>

      <p className="mt-5 font-display text-3xl italic text-brand">{eventConfig.person.name}</p>
      <p className="mb-9 mt-1 text-xs text-muted">
        {days} dias · {hours} horas restantes
      </p>

      <nav className="mb-9 flex flex-col gap-5">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-sm uppercase tracking-wide text-ink transition-colors hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="/#rsvp"
        onClick={onClose}
        className="mt-auto block rounded-full bg-action py-3.5 text-center text-xs uppercase tracking-wide text-on-action transition-colors hover:bg-action/90"
      >
        Confirmar presença
      </a>
    </motion.aside>
  );
}