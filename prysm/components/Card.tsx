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
    ? 'bg-[var(--prysm-card)] border border-[var(--border-color)] rounded-2xl transition-all duration-400 relative overflow-hidden'
    : 'bg-[var(--prysm-card)] border border-[var(--border-color)] rounded-2xl p-8 transition-all duration-400 relative overflow-hidden';
  const hoverStyles = hover && !hasAcademyCard
    ? 'hover:border-[var(--lime)] hover:-translate-y-1.5 hover:bg-gradient-to-br hover:from-[var(--prysm-card-hover)] hover:to-[var(--prysm-card)] hover:shadow-[0_20px_40px_var(--shadow-lime)]' 
    : '';
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} onClick={onClick}>
      {hover && !hasAcademyCard && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--lime)] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-400" />
      )}
      {children}
    </div>
  );
}

