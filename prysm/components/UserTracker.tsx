'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from './Badge';

export function UserTracker() {
  const { userProfile } = useAuth();
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    if (userProfile?.isEarlyUser && userProfile?.signupNumber) {
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
  }, [userProfile?.signupNumber, userProfile?.isEarlyUser]);

  if (!userProfile?.isEarlyUser || !userProfile?.signupNumber) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="inline-block"
    >
      <Badge variant="founders" className="text-sm sm:text-base px-4 py-2.5">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-crown"></i>
          <span className="font-mono font-bold">
            {displayNumber}/200
          </span>
          <span>Founders Badge</span>
        </div>
      </Badge>
    </motion.div>
  );
}

