import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function FadeTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'color',
        duration: 1,
      }}
    >
      {children}
    </motion.div>
  );
}

export function AccordianTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div>
      {children}
      <motion.div
        className="slide-left"
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: -1000, opacity: 0 }}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
      ></motion.div>
      <motion.div
        className="slide-right"
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: 1000, opacity: 0 }}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
      ></motion.div>
    </motion.div>
  );
}
