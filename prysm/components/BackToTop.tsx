'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    // Use document.documentElement.scrollTop for better cross-browser support
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Only show if scrolled past 300px AND not at the very bottom (prevent overscroll issues)
    const isAtBottom = scrollTop + windowHeight >= documentHeight - 10;
    
    if (scrollTop > 300 && !isAtBottom) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    // Throttle scroll events for better performance
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    toggleVisibility();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toggleVisibility]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[100] w-12 h-12 sm:w-14 sm:h-14 bg-[var(--prysm-card)] border-2 border-[var(--lime)]/30 rounded-full flex items-center justify-center text-[var(--lime)] hover:bg-[var(--lime)]/10 hover:border-[var(--lime)]/50 hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg shadow-[var(--shadow-lime)] backdrop-blur-sm touch-none"
          aria-label="Back to top"
          style={{ 
            position: 'fixed',
            willChange: 'transform, opacity',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <i className="fa-solid fa-arrow-up text-lg sm:text-xl"></i>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

