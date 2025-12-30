'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
    primary: 'bg-[#d4ff80] text-[#120d2b] shadow-[0_0_20px_rgba(212,255,128,0.2)]',
    secondary: 'bg-[#1d163d] text-white border border-white/10 hover:border-[#d4ff80] hover:bg-[#251c4a]',
    outline: 'bg-transparent text-white border-2 border-white/20 hover:border-[#d4ff80] hover:text-[#d4ff80]',
  };
  
  return (
    <motion.button
      whileHover={{ scale: variant === 'primary' ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.5, opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

