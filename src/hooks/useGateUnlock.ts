import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '@/lib/constants';

/**
 * Tracks whether the visitor already unlocked the gate before,
 * persisting the flag in localStorage across visits.
 */
export function useGateUnlock() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.gateUnlocked);
    setIsUnlocked(stored === 'true');
    setIsChecked(true);
  }, []);

  function unlock() {
    localStorage.setItem(STORAGE_KEYS.gateUnlocked, 'true');
    setIsUnlocked(true);
  }

  return { isUnlocked, isChecked, unlock };
}
