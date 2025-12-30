'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

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
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-[#1d163d] border-2 border-lime-400/30 rounded-full flex items-center justify-center text-lime-400 hover:bg-lime-400/10 hover:border-lime-400/50 hover:scale-110 transition-all duration-300 shadow-lg shadow-lime-400/20 backdrop-blur-sm"
          aria-label="Back to top"
        >
          <i className="fa-solid fa-arrow-up text-lg sm:text-xl"></i>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

