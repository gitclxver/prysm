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

export default function PrintPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center mb-16 sm:mb-20">
          <div className="relative order-2 lg:order-1">
            <Card className="p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute -inset-4 bg-purple-400/10 blur-2xl rounded-full"></div>
              <div className="relative bg-[#120d2b] rounded-2xl p-6 border border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-purple-400/80"></div>
                  </div>
                  <div className="px-3 py-1 bg-purple-400/10 rounded-full border border-purple-400/30">
                    <span className="text-[10px] text-purple-400 font-bold uppercase">Print Preview</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-400/20 flex items-center justify-center">
                        <i className="fa-solid fa-book text-purple-400 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Study Guide</p>
                        <p className="text-sm font-bold text-white">NSSCO Biology Summary</p>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 mb-2">
                      <div className="h-32 bg-gradient-to-br from-purple-400/20 to-purple-600/10 rounded flex items-center justify-center">
                        <i className="fa-solid fa-file-pdf text-purple-400 text-3xl"></i>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Pages: 24</span>
                      <span className="text-purple-400 font-bold">Ready to Print</span>
                    </div>
                  </div>
                  <div className="bg-purple-400/10 rounded-xl p-4 border border-purple-400/20">
                    <p className="text-xs font-bold text-purple-400 uppercase mb-2">Print Options</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <i className="fa-solid fa-check-circle text-purple-400"></i>
                        <span>Premium paper quality</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <i className="fa-solid fa-check-circle text-purple-400"></i>
                        <span>Spiral binding included</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <Badge variant="purple" className="mb-6">
              Coming Soon
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">
              Prysm <span className="bg-gradient-to-r from-[#d4ff80] to-[#e0d7ff] bg-clip-text text-transparent">Print</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-10">
              Transform your digital notes and AI-generated summaries into premium physical study guides. Get professionally printed materials delivered to your door, perfect for offline studying.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-purple-400 text-[#120d2b] px-8 py-4 rounded-xl font-bold text-base inline-block text-center hover:shadow-[0_0_40px_rgba(192,132,252,0.5)] hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <span className="relative z-10">Order Study Guides</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <AnimatedCard delay={0.1}>
            <Card className="academy-card border-l-4 border-l-purple-400 p-6 sm:p-8 h-full">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <i className="fa-solid fa-file-pdf text-purple-400 text-2xl sm:text-3xl feature-icon"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI-Generated Summaries</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Convert your digital notes into beautifully formatted PDF study guides. Our AI organizes content, highlights key points, and creates exam-focused summaries.
              </p>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <Card className="academy-card border-l-4 border-l-purple-400 p-6 sm:p-8 h-full">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <i className="fa-solid fa-truck text-purple-400 text-2xl sm:text-3xl feature-icon"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Premium Delivery</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Get professionally printed materials with premium paper quality, spiral binding, and protective covers. Delivered directly to your address across SADC.
              </p>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.3}>
            <Card className="academy-card border-l-4 border-l-purple-400 p-6 sm:p-8 h-full">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <i className="fa-solid fa-mobile-screen-button text-purple-400 text-2xl sm:text-3xl feature-icon"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Order from Anywhere</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Place orders directly from the Prysm web app or mobile app. Track your order status, receive delivery updates, and manage your print history all in one place.
              </p>
            </Card>
          </AnimatedCard>
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

