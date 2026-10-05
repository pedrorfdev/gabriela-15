// src/components/islands/PasswordGate.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { verifyPassword } from '@/lib/hash';
import { useGateUnlock } from '@/hooks/useGateUnlock';
import { backdropFade } from '@/lib/motion';
import SwipeToConfirm from './gate/SwipeToConfirm';

const GATE_HASH = import.meta.env.GATE_HASH as string;

export default function PasswordGate() {
  const { isUnlocked, isChecked, unlock } = useGateUnlock();
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  async function handleConfirm() {
    if (!password || isVerifying) return;
    setIsVerifying(true);

    const isValid = await verifyPassword(password, GATE_HASH);

    if (isValid) {
      unlock();
    } else {
      setHasError(true);
      setPassword('');
      setTimeout(() => setHasError(false), 600);
    }
    setIsVerifying(false);
  }

  if (!isChecked || isUnlocked) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg px-6 text-center"
        variants={backdropFade}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <p className="mb-7 font-display text-lg italic text-accent">G.</p>

        <span className="mb-4 text-xl text-gold">🔒</span>

        <p className="mb-1 text-sm text-ink">Esse convite é especial</p>
        <p className="mb-6 text-xs text-muted">Digite a senha do seu convite</p>

        <motion.input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Senha"
          animate={hasError ? { x: [-8, 8, -6, 6, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 w-52 border-b border-border-strong bg-transparent pb-2 text-center text-sm text-ink outline-none focus:border-accent"
        />

        <SwipeToConfirm onConfirm={handleConfirm} disabled={!password || isVerifying} />
      </motion.div>
    </AnimatePresence>
  );
}