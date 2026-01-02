'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navigation } from '@/components/Navigation';
import { ProfileForm } from '@/components/ProfileForm';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { UserTracker } from '@/components/UserTracker';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';

export default function ProfilePage() {
  const { userProfile } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[var(--prysm-bg)]">
        <Navigation />
        <div className="px-4 sm:px-6 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8"
            >
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2">Profile Settings</h1>
                <p className="text-sm sm:text-base text-[var(--text-secondary)]">Customize your profile to your liking</p>
              </div>
              <Link href="/dashboard">
                <Button variant="outline">
                  <i className="fa-solid fa-arrow-left mr-2"></i>
                  Back to Dashboard
                </Button>
              </Link>
            </motion.div>

            {/* User Number & Founders Badge */}
            {userProfile?.isEarlyUser && userProfile.signupNumber && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <Card className="bg-gradient-to-r from-[var(--lime)]/10 via-[var(--lime)]/5 to-[var(--lavender)]/10 border-[var(--lime)]/30">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-6">
                    <UserTracker />
                    <div className="flex-1">
                      <p className="text-[var(--text-primary)] font-semibold mb-1 text-base sm:text-lg">
                        Founder #{String(userProfile.signupNumber).padStart(3, '0')}/200
                      </p>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                        You're #{String(userProfile.signupNumber).padStart(3, '0')} of the first 200 founders! Thank you for being part of Prysm's foundation. 🎉
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Profile Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ProfileForm />
            </motion.div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
