'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Badge } from './Badge';

export function WaitlistPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Don't show if user is logged in
    if (user) {
      setIsVisible(false);
      return;
    }
    
    const dismissed = localStorage.getItem('waitlist-popup-dismissed');
    // If manually dismissed, don't auto-show
    if (dismissed === 'true') {
      setIsVisible(false);
      return;
    }

    // Show initially after 3 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Set up auto-show/hide cycle every 10 seconds
    const cycleInterval = setInterval(() => {
      setIsVisible((prev) => {
        // Toggle visibility every 10 seconds
        return !prev;
      });
    }, 10000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(cycleInterval);
    };
  }, [user]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('waitlist-popup-dismissed', 'true');
  };

  if (user) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="waitlist-popup"
          initial={{ opacity: 0, x: 100, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, x: 0, scale: 1, y: 0 }}
          exit={{ opacity: 0, x: 100, scale: 0.9, y: -20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed top-6 right-6 z-50 max-w-sm"
        >
        <div className="bg-[#1d163d] border border-lime-400/30 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-lime-400/20 to-purple-400/20 blur-xl opacity-50"></div>
          
          <div className="relative">
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white/10 hover:bg-red-500/20 flex items-center justify-center text-gray-400 hover:text-red-400 transition-all z-10"
              aria-label="Close"
              type="button"
            >
              <i className="fa-solid fa-times text-sm"></i>
            </button>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-400 to-lime-300 flex items-center justify-center flex-shrink-0 shadow-lg shadow-lime-400/30">
                <i className="fa-solid fa-star text-[#120d2b] text-xl"></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="founders" className="text-xs">
                    Founders Badge
                  </Badge>
                </div>
                <h3 className="text-lg font-extrabold mb-1">Join the Waitlist</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Be among the first 200 users and earn your honorary student badge! Get early access to Prysm.
                </p>
              </div>
            </div>

            <Link
              href="/login"
              className="block w-full bg-[#d4ff80] text-[#120d2b] px-4 py-2.5 rounded-lg font-bold text-sm text-center hover:bg-[#b8eb4d] transition-all duration-300 shadow-lg shadow-lime-400/20 hover:shadow-xl hover:shadow-lime-400/30 hover:scale-105"
            >
              Join Now
            </Link>
          </div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}

