// src/components/islands/gate/SwipeToConfirm.tsx
import { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';

interface SwipeToConfirmProps {
  onConfirm: () => void;
  disabled?: boolean;
}

const TRACK_WIDTH = 220;
const HANDLE_SIZE = 38;
const CONFIRM_THRESHOLD = TRACK_WIDTH - HANDLE_SIZE - 8;

export default function SwipeToConfirm({ onConfirm, disabled }: SwipeToConfirmProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const x = useMotionValue(0);
  const labelOpacity = useTransform(x, [0, CONFIRM_THRESHOLD * 0.6], [1, 0]);

  function handleDragEnd() {
    if (disabled || isConfirming) return;

    if (x.get() >= CONFIRM_THRESHOLD) {
      setIsConfirming(true);
      animate(x, CONFIRM_THRESHOLD, { type: 'spring', stiffness: 400, damping: 30 });
      onConfirm();
    } else {
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 });
    }
  }

  return (
    <div
      className="relative mx-auto flex items-center rounded-full border border-border bg-surface"
      style={{ width: TRACK_WIDTH, height: 46 }}
    >
      <motion.span
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11px] uppercase tracking-wide text-muted"
        style={{ opacity: labelOpacity }}
      >
        arraste para confirmar
      </motion.span>

      <motion.div
        drag={disabled || isConfirming ? false : 'x'}
        dragConstraints={{ left: 0, right: CONFIRM_THRESHOLD }}
        dragElastic={0.05}
        onDragEnd={handleDragEnd}
        style={{ x, width: HANDLE_SIZE, height: HANDLE_SIZE }}
        className="ml-1 flex cursor-grab items-center justify-center rounded-full bg-accent active:cursor-grabbing"
      >
        <span className="text-white">›</span>
      </motion.div>
    </div>
  );
}