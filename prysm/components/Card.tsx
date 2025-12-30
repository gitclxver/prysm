import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = true, onClick }: CardProps) {
  const hasAcademyCard = className.includes('academy-card');
  const baseStyles = hasAcademyCard 
    ? 'bg-[#1d163d] border border-white/5 rounded-2xl transition-all duration-400 relative overflow-hidden'
    : 'bg-[#1d163d] border border-white/5 rounded-2xl p-8 transition-all duration-400 relative overflow-hidden';
  const hoverStyles = hover && !hasAcademyCard
    ? 'hover:border-[#d4ff80] hover:-translate-y-1.5 hover:bg-gradient-to-br hover:from-[#251c4a] hover:to-[#1d163d] hover:shadow-[0_20px_40px_rgba(212,255,128,0.1)]' 
    : '';
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} onClick={onClick}>
      {hover && !hasAcademyCard && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4ff80] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-400" />
      )}
      {children}
    </div>
  );
}

