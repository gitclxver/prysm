'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export function AnimatedCard({ children, className = '', hover = true, delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -6, transition: { duration: 0.2 } } : {}}
      className={`bg-[var(--prysm-card)] border border-[var(--border-color)] rounded-2xl p-8 transition-all duration-400 relative overflow-hidden ${hover ? 'hover:border-[var(--lime)] hover:bg-gradient-to-br hover:from-[var(--prysm-card-hover)] hover:to-[var(--prysm-card)] hover:shadow-[0_20px_40px_var(--shadow-lime)]' : ''} ${className}`}
    >
      {hover && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--lime)] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-400" />
      )}
      {children}
    </motion.div>
  );
}

