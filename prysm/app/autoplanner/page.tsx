'use client';

import { Navigation } from '@/components/Navigation';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import Link from 'next/link';

export default function AutoPlannerPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center mb-12 sm:mb-16">
          <div className="relative order-2 lg:order-1">
            <Card className="p-8 relative overflow-hidden">
              <div className="absolute -inset-4 bg-purple-400/10 blur-2xl rounded-full"></div>
              <div className="relative bg-[var(--prysm-bg)] rounded-2xl p-6 border border-[var(--border-color)]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-[var(--lime)]/80"></div>
                  </div>
                  <div className="px-3 py-1 bg-purple-400/10 rounded-full border border-purple-400/30">
                    <span className="text-[10px] text-purple-400 font-bold uppercase">Auto-Planner</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-[var(--bg-overlay)] rounded-lg p-3 border border-[var(--border-color)]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[var(--text-secondary)]">Today's Schedule</span>
                      <span className="text-xs text-purple-400 font-bold">3h 30m</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                        <span className="text-xs text-[var(--text-primary)]">Math - 1h 00m</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[var(--lime)]"></div>
                        <span className="text-xs text-[var(--text-primary)]">Biology - 1h 30m</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span className="text-xs text-[var(--text-primary)]">Physics - 1h 00m</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-400/10 rounded-lg p-3 border border-purple-400/20">
                    <p className="text-xs font-bold text-purple-400 uppercase mb-2">Next Exam</p>
                    <p className="text-sm text-[var(--text-primary)] font-semibold">Biology Paper 2</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">15 days remaining</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <i className="fa-solid fa-check-circle text-purple-400"></i>
                    <span>Schedule optimized by AI</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <Badge variant="purple" className="mb-6">
              Launch Feature
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">Smart Auto-Planner</h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8 sm:mb-10">
              Never miss an exam deadline again. Input your subjects and available
              hours, and Prysm automatically builds an optimized study schedule
              tailored to your syllabus.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <Card className="academy-card border-l-4 border-l-purple-400 p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-calendar-check text-purple-400 text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Auto-Fetch Exam Dates</h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Prysm automatically retrieves exam dates from your selected syllabus
              (NSSCO, CAPS, IEB, EGCSE). No manual entry required.
            </p>
          </Card>

          <Card className="academy-card border-l-4 border-l-purple-400 p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-clock text-purple-400 text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Smart Time Allocation</h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Input your available study hours and Prysm intelligently allocates
              time based on exam proximity, subject difficulty, and your
              preferences.
            </p>
          </Card>

          <Card className="academy-card border-l-4 border-l-purple-400 p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-lightbulb text-purple-400 text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Study Recommendations</h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Get personalized study suggestions based on your progress, upcoming
              exams, and subject strengths. Focus on what matters most.
            </p>
          </Card>

          <Card className="academy-card border-l-4 border-l-purple-400 p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-bell text-purple-400 text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Reminders & Alerts</h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Never miss a study session or exam. Get timely reminders and alerts
              to keep you on track with your schedule.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/tools" className="inline-flex items-center gap-2 text-purple-400 font-semibold hover:gap-3 transition-all">
            <i className="fa-solid fa-arrow-left"></i>
            Back to Tools
          </Link>
        </div>
      </section>
    </div>
  );
}

