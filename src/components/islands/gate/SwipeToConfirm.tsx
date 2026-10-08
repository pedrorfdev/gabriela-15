import { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';

interface SwipeToConfirmProps {
  /** Resolves true when the password was accepted, false to reset the slider. */
  onConfirm: () => Promise<boolean>;
  disabled?: boolean;
}

const TRACK_WIDTH = 220;
const HANDLE_SIZE = 38;
const MAX_TRAVEL = TRACK_WIDTH - HANDLE_SIZE - 8;
const CONFIRM_RATIO = 0.9;
const SPRING = { type: 'spring', stiffness: 400, damping: 30 } as const;

export default function SwipeToConfirm({ onConfirm, disabled }: SwipeToConfirmProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const x = useMotionValue(0);
  const labelOpacity = useTransform(x, [0, MAX_TRAVEL * 0.6], [1, 0]);

  async function handleDragEnd() {
    if (disabled || isConfirming) return;

    // 90% of the travel counts — exact-end comparisons are fragile with
    // floating point and the drag elasticity.
    if (x.get() < MAX_TRAVEL * CONFIRM_RATIO) {
      animate(x, 0, SPRING);
      return;
    }

    setIsConfirming(true);
    animate(x, MAX_TRAVEL, SPRING);

    const succeeded = await onConfirm();
    if (!succeeded) {
      animate(x, 0, SPRING);
      setIsConfirming(false);
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
        dragConstraints={{ left: 0, right: MAX_TRAVEL }}
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