'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

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
      <div className="min-h-screen flex items-center justify-center bg-[#120d2b]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

