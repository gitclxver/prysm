'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireCompleteProfile?: boolean;
}

export function ProtectedRoute({ children, requireCompleteProfile = false }: ProtectedRouteProps) {
  const { user, userProfile, loading, isProfileComplete } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    // Check profile completion if required (for dashboard and other main pages, but not complete-profile page itself)
    if (!loading && user && requireCompleteProfile && pathname !== '/complete-profile') {
      if (!isProfileComplete(userProfile)) {
        router.push('/complete-profile');
        return;
      }
    }

    // If on complete-profile page but profile is already complete, redirect to dashboard
    if (!loading && user && pathname === '/complete-profile' && isProfileComplete(userProfile)) {
      router.push('/dashboard');
      return;
    }
  }, [user, userProfile, loading, router, pathname, requireCompleteProfile, isProfileComplete]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--prysm-bg)]">
        <motion.img
          src="/logo.png"
          alt="Prysm Logo"
          className="h-16 w-16 rounded-lg"
          width="64"
          height="64"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform" }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const fallback = e.currentTarget
              .nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = "flex";
          }}
        />
        <div
          className="w-16 h-16 bg-gradient-to-br from-[var(--lime)] to-[var(--lime)]/80 rounded-lg flex items-center justify-center shadow-lg shadow-[var(--shadow-lime)]"
          style={{ display: "none" }}
        >
          <span className="text-[var(--prysm-bg)] text-2xl font-black">
            P
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

