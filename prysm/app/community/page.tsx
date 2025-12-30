'use client';

import { Navigation } from '@/components/Navigation';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AnimatedCard = ({ delay, children, className }: { delay: number; children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-6">
            <Badge variant="purple">
              Future Phase
            </Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">
            Prysm <span className="bg-gradient-to-r from-[var(--lime)] to-[var(--lavender)] bg-clip-text text-transparent">Community</span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            Connect, collaborate, and grow together. The Prysm Community brings students together to share knowledge, resources, and support each other's academic journey.
          </p>
        </motion.div>

        {/* Hero Demo */}
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center mb-16 sm:mb-20">
          <div className="relative order-2 lg:order-1">
            <Card className="p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute -inset-4 bg-lime-400/10 blur-2xl rounded-full"></div>
              <div className="relative bg-[var(--prysm-bg)] rounded-2xl p-6 border border-[var(--border-color)]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-[var(--lime)]/80"></div>
                  </div>
                  <div className="px-3 py-1 bg-[var(--lime)]/10 rounded-full border border-[var(--lime)]/30">
                    <span className="text-[10px] text-[var(--lime)] font-bold uppercase">Community Hub</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[var(--bg-overlay)] rounded-xl p-4 border border-[var(--border-color)]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--lime)]/20 flex items-center justify-center">
                        <i className="fa-solid fa-upload text-[var(--lime)] text-sm"></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-[var(--text-secondary)]">Uploading Exam Paper</p>
                        <p className="text-sm font-bold text-[var(--text-primary)]">NSSCO Biology 2023</p>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-[var(--lime)] animate-pulse"></div>
                    </div>
                    <div className="h-2 bg-[var(--bg-overlay)] rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-[var(--lime)]/30 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">Processing... 75%</p>
                  </div>
                  <div className="bg-[var(--lime)]/10 rounded-xl p-4 border border-[var(--lime)]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fa-solid fa-users text-lime-400 text-xs"></i>
                      <p className="text-xs font-bold text-lime-400 uppercase">Community Activity</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <i className="fa-solid fa-check-circle text-[var(--lime)]"></i>
                        <span>Sarah M. uploaded NSSCO Chemistry 2024</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <i className="fa-solid fa-comment text-[var(--lime)]"></i>
                        <span>12 students helped with Biology Paper 2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <Badge variant="purple" className="mb-6">
              Coming After Phase 3
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">
              Build Together, <span className="text-[var(--lavender)]">Succeed Together</span>
            </h2>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8 sm:mb-10">
              The Prysm Community is where students come together to share resources, help each other, and build a collaborative learning environment. Upload exam papers, ask questions, share study notes, and connect with peers across SADC.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <AnimatedCard delay={0.1}>
            <Card className="academy-card border-l-4 border-l-lime-400 p-6 sm:p-8 h-full">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-lime-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <i className="fa-solid fa-upload text-lime-400 text-2xl sm:text-3xl feature-icon"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Public Exam Hub</h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                Contribute to the community by uploading exam papers. All submissions are verified before being added to our database. Help thousands of students access quality study materials.
              </p>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <Card className="academy-card border-l-4 border-l-purple-400 p-6 sm:p-8 h-full">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <i className="fa-solid fa-comments text-purple-400 text-2xl sm:text-3xl feature-icon"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Study Groups</h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                Create or join study groups with students in your subject, year, or curriculum. Share notes, discuss topics, and study together in real-time collaborative sessions.
              </p>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.3}>
            <Card className="academy-card border-l-4 border-l-blue-400 p-6 sm:p-8 h-full">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <i className="fa-solid fa-share-nodes text-blue-400 text-2xl sm:text-3xl feature-icon"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Shared Notes Library</h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                Share your study notes with the community or discover notes from top-performing students. Rate and review notes to help others find the best resources.
              </p>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.4}>
            <Card className="academy-card border-l-4 border-l-orange-400 p-6 sm:p-8 h-full">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <i className="fa-solid fa-question-circle text-orange-400 text-2xl sm:text-3xl feature-icon"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Q&A Forum</h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                Ask questions and get answers from peers and verified tutors. Upvote helpful responses and build your reputation as a community contributor.
              </p>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.5}>
            <Card className="academy-card border-l-4 border-l-yellow-400 p-6 sm:p-8 h-full">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-yellow-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <i className="fa-solid fa-trophy text-yellow-400 text-2xl sm:text-3xl feature-icon"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Achievement System</h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                Earn badges and achievements for contributing to the community. Unlock special rewards, recognition, and exclusive features as you help others succeed.
              </p>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.6}>
            <Card className="academy-card border-l-4 border-l-cyan-400 p-6 sm:p-8 h-full">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-cyan-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <i className="fa-solid fa-users-line text-cyan-400 text-2xl sm:text-3xl feature-icon"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Live Study Sessions</h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                Join or host live study sessions with video, screen sharing, and collaborative whiteboards. Study together in real-time, no matter where you are.
              </p>
            </Card>
          </AnimatedCard>
        </div>

        {/* Community Stats Preview */}
        <AnimatedCard delay={0.7}>
          <Card className="academy-card p-8 sm:p-12 bg-gradient-to-br from-[var(--prysm-card)] to-[var(--prysm-bg)] border-2 border-[var(--lime)]/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">
                A Thriving <span className="bg-gradient-to-r from-[var(--lime)] to-[var(--lavender)] bg-clip-text text-transparent">Learning Ecosystem</span>
              </h3>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                When the Community launches, you'll be able to connect with thousands of students, share resources, and build lasting study partnerships.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-[var(--bg-overlay)] rounded-xl">
                <div className="w-12 h-12 rounded-full bg-[var(--lime)]/20 flex items-center justify-center mx-auto mb-3">
                  <i className="fa-solid fa-users text-[var(--lime)] text-xl"></i>
                </div>
                <p className="text-2xl font-extrabold text-[var(--text-primary)] mb-1">Growing</p>
                <p className="text-xs text-[var(--text-secondary)]">Community</p>
              </div>
              <div className="text-center p-4 bg-[var(--bg-overlay)] rounded-xl">
                <div className="w-12 h-12 rounded-full bg-purple-400/20 flex items-center justify-center mx-auto mb-3">
                  <i className="fa-solid fa-file-upload text-purple-400 text-xl"></i>
                </div>
                <p className="text-2xl font-extrabold text-[var(--text-primary)] mb-1">Shared</p>
                <p className="text-xs text-[var(--text-secondary)]">Resources</p>
              </div>
              <div className="text-center p-4 bg-[var(--bg-overlay)] rounded-xl">
                <div className="w-12 h-12 rounded-full bg-blue-400/20 flex items-center justify-center mx-auto mb-3">
                  <i className="fa-solid fa-comments text-blue-400 text-xl"></i>
                </div>
                <p className="text-2xl font-extrabold text-[var(--text-primary)] mb-1">Active</p>
                <p className="text-xs text-[var(--text-secondary)]">Discussions</p>
              </div>
              <div className="text-center p-4 bg-[var(--bg-overlay)] rounded-xl">
                <div className="w-12 h-12 rounded-full bg-orange-400/20 flex items-center justify-center mx-auto mb-3">
                  <i className="fa-solid fa-handshake text-orange-400 text-xl"></i>
                </div>
                <p className="text-2xl font-extrabold text-[var(--text-primary)] mb-1">Study</p>
                <p className="text-xs text-[var(--text-secondary)]">Partnerships</p>
              </div>
            </div>
          </Card>
        </AnimatedCard>

        <div className="text-center mt-12">
          <Link href="/tools" className="inline-flex items-center gap-2 text-lime-400 font-semibold hover:gap-3 transition-all">
            <i className="fa-solid fa-arrow-left"></i>
            Back to Tools
          </Link>
        </div>
      </section>
    </div>
  );
}

