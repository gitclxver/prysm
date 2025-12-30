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

export default function UniLinkPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center mb-16 sm:mb-20">
          <div className="relative order-2 lg:order-1">
            <Card className="p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute -inset-4 bg-blue-400/10 blur-2xl rounded-full"></div>
              <div className="relative bg-[#120d2b] rounded-2xl p-6 border border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-blue-400/80"></div>
                  </div>
                  <div className="px-3 py-1 bg-blue-400/10 rounded-full border border-blue-400/30">
                    <span className="text-[10px] text-blue-400 font-bold uppercase">Future Phase</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-400/20 flex items-center justify-center">
                        <i className="fa-solid fa-graduation-cap text-blue-400 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Recommended University</p>
                        <p className="text-sm font-bold text-white">University of Cape Town</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Match Score</span>
                        <span className="text-blue-400 font-bold">94%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400/30 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    <div className="bg-blue-400/10 rounded-lg p-3">
                      <p className="text-xs text-gray-400 mb-1">Based on your results:</p>
                      <p className="text-xs text-white font-semibold">BSc Computer Science</p>
                    </div>
                  </div>
                  <div className="bg-blue-400/10 rounded-xl p-4 border border-blue-400/20">
                    <p className="text-xs font-bold text-blue-400 uppercase mb-2">Application Status</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <i className="fa-solid fa-check-circle text-blue-400"></i>
                        <span>Requirements matched</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <i className="fa-solid fa-clock text-blue-400"></i>
                        <span>Application ready to submit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <Badge variant="purple" className="mb-6">
              Future Phase
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">
              Uni-Link: <span className="bg-gradient-to-r from-[#d4ff80] to-[#e0d7ff] bg-clip-text text-transparent">Your Path to University</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-10">
              Centralized university applications across SADC and beyond. We match your results to degree requirements and streamline your application process, all from the Prysm web and mobile platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button disabled className="bg-blue-400/20 text-blue-400 px-8 py-4 rounded-xl font-bold text-base inline-block text-center cursor-not-allowed opacity-50">
                <span>Coming in Future Phase</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <AnimatedCard delay={0.1}>
            <Card className="academy-card border-l-4 border-l-blue-400 p-6 sm:p-8 h-full">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <i className="fa-solid fa-search text-blue-400 text-2xl sm:text-3xl feature-icon"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Smart Matching</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Our AI analyzes your academic results and matches you with universities and programs that align with your performance, interests, and career goals across SADC and international institutions.
              </p>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <Card className="academy-card border-l-4 border-l-blue-400 p-6 sm:p-8 h-full">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <i className="fa-solid fa-file-alt text-blue-400 text-2xl sm:text-3xl feature-icon"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Streamlined Applications</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Apply to multiple universities from one platform. Auto-fill application forms, track deadlines, and manage all your university applications in one place.
              </p>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.3}>
            <Card className="academy-card border-l-4 border-l-blue-400 p-6 sm:p-8 h-full">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <i className="fa-solid fa-mobile-screen-button text-blue-400 text-2xl sm:text-3xl feature-icon"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Access Anywhere</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Manage your university applications from the Prysm web app or mobile app. Get notifications about deadlines, application status updates, and important reminders.
              </p>
            </Card>
          </AnimatedCard>
        </div>

        <div className="text-center">
          <Link href="/tools" className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:gap-3 transition-all">
            <i className="fa-solid fa-arrow-left"></i>
            Back to Tools
          </Link>
        </div>
      </section>
    </div>
  );
}

