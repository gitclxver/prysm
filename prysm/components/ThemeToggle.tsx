'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[var(--bg-overlay-hover)] border border-[var(--border-color)] hover:border-[var(--border-hover)]"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
        className="text-[var(--text-primary)]"
      >
        {theme === 'light' ? (
          <i className="fa-solid fa-moon text-lg"></i>
        ) : (
          <i className="fa-solid fa-sun text-lg"></i>
        )}
      </motion.div>
    </button>
  );
}


