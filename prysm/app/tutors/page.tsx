'use client';

import { Navigation } from '@/components/Navigation';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TutorsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center mb-16">
          <div className="relative order-2 lg:order-1">
            <Card className="p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute -inset-4 bg-lime-400/10 blur-2xl rounded-full"></div>
              <div className="relative bg-[#120d2b] rounded-2xl p-6 border border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-lime-400/80"></div>
                  </div>
                  <div className="px-3 py-1 bg-lime-400/10 rounded-full border border-lime-400/30">
                    <span className="text-[10px] text-lime-400 font-bold uppercase">Tutor Hub</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-lime-400/20 flex items-center justify-center">
                          <i className="fa-solid fa-user-graduate text-lime-400 text-sm"></i>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Recommended for You</p>
                          <p className="text-sm font-bold text-white">Sarah M.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fa-solid fa-star text-lime-400 text-xs"></i>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-400">Biology • NSSCO</span>
                      <span className="text-xs text-lime-400 font-bold">4.9/5.0</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <i className="fa-solid fa-check-circle text-lime-400"></i>
                      <span>120+ sessions • 98% success rate</span>
                    </div>
                  </div>
                  <div className="bg-lime-400/10 rounded-xl p-4 border border-lime-400/20">
                    <p className="text-xs font-bold text-lime-400 uppercase mb-2">AI Recommendation</p>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Based on your performance in Biology, we recommend Sarah for focused exam prep. She specializes in NSSCO Biology and has helped 50+ students improve by 2+ grades.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Available Today</span>
                      <button className="px-4 py-1.5 bg-lime-400 text-[#120d2b] rounded-lg text-xs font-bold hover:bg-lime-300 transition-colors">
                        Request Session
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <Badge variant="purple" className="mb-6">
              Coming Phase 3
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">Prysm Tutors</h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-10">
              Book 1-on-1 sessions with top-tier university students who mastered
              the exact curriculum you're studying. Get personalized help from
              tutors who understand your syllabus.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <Card className="academy-card p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-lime-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-brain text-lime-400 text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI-Powered Recommendations</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Our AI analyzes your performance across subjects and recommends tutors
              who specialize in your weak areas. Get matched with tutors who have
              proven success in your specific curriculum.
            </p>
          </Card>

          <Card className="academy-card p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-lime-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-star text-lime-400 text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Verified Ratings & Reviews</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              See detailed ratings and reviews from students who've worked with each
              tutor. Filter by subject, curriculum, success rate, and student
              satisfaction scores.
            </p>
          </Card>

          <Card className="academy-card p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-lime-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-calendar-check text-lime-400 text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Flexible Scheduling</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Book sessions that fit your schedule. View tutor availability in
              real-time and request sessions for specific dates and times that work
              for you.
            </p>
          </Card>

          <Card className="academy-card p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-lime-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-graduation-cap text-lime-400 text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Curriculum-Specific Expertise</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              All tutors are verified university students who excelled in your exact
              curriculum (NSSCO, CAPS, IEB, EGCSE). They understand your marking
              rubrics and exam formats.
            </p>
          </Card>

          <Card className="academy-card p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-lime-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-comments text-lime-400 text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Request Custom Tutors</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Can't find the perfect tutor? Request a specific tutor or subject
              expert. Our team will help match you with the ideal tutor for your
              needs.
            </p>
          </Card>

          <Card className="academy-card p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-lime-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-chart-line text-lime-400 text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Track Progress</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Monitor your improvement with detailed progress reports. See how
              tutoring sessions impact your grades and exam performance over time.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/tools" className="inline-flex items-center gap-2 text-lime-400 font-semibold hover:gap-3 transition-all">
            <i className="fa-solid fa-arrow-left"></i>
            Back to Tools
          </Link>
        </div>
      </section>
    </div>
  );
}

