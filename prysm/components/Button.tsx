'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 relative overflow-hidden';
  
  const variants = {
    primary: 'bg-[var(--lime)] text-[var(--prysm-bg)] shadow-[0_0_20px_var(--shadow-lime)]',
    secondary: 'bg-[var(--prysm-card)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--lime)] hover:bg-[var(--prysm-card-hover)]',
    outline: 'bg-transparent text-[var(--text-primary)] border-2 border-[var(--border-color)] hover:border-[var(--lime)] hover:text-[var(--lime)]',
  };
  
  return (
    <motion.button
      whileHover={{ scale: variant === 'primary' ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{ willChange: 'transform' }}
      {...props}
    >
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.5, opacity: 0.3 }}
          transition={{ duration: 0.3 }}
          style={{ willChange: 'transform, opacity' }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

