'use client';

import { Navigation } from '@/components/Navigation';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import Link from 'next/link';

export default function ParentHubPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="relative order-2 lg:order-1">
            <Card className="p-8 relative overflow-hidden">
              <div className="absolute -inset-4 bg-lime-400/10 blur-2xl rounded-full"></div>
              <div className="relative bg-[#120d2b] rounded-2xl p-6 border border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-lime-400/80"></div>
                  </div>
                  <div className="px-3 py-1 bg-lime-400/10 rounded-full border border-lime-400/30">
                    <span className="text-[10px] text-lime-400 font-bold uppercase">Parent View</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Study Time Today</span>
                      <span className="text-sm font-bold text-lime-400">3h 24m</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-lime-400/30 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                      <p className="text-xs text-gray-400 mb-1">Math</p>
                      <p className="text-lg font-bold text-white">45m</p>
                      <div className="flex items-center gap-1 mt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-lime-400"></div>
                        <span className="text-[10px] text-gray-500">Active</span>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                      <p className="text-xs text-gray-400 mb-1">Biology</p>
                      <p className="text-lg font-bold text-white">1h 12m</p>
                    </div>
                  </div>
                  <div className="bg-lime-400/10 rounded-lg p-3 border border-lime-400/20">
                    <p className="text-xs font-bold text-lime-400 uppercase mb-1">Upcoming Exam</p>
                    <p className="text-sm text-white font-semibold">Biology Paper 2</p>
                    <p className="text-xs text-gray-400 mt-1">Nov 15, 2025</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <span className="px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6 inline-block" style={{ background: 'rgba(224, 215, 255, 0.1)', color: '#e0d7ff', border: '1px solid rgba(224, 215, 255, 0.3)' }}>
              Coming Phase 3
            </span>
            <h1 className="text-5xl lg:text-6xl font-extrabold mb-6">Parent Dashboard</h1>
            <p className="text-xl text-gray-400 mb-10">
              Stay connected with your child's academic journey. Monitor progress,
              track study time, and receive insights to support their success.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="academy-card p-8">
            <div className="w-16 h-16 bg-lime-400/10 rounded-xl flex items-center justify-center mb-6">
              <i className="fa-solid fa-clock text-lime-400 text-3xl feature-icon"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">Study Time Tracking</h3>
            <p className="text-gray-400 leading-relaxed">
              See exactly how much time your child spends studying each subject.
              Get real-time insights into their study habits and dedication.
            </p>
          </Card>

          <Card className="academy-card p-8">
            <div className="w-16 h-16 bg-lime-400/10 rounded-xl flex items-center justify-center mb-6">
              <i className="fa-solid fa-chart-line text-lime-400 text-3xl feature-icon"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">Progress Reports</h3>
            <p className="text-gray-400 leading-relaxed">
              Monthly reports on subject progress, strengths, and areas for
              improvement. Understand where your child excels and where they need
              support.
            </p>
          </Card>

          <Card className="academy-card p-8">
            <div className="w-16 h-16 bg-lime-400/10 rounded-xl flex items-center justify-center mb-6">
              <i className="fa-solid fa-calendar-days text-lime-400 text-3xl feature-icon"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">Upcoming Exams & Sessions</h3>
            <p className="text-gray-400 leading-relaxed">
              View upcoming exam dates and tutor sessions at a glance. Never miss
              an important academic milestone or deadline.
            </p>
          </Card>

          <Card className="academy-card p-8">
            <div className="w-16 h-16 bg-lime-400/10 rounded-xl flex items-center justify-center mb-6">
              <i className="fa-solid fa-user-graduate text-lime-400 text-3xl feature-icon"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">Tutor Session History</h3>
            <p className="text-gray-400 leading-relaxed">
              Track tutor sessions attended, subjects covered, and progress made.
              See how tutoring is helping your child improve.
            </p>
          </Card>
        </div>

        <div className="text-center mt-16">
          <Link href="/" className="inline-flex items-center gap-2 text-lime-400 font-semibold hover:gap-3 transition-all">
            <i className="fa-solid fa-arrow-left"></i>
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}

