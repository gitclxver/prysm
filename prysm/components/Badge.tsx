import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'founders' | 'early-user' | 'purple' | 'lime';
  className?: string;
}

export function Badge({ children, variant = 'purple', className = '' }: BadgeProps) {
  const variants = {
    'founders': 'bg-gradient-to-r from-[#d4ff80] to-[#b8eb4d] text-[#120d2b] shadow-[0_4px_15px_rgba(212,255,128,0.4)] hover:shadow-[0_6px_20px_rgba(212,255,128,0.5)]',
    'early-user': 'bg-gradient-to-r from-[#d4ff80] to-[#b8eb4d] text-[#120d2b] shadow-[0_4px_15px_rgba(212,255,128,0.4)] hover:shadow-[0_6px_20px_rgba(212,255,128,0.5)]', // Legacy support
    purple: 'bg-[rgba(224,215,255,0.15)] text-[#e0d7ff] border-2 border-[rgba(224,215,255,0.3)] backdrop-blur-sm hover:bg-[rgba(224,215,255,0.2)] hover:border-[rgba(224,215,255,0.4)] hover:scale-105',
    lime: 'bg-[rgba(212,255,128,0.15)] text-[#d4ff80] border-2 border-[rgba(212,255,128,0.3)] hover:bg-[rgba(212,255,128,0.2)] hover:border-[rgba(212,255,128,0.4)] hover:scale-105',
  };
  
  return (
    <span className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

