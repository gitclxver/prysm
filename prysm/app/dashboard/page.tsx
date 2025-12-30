'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/hooks/useAuth';
import { getUserAvatarUrl } from '@/lib/avatar';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { UserTracker } from '@/components/UserTracker';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, userProfile, signOut } = useAuth();
  const avatarUrl = getUserAvatarUrl(
    userProfile?.displayName || user?.displayName || user?.email || 'User',
    32
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Navigation />
        <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-extrabold mb-2">
                Welcome back, {userProfile?.displayName || user?.displayName || 'User'}! 👋
              </h1>
              <p className="text-gray-400">
                {userProfile?.isEarlyUser 
                  ? userProfile.signupNumber
                    ? `You're ${userProfile.signupNumber} of the first 200! 🎉`
                    : 'You are one of the first 200 users! 🎉'
                  : 'Welcome to Prysm'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/profile">
                <Button variant="secondary">Edit Profile</Button>
              </Link>
              <Link href="/profile">
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-lime-400/30 cursor-pointer hover:border-lime-400/60 transition-colors"
                />
              </Link>
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </div>

          {userProfile?.isEarlyUser && userProfile.signupNumber && (
            <div className="mb-6">
              <UserTracker />
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-xl font-extrabold mb-2">Profile Status</h3>
              <p className="text-gray-400 mb-4">
                {userProfile ? 'Profile created' : 'Complete your profile'}
              </p>
              <Link href="/profile">
                <Button variant="secondary" className="w-full">
                  {userProfile ? 'Edit Profile' : 'Create Profile'}
                </Button>
              </Link>
            </Card>

            <Card>
              <h3 className="text-xl font-extrabold mb-2">Email Verification</h3>
              <p className="text-gray-400 mb-4">
                {user?.emailVerified ? 'Email verified ✓' : 'Verify your email'}
              </p>
              {!user?.emailVerified && (
                <Link href="/verify-email">
                  <Button variant="secondary" className="w-full">
                    Verify Email
                  </Button>
                </Link>
              )}
            </Card>

            <Card>
              <h3 className="text-xl font-extrabold mb-2">Account Info</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Email: {user?.email}</p>
                <p>Joined: {userProfile?.createdAt?.toDate().toLocaleDateString() || 'Recently'}</p>
              </div>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

