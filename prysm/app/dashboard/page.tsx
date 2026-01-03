'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/hooks/useAuth';
import { getUserAvatarUrl } from '@/lib/avatar';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { UserTracker } from '@/components/UserTracker';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

function DashboardContent() {
  const { user, userProfile, signOut } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showCongratulations, setShowCongratulations] = useState(false);
  const avatarUrl = getUserAvatarUrl(
    userProfile?.displayName || user?.displayName || user?.email || 'User',
    userProfile?.photoURL || user?.photoURL || null,
    32
  );

  useEffect(() => {
    // Check if this is a first login (redirected from complete-profile)
    const firstLogin = searchParams.get('firstLogin') === 'true';
    if (firstLogin && userProfile?.isEarlyUser && userProfile?.signupNumber) {
      setShowCongratulations(true);
      // Remove the query parameter from URL
      const url = new URL(window.location.href);
      url.searchParams.delete('firstLogin');
      window.history.replaceState({}, '', url.toString());
      // Hide after 8 seconds
      const timer = setTimeout(() => {
        setShowCongratulations(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, userProfile?.isEarlyUser, userProfile?.signupNumber]);

  return (
    <ProtectedRoute requireCompleteProfile={true}>
      <div className="min-h-screen bg-[var(--prysm-bg)]">
        <Navigation />
        <div className="px-4 sm:px-6 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 mb-6 sm:mb-8"
            >
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3">
                      Welcome back, {userProfile?.firstName || userProfile?.displayName?.split(' ')[0] || user?.displayName?.split(' ')[0] || 'User'}! 👋
                    </h1>
                    <div>
                      <UserTracker />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Congratulations Message for First Login */}
            <AnimatePresence>
              {showCongratulations && userProfile?.signupNumber && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <Card className="bg-gradient-to-r from-[var(--lime)]/20 via-[var(--lime)]/10 to-[var(--lavender)]/10 border-2 border-[var(--lime)]/40 shadow-lg shadow-[var(--lime)]/20">
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-[var(--lime)]/30 flex items-center justify-center flex-shrink-0">
                        <img
                          src="/badge.svg"
                          alt="Founder Badge"
                          className="w-8 h-8 sm:w-12 sm:h-12"
                          style={{ filter: 'drop-shadow(0 0 4px rgba(212, 255, 128, 0.3))' }}
                          onError={(e) => {
                            e.currentTarget.src = '/badge.png';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-1 text-[var(--lime)]">
                          Congratulations! You&apos;re Founder #{userProfile?.signupNumber ? String(userProfile.signupNumber).padStart(3, '0') : '001'}/200 🎉
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)]">
                          Welcome to Prysm! Thank you for being one of our first 200 founders. You&apos;re helping us build the future of education.
                        </p>
                      </div>
                      <button
                        onClick={() => setShowCongratulations(false)}
                        className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0 mt-1 sm:mt-0"
                        aria-label="Close"
                      >
                        <i className="fa-solid fa-times text-lg sm:text-xl"></i>
                      </button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Thank You Message for Founders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
                <Card className="bg-gradient-to-r from-[var(--lime)]/10 via-[var(--lavender)]/10 to-[var(--lime)]/10 border-[var(--lime)]/30">
                  <div className="p-4 sm:p-6 md:p-8 text-center">
                    <div className="flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <img
                        src="/badge.svg"
                        alt="Founder Badge"
                        className="w-16 h-16 sm:w-20 sm:h-20"
                        style={{ filter: 'drop-shadow(0 0 4px rgba(212, 255, 128, 0.3))' }}
                        onError={(e) => {
                          e.currentTarget.src = '/badge.png';
                        }}
                      />
                    </div>
                    
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-3 sm:mb-4 text-[var(--text-primary)]">
                      Thank You, Founder! 🎉
                    </h2>
                    
                    <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed">
                      Thank you for signing up and being part of this incredible journey. You're one of the first 200 founders who believed in Prysm from the very beginning, and that means everything to us.
                    </p>
                    
                    <div className="bg-[var(--bg-overlay)] rounded-lg p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 max-w-2xl mx-auto">
                      <p className="text-sm sm:text-base text-[var(--text-primary)] font-semibold leading-relaxed">
                        We promise to build something extraordinary for you. Your feedback, your needs, and your success are at the heart of everything we're creating. Together, we're going to revolutionize how students learn, study, and succeed.
                      </p>
                    </div>
                    
                    <div className="pt-3 sm:pt-4 border-t border-[var(--border-color)]">
                      <p className="text-lg sm:text-xl font-extrabold text-[var(--lime)] mb-3 sm:mb-4">
                        Tell a friend to tell a friend
                      </p>
                      <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-4 sm:mb-6">
                        Sign up and join the founders crew! 🚀
                      </p>
                      
                      {/* Social Links and Feedback */}
                      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                        <a
                          href="https://instagram.com/prysm_learn"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 hover:border-purple-500/50 transition-all"
                          aria-label="Follow us on Instagram"
                        >
                          <i className="fa-brands fa-instagram text-lg sm:text-xl"></i>
                          <span className="font-semibold text-sm sm:text-base">Instagram</span>
                        </a>
                        
                        <a
                          href="https://tiktok.com/@prysmlearn"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-black/40 to-gray-800/40 border border-gray-600/30 rounded-lg text-white hover:bg-gray-700/40 hover:border-gray-500/50 transition-all"
                          aria-label="Follow us on TikTok"
                        >
                          <i className="fa-brands fa-tiktok text-lg sm:text-xl"></i>
                          <span className="font-semibold text-sm sm:text-base">TikTok</span>
                        </a>
                        
                        <a
                          href="https://forms.gle/bHz7ssmafhoqVYPT9"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-[var(--lime)]/20 to-[var(--lime)]/10 border border-[var(--lime)]/30 rounded-lg text-[var(--lime)] hover:bg-[var(--lime)]/30 hover:border-[var(--lime)]/50 transition-all"
                          aria-label="Submit feedback"
                        >
                          <i className="fa-solid fa-comment-dots text-lg sm:text-xl"></i>
                          <span className="font-semibold text-sm sm:text-base">Feedback</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
            </motion.div>

            {/* Main Dashboard Cards */}
            {/* Email verification card removed from dashboard but logic remains in verify-email page */}

            {/* Coming Soon Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Tools & Features</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Exam Hub */}
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => router.push('/tools')}
                >
                  <Card className="h-full opacity-80 blur-[0.5px] transition-all duration-300 group-hover:opacity-90">
                    <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center min-h-[160px] sm:min-h-[200px]">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3 sm:mb-4">
                        <i className="fa-solid fa-file-alt text-blue-400 text-lg sm:text-xl md:text-2xl"></i>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-extrabold mb-1 sm:mb-2">Exam Hub</h3>
                      <p className="text-[var(--text-secondary)] text-xs sm:text-sm">
                        Access past exam papers and practice tests
                      </p>
                    </div>
                  </Card>
                  <div className="absolute inset-0 bg-[var(--prysm-bg)]/40 backdrop-blur-sm rounded-xl flex items-center justify-center z-10 group-hover:bg-[var(--prysm-bg)]/30 transition-colors">
                    <span className="bg-[var(--prysm-card)] text-[var(--lime)] text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full uppercase tracking-widest border border-[var(--lime)]/30 shadow-lg">
                      Coming Soon
                    </span>
                  </div>
                </div>

                {/* Smart Notes */}
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => router.push('/tools')}
                >
                  <Card className="h-full opacity-80 blur-[0.5px] transition-all duration-300 group-hover:opacity-90">
                    <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center min-h-[160px] sm:min-h-[200px]">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-purple-500/20 flex items-center justify-center mb-3 sm:mb-4">
                        <i className="fa-solid fa-sticky-note text-purple-400 text-lg sm:text-xl md:text-2xl"></i>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-extrabold mb-1 sm:mb-2">Smart Notes</h3>
                      <p className="text-[var(--text-secondary)] text-xs sm:text-sm">
                        AI-powered note-taking and organization
                      </p>
                    </div>
                  </Card>
                  <div className="absolute inset-0 bg-[var(--prysm-bg)]/40 backdrop-blur-sm rounded-xl flex items-center justify-center z-10 group-hover:bg-[var(--prysm-bg)]/30 transition-colors">
                    <span className="bg-[var(--prysm-card)] text-[var(--lime)] text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full uppercase tracking-widest border border-[var(--lime)]/30 shadow-lg">
                      Coming Soon
                    </span>
                  </div>
                </div>

                {/* Timetable */}
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => router.push('/tools')}
                >
                  <Card className="h-full opacity-80 blur-[0.5px] transition-all duration-300 group-hover:opacity-90">
                    <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center min-h-[160px] sm:min-h-[200px]">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-green-500/20 flex items-center justify-center mb-3 sm:mb-4">
                        <i className="fa-solid fa-calendar-alt text-green-400 text-lg sm:text-xl md:text-2xl"></i>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-extrabold mb-1 sm:mb-2">Timetable</h3>
                      <p className="text-[var(--text-secondary)] text-xs sm:text-sm">
                        Manage your class schedule and deadlines
                      </p>
                    </div>
                  </Card>
                  <div className="absolute inset-0 bg-[var(--prysm-bg)]/40 backdrop-blur-sm rounded-xl flex items-center justify-center z-10 group-hover:bg-[var(--prysm-bg)]/30 transition-colors">
                    <span className="bg-[var(--prysm-card)] text-[var(--lime)] text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full uppercase tracking-widest border border-[var(--lime)]/30 shadow-lg">
                      Coming Soon
                    </span>
                  </div>
                </div>

                {/* Paper Summarizer */}
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => router.push('/tools')}
                >
                  <Card className="h-full opacity-80 blur-[0.5px] transition-all duration-300 group-hover:opacity-90">
                    <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center min-h-[160px] sm:min-h-[200px]">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-yellow-500/20 flex items-center justify-center mb-3 sm:mb-4">
                        <i className="fa-solid fa-wand-magic-sparkles text-yellow-400 text-lg sm:text-xl md:text-2xl"></i>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-extrabold mb-1 sm:mb-2">Paper Summarizer</h3>
                      <p className="text-[var(--text-secondary)] text-xs sm:text-sm">
                        AI-powered breakdowns of complex exam papers
                      </p>
                    </div>
                  </Card>
                  <div className="absolute inset-0 bg-[var(--prysm-bg)]/40 backdrop-blur-sm rounded-xl flex items-center justify-center z-10 group-hover:bg-[var(--prysm-bg)]/30 transition-colors">
                    <span className="bg-[var(--prysm-card)] text-[var(--lime)] text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full uppercase tracking-widest border border-[var(--lime)]/30 shadow-lg">
                      Coming Soon
                    </span>
                  </div>
                </div>

                {/* Voice-to-Notes */}
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => router.push('/tools')}
                >
                  <Card className="h-full opacity-80 blur-[0.5px] transition-all duration-300 group-hover:opacity-90">
                    <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center min-h-[140px] sm:min-h-[160px] md:min-h-[200px]">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-pink-500/20 flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                        <i className="fa-solid fa-microphone text-pink-400 text-lg sm:text-xl md:text-2xl"></i>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-extrabold mb-1 sm:mb-2">Voice-to-Notes</h3>
                      <p className="text-[var(--text-secondary)] text-xs sm:text-sm">
                        Convert your voice recordings into notes
                      </p>
                    </div>
                  </Card>
                  <div className="absolute inset-0 bg-[var(--prysm-bg)]/40 backdrop-blur-sm rounded-xl flex items-center justify-center z-10 group-hover:bg-[var(--prysm-bg)]/30 transition-colors">
                    <span className="bg-[var(--prysm-card)] text-[var(--lime)] text-[10px] sm:text-xs font-bold px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full uppercase tracking-widest border border-[var(--lime)]/30 shadow-lg">
                      Coming Soon
                    </span>
                  </div>
                </div>

                {/* Grade Predictor */}
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => router.push('/tools')}
                >
                  <Card className="h-full opacity-80 blur-[0.5px] transition-all duration-300 group-hover:opacity-90">
                    <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center min-h-[140px] sm:min-h-[160px] md:min-h-[200px]">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                        <i className="fa-solid fa-chart-line text-indigo-400 text-lg sm:text-xl md:text-2xl"></i>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-extrabold mb-1 sm:mb-2">Grade Predictor</h3>
                      <p className="text-[var(--text-secondary)] text-xs sm:text-sm">
                        Predict your grades based on past performance
                      </p>
                    </div>
                  </Card>
                  <div className="absolute inset-0 bg-[var(--prysm-bg)]/40 backdrop-blur-sm rounded-xl flex items-center justify-center z-10 group-hover:bg-[var(--prysm-bg)]/30 transition-colors">
                    <span className="bg-[var(--prysm-card)] text-[var(--lime)] text-[10px] sm:text-xs font-bold px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full uppercase tracking-widest border border-[var(--lime)]/30 shadow-lg">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <ProtectedRoute requireCompleteProfile={true}>
        <div className="min-h-screen bg-[var(--prysm-bg)] flex items-center justify-center">
          <div className="text-[var(--text-primary)]">Loading...</div>
        </div>
      </ProtectedRoute>
    }>
      <DashboardContent />
    </Suspense>
  );
}
