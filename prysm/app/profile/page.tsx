'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navigation } from '@/components/Navigation';
import { ProfileForm } from '@/components/ProfileForm';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { UserTracker } from '@/components/UserTracker';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function ProfilePage() {
  const { userProfile } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Navigation />
        <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-extrabold mb-2">Profile Settings</h1>
              <p className="text-[var(--text-secondary)]">Customize your profile to your liking</p>
            </div>
            <Link href="/dashboard">
              <button className="text-[var(--lime)] hover:underline">Back to Dashboard</button>
            </Link>
          </div>

          {userProfile?.isEarlyUser && userProfile.signupNumber && (
            <div className="mb-6">
              <Card hover={false} className="bg-gradient-to-r from-[var(--lime)]/10 to-[var(--lime)]/5 border-[var(--lime)]/20">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <UserTracker />
                  <p className="text-sm text-[var(--text-secondary)]">
                    You're {userProfile.signupNumber} of the first 200 founders! Thank you for being part of Prysm's foundation.
                  </p>
                </div>
              </Card>
            </div>
          )}

          <ProfileForm />
        </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

