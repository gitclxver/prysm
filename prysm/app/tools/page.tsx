'use client';

import { Navigation } from '@/components/Navigation';
import { Badge } from '@/components/Badge';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AnimatedCard = ({ delay, children, className, id }: { delay: number; children: React.ReactNode; className?: string; id?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={className}
    id={id}
  >
    {children}
  </motion.div>
);

export default function ToolsPage() {
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
              Phase 1 Features
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6">
            Everything You Need to <span className="bg-gradient-to-r from-[var(--lime)] to-[var(--lavender)] bg-clip-text text-transparent">Succeed</span>
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            The core modules available at launch. Built to centralize your entire
            academic journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <AnimatedCard delay={0.1} className="academy-card border-l-4 border-l-[var(--lime)] border-t border-r border-b border-[var(--border-color)] p-8 rounded-2xl bg-[var(--prysm-card)]">
            <div className="w-14 h-14 bg-[var(--lime)]/10 rounded-xl flex items-center justify-center text-[var(--lime)] mb-6">
              <i className="fa-solid fa-file-invoice text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">Exam Hub</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                Access thousands of past papers from Namibia (NSSCO), South Africa (CAPS & IEB), Eswatini (EGCSE), IGCSE, Zimbabwe (ZIMSEC), and Botswana (BGCSE). AI identifies most frequently asked questions and trending topics.
              </p>
            <Link href="/examhub" className="text-[var(--lime)] text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Explore Exam Hub
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>

          <AnimatedCard delay={0.2} className="academy-card border-l-4 border-l-purple-400 border-t border-r border-b border-[var(--border-color)] p-8 rounded-2xl bg-[var(--prysm-card)]">
            <div className="w-14 h-14 bg-purple-400/10 rounded-xl flex items-center justify-center text-purple-400 mb-6">
              <i className="fa-solid fa-calendar-check text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">Auto-Planner</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              Input your subjects and available study hours. Prysm automatically fetches exam dates from your syllabus and builds an optimized study schedule with smart recommendations.
            </p>
            <Link href="/autoplanner" className="text-purple-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Plan Your Schedule
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>

          <AnimatedCard delay={0.3} className="academy-card border-l-4 border-l-blue-400 border-t border-r border-b border-[var(--border-color)] p-8 rounded-2xl bg-[var(--prysm-card)]">
            <div className="w-14 h-14 bg-blue-400/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
              <i className="fa-solid fa-pen-nib text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">Drawing Board</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              Smart drawing board with infinite canvas. Sketch diagrams, annotate study materials, and link notes to syllabus chapters. Cloud sync included.
            </p>
            <Link href="/canvas" className="text-blue-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Start Drawing
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>

          <AnimatedCard delay={0.4} className="academy-card border-l-4 border-l-orange-400 border-t border-r border-b border-[var(--border-color)] p-8 rounded-2xl bg-[var(--prysm-card)]">
            <div className="w-14 h-14 bg-orange-400/10 rounded-xl flex items-center justify-center text-orange-400 mb-6">
              <i className="fa-brands fa-youtube text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">YouTube AI</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              Paste any YouTube link and get instant transcripts, AI-powered summaries, and translations. Never miss a key point from your study videos again.
            </p>
            <Link href="/youtubeai" className="text-orange-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Try YouTube AI
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>

          <AnimatedCard delay={0.5} className="academy-card border-l-4 border-l-lime-400 border-t border-r border-b border-white/5 p-8 rounded-2xl bg-[#1d163d] relative">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <Badge variant="purple" className="text-[10px] px-2 py-0.5 whitespace-nowrap">Phase 3</Badge>
            </div>
            <div className="w-14 h-14 bg-lime-400/10 rounded-xl flex items-center justify-center text-lime-400 mb-6">
              <i className="fa-solid fa-user-graduate text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Prysm Tutors</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Book 1-on-1 sessions with top-tier university students who mastered the exact curriculum you're studying. Get personalized help from tutors who understand your syllabus.
            </p>
            <Link href="/tutors" className="text-lime-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Explore Tutors
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>

          <AnimatedCard delay={0.6} className="academy-card border-l-4 border-l-red-400 border-t border-r border-b border-white/5 p-8 opacity-75 rounded-2xl bg-[#1d163d] relative">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <Badge variant="purple" className="text-[10px] px-2 py-0.5 whitespace-nowrap">Coming Soon</Badge>
            </div>
            <div className="w-14 h-14 bg-red-400/10 rounded-xl flex items-center justify-center text-red-400 mb-6">
              <i className="fa-solid fa-fire text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Study Streaks & Progress</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Gamified focus with 24h streaks that auto-pause during holidays. Track your study progress and build consistent study habits.
            </p>
          </AnimatedCard>

          <AnimatedCard delay={0.7} className="academy-card border-l-4 border-l-cyan-400 border-t border-r border-b border-white/5 p-8 opacity-75 rounded-2xl bg-[#1d163d] relative">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <Badge variant="purple" className="text-[10px] px-2 py-0.5 whitespace-nowrap">Future Phase</Badge>
            </div>
            <div className="w-14 h-14 bg-cyan-400/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6">
              <i className="fa-solid fa-users text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Community Hub</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Connect with students, share exam papers, join study groups, and build a thriving learning ecosystem together.
            </p>
            <Link href="/community" className="text-cyan-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Explore Community
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>
        </div>
      </section>
    </div>
  );
}

