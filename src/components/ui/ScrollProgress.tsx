'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin scroll-progress bar pinned to the top edge (accent steel blue). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-steel rtl:origin-right"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
