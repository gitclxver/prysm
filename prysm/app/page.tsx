'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { AnimatedCard } from '@/components/AnimatedCard';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const { user, userProfile } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  useEffect(() => {
    // Smooth scroll with offset for sticky header
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#' && href !== '#top') {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <header id="top" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-32 relative">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 hidden lg:block">
          <Badge variant="purple">
            <i className="fa-solid fa-sparkles mr-2"></i>
            Launching February 2026
          </Badge>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-8 lg:hidden"
        >
          <Badge variant="purple" className="mb-6">
            <i className="fa-solid fa-sparkles mr-2"></i>
            Launching February 2026
          </Badge>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="text-center lg:text-left relative z-10"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-[1.1]">
              Save Your Semester.<br />
              <span className="text-lime-400">Escape the Prysm.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              The education assistant that centralizes your notes, exam papers, and
              schedule into one intelligent ecosystem. Harnessing the power of AI to
              build a brighter future for SADC students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12 justify-center lg:justify-start">
              {user ? (
                <Link href="/dashboard">
                  <Button variant="primary" className="px-8 py-4 text-base">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <a
                  href="https://forms.gle/aSoACEDfygW3aap2A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-lime-400 text-[#120d2b] px-8 py-4 rounded-xl font-bold text-base inline-block text-center hover:shadow-[0_0_40px_rgba(212,255,128,0.5)] hover:scale-105 transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10">Take the Survey</span>
                </a>
              )}
              <a
                href="#features"
                className="px-8 py-4 rounded-xl font-bold text-base border-2 border-white/10 hover:border-lime-400/50 hover:bg-white/5 transition-all duration-300 inline-flex items-center justify-center"
              >
                Explore Features
                <i className="fa-solid fa-arrow-down ml-2 text-lime-400"></i>
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-lime-400/10 flex items-center justify-center border border-lime-400/20">
                  <i className="fa-solid fa-rocket text-lime-400 text-xl"></i>
                </div>
                <div className="text-sm">
                  <p className="font-bold text-white text-base">
                    Launching February 2026
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    <i className="fa-solid fa-users text-lime-400 mr-1"></i>
                    Join our waitlist for early access
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -inset-6 bg-lime-400/20 blur-3xl rounded-full"
            ></motion.div>
            <Card className="relative p-4 sm:p-5">
              <div className="bg-[#120d2b] rounded-2xl p-8 border border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-lime-400/80"></div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-lime-400/10 rounded-full border border-lime-400/30">
                    <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></div>
                    <span className="text-[10px] text-lime-400 font-bold uppercase tracking-widest">
                      Live AI Analysis
                    </span>
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="h-14 w-full bg-white/5 rounded-xl border border-white/5 flex items-center px-5 gap-4 hover:bg-white/8 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-lime-400/20 flex items-center justify-center">
                      <i className="fa-solid fa-magnifying-glass text-lime-400 text-sm"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 font-medium">Scanning Exam Paper</p>
                      <p className="text-sm text-white font-semibold">NSSCO Biology Paper 2 - 2024</p>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-1 h-4 bg-lime-400 rounded-full animate-pulse"></div>
                      <div className="w-1 h-4 bg-lime-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1 h-4 bg-lime-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-lime-400/10 to-lime-400/5 rounded-xl border border-lime-400/30 shadow-lg shadow-lime-400/10">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="fa-solid fa-brain text-lime-400"></i>
                      <p className="text-xs font-bold text-lime-400 uppercase tracking-widest">
                        AI Prediction
                      </p>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed font-medium">
                      <span className="text-lime-400 font-bold">&quot;Enzymes and Nutrition&quot;</span>
                      {' '}has appeared in{' '}
                      <span className="font-bold">4 consecutive</span> IEB final exams
                      with a 92% probability of reappearing.
                    </p>
                    <div className="mt-4 pt-4 border-t border-lime-400/20 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-chart-line text-lime-400 text-xs"></i>
                        <span className="text-xs text-gray-400">Trending Topic</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-clock text-lime-400 text-xs"></i>
                        <span className="text-xs text-gray-400">Most Frequent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-6">
            <Badge variant="purple">
              <i className="fa-solid fa-sparkles mr-2"></i>
              Launching February 2026
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6">
            Why <span className="bg-gradient-to-r from-[#d4ff80] to-[#e0d7ff] bg-clip-text text-transparent">Prysm?</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Why thousands of SADC students are making the switch. We understand
            your curriculum because we built this for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { 
                icon: 'fa-map', 
                title: 'Complete Syllabus Coverage', 
                desc: 'Access all syllabuses in one place: NSSCO (Namibia), CAPS & IEB (South Africa), and EGCSE (Eswatini). No more switching between different platforms.',
                highlight: 'All in One'
              },
              { 
                icon: 'fa-brain', 
                title: 'AI-Powered Exam Intelligence', 
                desc: 'Our AI analyzes thousands of past papers to identify the most frequently asked questions and trending topics. Focus your study time where it matters most.',
                highlight: 'Smart Insights'
              },
              { 
                icon: 'fa-calendar-check', 
                title: 'Automated Study Planning', 
                desc: 'Never miss an exam deadline. Our smart planner automatically fetches exam dates from your syllabus and builds an optimized study schedule tailored to you.',
                highlight: 'Auto-Sync'
              },
              { 
                icon: 'fa-note-sticky', 
                title: 'Infinite Visual Canvas', 
                desc: 'Sketch diagrams, annotate materials, and organize everything in one infinite canvas. Link notes directly to syllabus chapters for seamless organization.',
                highlight: 'Unlimited Space'
              },
              { 
                icon: 'fa-fire', 
                title: 'Gamified Progress Tracking', 
                desc: 'Build consistent study habits with 24-hour streaks that automatically pause during holidays. Track your progress and celebrate your achievements.',
                highlight: 'Stay Motivated'
              },
              { 
                icon: 'fa-youtube', 
                title: 'Instant Video Intelligence', 
                desc: 'Transform any YouTube video into structured study notes. Get instant transcripts, AI summaries, and translations in seconds.',
                highlight: 'Save Time'
              },
              { 
                icon: 'fa-globe-africa', 
                title: 'Built for SADC Students', 
                desc: 'Every feature is designed specifically for Southern African curricula. We understand your marking rubrics, exam formats, and educational context.',
                highlight: 'Local Expertise'
              },
              { 
                icon: 'fa-cloud', 
                title: 'Universal Access', 
                desc: 'Access your notes, schedules, and exam papers from any device, anywhere. Everything syncs automatically to the cloud.',
                highlight: 'Always Available'
              },
              { 
                icon: 'fa-shield-check', 
                title: 'Free Core Features', 
                desc: 'Essential tools are free forever. We believe premium education shouldn\'t come with premium price tags for core functionality.',
                highlight: 'Free Forever'
              },
            ].map((feature, idx) => (
              <AnimatedCard key={idx} delay={idx * 0.1} className="academy-card border-l-4 border-l-lime-400">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-lime-400/10 rounded-xl flex items-center justify-center text-lime-400">
                    <i className={`fa-solid ${feature.icon} text-xl sm:text-2xl feature-icon`}></i>
                  </div>
                  <Badge variant="lime" className="text-xs">
                    {feature.highlight}
                  </Badge>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold mb-3 text-white">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{feature.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Smart Note Taking Section */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="drawing-canvas w-full aspect-video rounded-3xl p-8 shadow-inner relative bg-[#1a0f33]">
            <div className="flex gap-2 mb-8">
              <div className="w-6 h-6 rounded-full bg-lime-400 shadow-lg shadow-lime-400/30 cursor-pointer hover:scale-110 transition-transform"></div>
              <div className="w-6 h-6 rounded-full bg-purple-400 shadow-lg shadow-purple-400/30 cursor-pointer hover:scale-110 transition-transform"></div>
              <div className="w-6 h-6 rounded-full border-2 border-white/30 cursor-pointer hover:border-white/60 transition-colors"></div>
            </div>
            <div className="sketch-line top-24 left-24"></div>
            <div className="sketch-line top-32 left-40 opacity-40" style={{ animationDelay: '1s' }}></div>
            <div className="absolute border border-white/10 rounded-xl p-4 top-10 right-10 rotate-3 bg-[#1d163d]/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <i className="fa-solid fa-sparkles text-lime-400 text-xs"></i>
                <p className="text-[10px] font-bold text-lime-400 uppercase tracking-wider">
                  Interactive Canvas
                </p>
              </div>
              <p className="text-xs text-gray-300 font-medium">
                Phase 1 Drawing Board
              </p>
            </div>
            <div className="absolute bottom-10 right-10 flex gap-3">
              <div className="h-12 w-12 bg-[#1d163d] flex items-center justify-center rounded-xl text-lime-400 border-2 border-lime-400/40 hover:border-lime-400 cursor-pointer shadow-lg shadow-lime-400/20">
                <i className="fa-solid fa-pencil text-sm"></i>
              </div>
              <div className="h-12 w-12 bg-[#1d163d] flex items-center justify-center rounded-xl text-gray-400 hover:text-white cursor-pointer border border-white/10">
                <i className="fa-solid fa-shapes text-sm"></i>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-lime-400 to-lime-300 text-black px-5 py-2 rounded-full text-xs font-black uppercase tracking-tighter shadow-xl shadow-lime-400/30">
            <i className="fa-solid fa-star mr-1"></i>New: Drawing Board
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Badge variant="purple">
                Smart Note Taking
              </Badge>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
            Visual Notes for <span className="text-[#e0d7ff]">Visual Learners.</span>
          </h2>
          <p className="text-lg text-gray-300 mb-10 leading-relaxed">
            Prysm Phase 1 introduces our <strong>Smart Drawing Board</strong>.
            Sketch diagrams, annotate study materials, link notes to syllabus
            chapters, and organize everything in one place. Works seamlessly on your phone, tablet, and computer. Collaboration features
            coming in Phase 3 for group projects.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Card className="p-5 border border-white/5 hover:border-lime-400/30">
              <div className="w-10 h-10 rounded-lg bg-lime-400/10 flex items-center justify-center mb-3">
                <i className="fa-solid fa-layer-group text-lime-400 text-lg"></i>
              </div>
              <p className="text-sm font-bold text-white mb-1">Infinite Canvas</p>
              <p className="text-xs text-gray-400">Unlimited drawing space</p>
            </Card>
            <Card className="p-5 border border-white/5 hover:border-lime-400/30">
              <div className="w-10 h-10 rounded-lg bg-lime-400/10 flex items-center justify-center mb-3">
                <i className="fa-solid fa-cloud-arrow-up text-lime-400 text-lg"></i>
              </div>
              <p className="text-sm font-bold text-white mb-1">Cloud Sync</p>
              <p className="text-xs text-gray-400">Access anywhere, anytime</p>
            </Card>
            <Card className="p-5 border border-white/5 hover:border-lime-400/30">
              <div className="w-10 h-10 rounded-lg bg-lime-400/10 flex items-center justify-center mb-3">
                <i className="fa-solid fa-mobile-screen-button text-lime-400 text-lg"></i>
              </div>
              <p className="text-sm font-bold text-white mb-1">Mobile & Tablet</p>
              <p className="text-xs text-gray-400">Works on all devices</p>
            </Card>
            <Card className="p-5 border border-white/5 hover:border-lime-400/30">
              <div className="w-10 h-10 rounded-lg bg-lime-400/10 flex items-center justify-center mb-3">
                <i className="fa-solid fa-laptop text-lime-400 text-lg"></i>
              </div>
              <p className="text-sm font-bold text-white mb-1">Web & Desktop</p>
              <p className="text-xs text-gray-400">Full-featured on all platforms</p>
            </Card>
          </div>
          <Link
            href="/canvas"
            className="inline-flex items-center gap-2 text-lime-400 font-semibold hover:gap-3 transition-all duration-300"
          >
            Learn More About Note Taking
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </section>

      {/* Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-6">
            <Badge variant="purple">
              Phase 1 Features
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6">
            Everything You Need to <span className="bg-gradient-to-r from-[#d4ff80] to-[#e0d7ff] bg-clip-text text-transparent">Succeed</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            The core modules available at launch. Built to centralize your entire
            academic journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <AnimatedCard delay={0.1} className="academy-card border-l-4 border-l-lime-400" id="exams">
            <div className="w-14 h-14 bg-lime-400/10 rounded-xl flex items-center justify-center text-lime-400 mb-6">
              <i className="fa-solid fa-file-invoice text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Exam Hub</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Access thousands of past papers from Namibia (NSSCO), South Africa (CAPS & IEB), Eswatini (EGCSE), IGCSE, Zimbabwe (ZIMSEC), and Botswana (BGCSE). AI identifies most frequently asked questions and trending topics.
            </p>
            <Link href="/examhub" className="text-lime-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Explore Exam Hub
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>

          <AnimatedCard delay={0.2} className="academy-card border-l-4 border-l-purple-400">
            <div className="w-14 h-14 bg-purple-400/10 rounded-xl flex items-center justify-center text-purple-400 mb-6">
              <i className="fa-solid fa-calendar-check text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Auto-Planner</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Input your subjects and available study hours. Prysm automatically fetches exam dates from your syllabus and builds an optimized study schedule with smart recommendations.
            </p>
            <Link href="/autoplanner" className="text-purple-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Plan Your Schedule
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>

          <AnimatedCard delay={0.3} className="academy-card border-l-4 border-l-blue-400">
            <div className="w-14 h-14 bg-blue-400/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
              <i className="fa-solid fa-pen-nib text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Drawing Board</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Smart drawing board with infinite canvas. Sketch diagrams, annotate study materials, and link notes to syllabus chapters. Cloud sync included.
            </p>
            <Link href="/canvas" className="text-blue-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Start Drawing
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>

          <AnimatedCard delay={0.4} className="academy-card border-l-4 border-l-orange-400">
            <div className="w-14 h-14 bg-orange-400/10 rounded-xl flex items-center justify-center text-orange-400 mb-6">
              <i className="fa-brands fa-youtube text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">YouTube AI</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Paste any YouTube link and get instant transcripts, AI-powered summaries, and translations. Never miss a key point from your study videos again.
            </p>
            <Link href="/youtubeai" className="text-orange-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Try YouTube AI
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>
        </div>
      </section>

      {/* Parents Section */}
      <section id="parents" className="bg-white/5 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <Card className="rounded-3xl p-8 border border-white/10 relative overflow-hidden bg-[#1d163d]">
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
          <div className="order-1 lg:order-2">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <Badge variant="purple">
                  Coming Phase 3
                </Badge>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 leading-tight">
              Peace of mind for <span className="text-[#e0d7ff]">Parents.</span>
            </h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed">
              Stay connected with your child's academic journey. Monitor study
              time, track progress, and receive insights to support their success.
            </p>
            <Link
              href="/parenthub"
              className="bg-[#1d163d] px-8 py-4 rounded-xl font-bold border border-white/10 hover:border-lime-400/50 hover:bg-white/5 transition-all inline-flex items-center gap-3"
            >
              <span>Explore Parent Dashboard</span>
              <i className="fa-solid fa-arrow-right text-lime-400"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-6">
            <Badge variant="purple">
              Additional Services
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6">
            More Ways to <span className="bg-gradient-to-r from-[#d4ff80] to-[#e0d7ff] bg-clip-text text-transparent">Succeed</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Access Prysm from any device - web browser or mobile app. Integrated services to support every step of your academic journey.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatedCard delay={0.1} className="academy-card border-l-4 border-l-lime-400 border-t border-r border-b border-white/5 p-8 rounded-2xl bg-[#1d163d]">
            <div className="w-14 h-14 bg-lime-400/10 rounded-xl flex items-center justify-center text-lime-400 mb-6">
              <i className="fa-solid fa-user-graduate text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Prysm Tutors</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Book 1-on-1 sessions with top-tier university students who mastered
              the exact curriculum you're studying now. Get personalized help from
              tutors who understand your syllabus.
            </p>
            <Link href="/tutors" className="text-lime-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Explore Tutors
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>

          <AnimatedCard delay={0.2} className="academy-card border-l-4 border-l-purple-400 border-t border-r border-b border-white/5 p-8 rounded-2xl bg-[#1d163d]">
            <div className="w-14 h-14 bg-purple-400/10 rounded-xl flex items-center justify-center text-purple-400 mb-6">
              <i className="fa-solid fa-book-open text-2xl feature-icon"></i>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-bold text-white">Prysm Print</h3>
              <Badge variant="purple" className="text-xs">Coming Soon</Badge>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Transform your digital notes and AI-generated summaries into premium
              physical study guides. Get professionally printed materials
              delivered to your door.
            </p>
            <Link href="/print" className="text-purple-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Learn More
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>

          <AnimatedCard delay={0.3} className="academy-card border-l-4 border-l-blue-400 border-t border-r border-b border-white/5 p-8 rounded-2xl bg-[#1d163d]">
            <div className="w-14 h-14 bg-blue-400/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
              <i className="fa-solid fa-paper-plane text-2xl feature-icon"></i>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-bold text-white">Uni-Link</h3>
              <Badge variant="purple" className="text-xs">Future Phase</Badge>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Centralized university applications across SADC and beyond. We match
              your results to degree requirements and streamline your application
              process.
            </p>
            <Link href="/unilink" className="text-blue-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Learn More
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>
        </div>
      </section>

      {/* SADC Specialized Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <Card className="academy-card p-8 sm:p-12 rounded-[3rem] bg-gradient-to-br from-[#1d163d] to-[#120d2b] overflow-hidden relative">
          <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 opacity-5 hidden lg:block">
            <i className="fa-solid fa-earth-africa text-[400px]"></i>
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <Badge variant="purple">
                    Built for SADC
                  </Badge>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 italic">
                SADC <span className="bg-gradient-to-r from-[#d4ff80] to-[#e0d7ff] bg-clip-text text-transparent">Specialized.</span>
              </h2>
              <p className="text-lg text-gray-300 mb-10 leading-relaxed">
                Unlike global tools, Prysm is built from the ground up to
                understand the specific marking rubrics, exam formats, and
                syllabus requirements of Namibia, South Africa, and Eswatini. We speak your
                curriculum's language.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { country: 'Namibia', syllabus: 'NSSCO' },
                  { country: 'South Africa', syllabus: 'CAPS & IEB' },
                  { country: 'Eswatini', syllabus: 'EGCSE' },
                  { country: 'International', syllabus: 'IGCSE' },
                  { country: 'Zimbabwe', syllabus: 'ZIMSEC' },
                  { country: 'Botswana', syllabus: 'BGCSE' }
                ].map((item) => (
                  <div key={`${item.country}-${item.syllabus}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-lime-400/10 flex items-center justify-center">
                      <i className="fa-solid fa-circle-check text-lime-400 text-sm"></i>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white block">{item.country}</span>
                      <span className="text-xs text-gray-400">{item.syllabus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <p className="text-xs font-bold text-lime-400 uppercase tracking-widest mb-4">
                Live Database Status
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-sm">Past Exam Papers</span>
                  <span className="font-bold">42,000+</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-sm">Subject Guides</span>
                  <span className="font-bold">1,200+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Study Hubs</span>
                  <span className="font-bold text-lime-400">Live in 8 Countries</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-6">
            <Badge variant="purple">
              Got Questions?
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6">
            Frequently Asked <span className="bg-gradient-to-r from-[#d4ff80] to-[#e0d7ff] bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about Prysm and how it can transform your
            academic journey.
          </p>
        </motion.div>
        <div className="space-y-4">
          {[
            {
              q: 'Is Prysm free for students?',
              a: 'The core OS features (Smart Timetabling, Drawing Board, and Note Taking) are completely free forever. Advanced AI-powered exam predictions, detailed analytics, and priority Hub access are available with our premium membership. Free users still get access to thousands of exam papers and basic study tools.'
            },
            {
              q: 'Does it work for my specific subjects?',
              a: 'Absolutely! We cover all major Science, Humanities, and Commerce subjects for NSSCO, CAPS, IEB, EGCSE, ECZ, ZIMSEC, BGCSE, and LGCSE curricula. This includes localized content for History, Literature, and regional studies. Our database grows with contributions from students and educators across the SADC region.'
            },
            {
              q: 'When will Prysm be available?',
              a: 'Prysm launches in February 2026. Join our waitlist now to get early access, exclusive updates, and be among the first to experience the future of SADC education. Early registrants will receive priority access and special launch incentives.'
            },
            {
              q: 'How does the AI Exam Hub work?',
              a: 'Our AI analyzes thousands of past exam papers to identify patterns, frequently asked questions, and trending topics specific to your syllabus. Simply select your subject and exam level, and get instant insights into what topics are most likely to appear, complete with AI explanations and study recommendations.'
            },
            {
              q: 'What devices can I use Prysm on?',
              a: 'Prysm Phase 1 is available on web browsers. Our mobile app for iOS and Android will be available in Phase 3, bringing Focus Mode, study streaks, and notifications to your phone.'
            },
            {
              q: 'Can parents access my account?',
              a: 'Parent access is optional and controlled by you. In Phase 3, you can invite your parents to view your progress dashboard, which shows study time, subject progress, and upcoming exams. You maintain full control over what information is shared.'
            },
            {
              q: 'How accurate are the AI exam predictions?',
              a: 'Our AI predictions are based on analysis of thousands of past papers and have shown high accuracy in identifying frequently tested topics. However, we always recommend comprehensive study rather than relying solely on predictions. Use our AI insights to prioritize your revision, not replace thorough preparation.'
            },
            {
              q: 'Can I upload my own exam papers?',
              a: 'Yes! Our public upload feature allows students and educators to contribute exam papers to the community. All uploads are verified before being added to the database. Contributing quality content helps everyone in the SADC region access better study resources.'
            }
          ].map((faq, idx) => (
            <Card
              key={idx}
              className={`academy-card p-6 rounded-2xl cursor-pointer faq-item group transition-all duration-300 border border-white/5 ${
                openFaq === idx ? 'active' : ''
              }`}
              onClick={() => toggleFaq(idx)}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-white text-lg group-hover:text-lime-400 transition-colors">
                  {faq.q}
                </h4>
                <i className="fa-solid fa-plus text-lime-400 text-lg faq-icon transition-transform duration-300"></i>
              </div>
              <div className="faq-answer">
                <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <Card className="p-8 sm:p-12 lg:p-16 rounded-3xl text-center relative overflow-hidden border-2 border-lime-400/20">
          <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-transparent opacity-50"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <Badge variant="purple">
                Launching February 2026
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
              Ready to <span className="bg-gradient-to-r from-[#d4ff80] to-[#e0d7ff] bg-clip-text text-transparent">Save Your Semester?</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of SADC students who are already on the waitlist. Be
              the first to experience the future of education. Sign up now to get early access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/login"
                className="bg-lime-400 text-[#120d2b] px-10 py-4 rounded-xl font-bold text-lg inline-block text-center hover:shadow-[0_0_40px_rgba(212,255,128,0.5)] hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">Sign Up Now</span>
              </Link>
              <a
                href="https://forms.gle/aSoACEDfygW3aap2A"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 rounded-xl font-bold text-lg border-2 border-white/20 hover:border-lime-400/50 hover:bg-white/5 transition-all duration-300 inline-flex items-center justify-center"
              >
                Take the Survey
                <i className="fa-solid fa-arrow-up-right ml-2 text-lime-400"></i>
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-8">
              <i className="fa-solid fa-shield-check text-lime-400 mr-2"></i>
              Free forever for core features • No credit card required
            </p>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.png"
                alt="Prysm Logo"
                className="h-8 w-8"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div
                className="w-8 h-8 bg-gradient-to-br from-lime-400 to-lime-300 rounded-lg flex items-center justify-center shadow-lg shadow-lime-400/30"
                style={{ display: 'none' }}
              >
                <span className="text-[#120d2b] text-sm font-black">P</span>
              </div>
              <span className="font-extrabold tracking-tight text-white uppercase text-xl">
                Prysm
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              The Ultimate Student OS. Centralizing education for SADC students.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4">Product</h5>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-lime-400 transition-colors">Features</a></li>
              <li><a href="#exams" className="hover:text-lime-400 transition-colors">Exam Hub</a></li>
              <li><a href="#tools" className="hover:text-lime-400 transition-colors">Study Tools</a></li>
              <li><a href="#parents" className="hover:text-lime-400 transition-colors">For Parents</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4">Company</h5>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-lime-400 transition-colors">About</Link></li>
              <li><a href="#" className="hover:text-lime-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-lime-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-lime-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4">Contact</h5>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-envelope text-lime-400"></i>
                <a href="mailto:support@prysmlearn.com" className="hover:text-lime-400 transition-colors">
                  support@prysmlearn.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-lime-400"></i>
                <a href="tel:+264814989258" className="hover:text-lime-400 transition-colors">
                  +264 81 498 9258
                </a>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-location-dot text-lime-400 mt-1"></i>
                <span>Windhoek, Namibia</span>
              </li>
            </ul>
            <div className="flex gap-4 text-xl text-gray-400 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-lime-400/10 hover:text-lime-400 transition-all"
              >
                <i className="fa-brands fa-discord"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-lime-400/10 hover:text-lime-400 transition-all"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-lime-400/10 hover:text-lime-400 transition-all"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5 text-sm text-gray-500">
          <p>© 2025 Prysm Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-lime-400 transition-colors">
              Privacy Policy
            </Link>
            <a href="#" className="hover:text-lime-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
