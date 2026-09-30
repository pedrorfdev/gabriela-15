import type { Transition, Variants } from 'motion/react';

/**
 * Shared Motion primitives. Only animations reused across more
 * than one island live here. A one-off animation stays local to
 * the component that uses it.
 */

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

export const slideFromRight: Variants = {
  hidden: { x: '100%' },
  visible: { x: 0 },
};

export const backdropFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
