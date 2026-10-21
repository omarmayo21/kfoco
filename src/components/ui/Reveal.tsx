'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, fadeIn, scaleIn } from '@/lib/motion';

type VariantName = 'up' | 'fade' | 'scale';

/**
 * Scroll-reveal wrapper — fade + 20px translate, staggered, once only.
 * Respects prefers-reduced-motion (reveals instantly).
 */
export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  className,
  as = 'div'
}: {
  children: React.ReactNode;
  variant?: VariantName;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
}) {
  const reduce = useReducedMotion();
  const variants = variant === 'fade' ? fadeIn : variant === 'scale' ? scaleIn : fadeUp;
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={reduce ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      custom={delay / 0.08}
    >
      {children}
    </MotionTag>
  );
}
