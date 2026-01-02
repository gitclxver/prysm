'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure we only render theme-dependent content after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark mode for SSR to match initial state
  const displayTheme = mounted ? theme : 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[var(--bg-overlay-hover)] border border-[var(--border-color)] hover:border-[var(--border-hover)]"
      aria-label={`Switch to ${displayTheme === 'light' ? 'dark' : 'light'} mode`}
      suppressHydrationWarning
    >
      <motion.div
        initial={false}
        animate={{ rotate: displayTheme === 'light' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
        className="text-[var(--text-primary)]"
        suppressHydrationWarning
      >
        {displayTheme === 'light' ? (
          <i className="fa-solid fa-moon text-lg" suppressHydrationWarning></i>
        ) : (
          <i className="fa-solid fa-sun text-lg" suppressHydrationWarning></i>
        )}
      </motion.div>
    </button>
  );
}


