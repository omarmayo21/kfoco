import type { Variants, Transition } from 'framer-motion';

/**
 * Shared motion vocabulary — quiet, editorial, transform/opacity only.
 * Every variant is overridden to "visible" instantly when the user prefers
 * reduced motion (see components/ui/Reveal.tsx).
 */
export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo, delay: i * 0.08 }
  })
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: easeOutExpo }
  }
};

/** Line-draw reveal used for thin decorative rules */
export const lineDraw: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: easeOutExpo }
  }
};
