import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { verifyPassword } from '@/lib/hash';
import { useGateUnlock } from '@/hooks/useGateUnlock';
import { backdropFade } from '@/lib/motion';
import SwipeToConfirm from './gate/SwipeToConfirm';

const GATE_HASH = import.meta.env.GATE_HASH as string | undefined;

if (import.meta.env.DEV && !GATE_HASH) {
  console.warn('[gate] GATE_HASH is empty. Check .env and restart the dev server.');
}

type GateError = 'wrong-password' | 'verification-failed';

const ERROR_MESSAGES: Record<GateError, string> = {
  'wrong-password': 'Senha incorreta, tente de novo.',
  'verification-failed': 'Não foi possível verificar a senha. Tente de novo.',
};

export default function PasswordGate() {
  const { isUnlocked, isChecked, unlock } = useGateUnlock();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<GateError | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  async function handleConfirm(): Promise<boolean> {
    if (!password || isVerifying) return false;
    setIsVerifying(true);

    try {
      const isValid = await verifyPassword(password, GATE_HASH ?? '');
      if (isValid) {
        unlock();
        return true;
      }
      setError('wrong-password');
      setPassword('');
      return false;
    } catch (cause) {
      console.error('[gate] verification failed:', cause);
      setError('verification-failed');
      return false;
    } finally {
      setIsVerifying(false);
    }
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
          aria-label="Senha"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError(null);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') void handleConfirm();
          }}
          placeholder="Senha"
          animate={error === 'wrong-password' ? { x: [-8, 8, -6, 6, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-3 w-52 border-b border-border-strong bg-transparent pb-2 text-center text-sm text-ink outline-none focus:border-accent"
        />

        <p className="mb-4 h-4 text-xs text-accent" role="alert">
          {error ? ERROR_MESSAGES[error] : ''}
        </p>

        <SwipeToConfirm onConfirm={handleConfirm} disabled={!password || isVerifying} />
      </motion.div>
    </AnimatePresence>
  );
}