import { useEffect, useState } from 'react';
import { GATE_UNLOCKED_EVENT, STORAGE_KEYS } from '@/lib/constants';

function readUnlockFlag(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEYS.gateUnlocked) === 'true';
  } catch {
    return false;
  }
}

/**
 * Tracks whether the visitor already passed the gate. On unlock it also marks
 * <html data-unlocked> and fires an event, so non-React code (the entrance
 * animation) can wait for the gate to close.
 */
export function useGateUnlock() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    setIsUnlocked(readUnlockFlag());
  }, []);

  function unlock() {
    try {
      localStorage.setItem(STORAGE_KEYS.gateUnlocked, 'true');
    } catch {
      // Private mode: the visitor simply sees the gate again next time.
    }
    document.documentElement.dataset.unlocked = 'true';
    window.dispatchEvent(new Event(GATE_UNLOCKED_EVENT));
    setIsUnlocked(true);
  }

  return { isUnlocked, unlock };
}