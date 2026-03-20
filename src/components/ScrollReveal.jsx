import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

export function ScrollReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
