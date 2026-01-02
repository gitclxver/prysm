'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

export function UserTracker() {
  const { userProfile } = useAuth();
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    if (userProfile?.signupNumber) {
      // Animate number counting up
      const targetNumber = userProfile.signupNumber;
      const duration = 1500; // 1.5 seconds
      const steps = 60;
      const increment = targetNumber / steps;
      const stepDuration = duration / steps;

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
          setDisplayNumber(targetNumber);
          clearInterval(timer);
        } else {
          setDisplayNumber(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [userProfile?.signupNumber]);

  // Format number with leading zeros (001, 002, etc.)
  const formattedNumber = userProfile?.signupNumber 
    ? String(displayNumber || userProfile.signupNumber).padStart(3, '0')
    : '000';

  // Always render, even if signupNumber is missing (show default)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="inline-flex items-center gap-2.5 mt-2"
    >
      {/* Badge SVG Icon with PNG fallback */}
      <img
        src="/badge.svg"
        alt="Founder Badge"
        className="w-7 h-7 flex-shrink-0"
        style={{ filter: 'drop-shadow(0 0 4px rgba(212, 255, 128, 0.3))' }}
        onError={(e) => {
          e.currentTarget.src = '/badge.png';
        }}
      />
      <span className="text-[var(--text-primary)] text-base sm:text-lg font-bold">
        Founder #{formattedNumber}/200
      </span>
    </motion.div>
  );
}

