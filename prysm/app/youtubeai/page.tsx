'use client';

import { Navigation } from '@/components/Navigation';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import Link from 'next/link';

export default function YouTubeAIPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center mb-12 sm:mb-16">
          <div className="relative order-2 lg:order-1">
            <Card className="p-8 relative overflow-hidden">
              <div className="absolute -inset-4 bg-orange-400/10 blur-2xl rounded-full"></div>
              <div className="relative bg-[#120d2b] rounded-2xl p-6 border border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-lime-400/80"></div>
                  </div>
                  <div className="px-3 py-1 bg-orange-400/10 rounded-full border border-orange-400/30">
                    <span className="text-[10px] text-orange-400 font-bold uppercase">AI Processing</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-400/20 flex items-center justify-center">
                        <i className="fa-brands fa-youtube text-orange-400"></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400">Biology Tutorial</p>
                        <p className="text-sm font-bold text-white">Enzymes Explained</p>
                      </div>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-orange-400/30 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-xs text-gray-400">Processing transcript... 75%</p>
                  </div>
                  <div className="bg-orange-400/10 rounded-xl p-4 border border-orange-400/20">
                    <p className="text-xs font-bold text-orange-400 uppercase mb-2">AI Summary Ready</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-check text-orange-400 text-xs"></i>
                        <span className="text-xs text-white">Transcript Generated</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-check text-orange-400 text-xs"></i>
                        <span className="text-xs text-white">Key Points Extracted</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <Badge variant="purple" className="mb-6">
              Coming Phase 2
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">YouTube AI Intelligence</h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-10">
              Transform any YouTube video into study notes instantly. Get
              transcripts, translations, and AI-powered summaries in seconds.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <Card className="academy-card border-l-4 border-l-orange-400 p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-file-text text-orange-400 text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Instant Transcripts</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Paste any YouTube URL and get a complete transcript in seconds. No
              more rewinding to catch important points.
            </p>
          </Card>

          <Card className="academy-card border-l-4 border-l-orange-400 p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-language text-orange-400 text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Multi-Language Translation</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Translate transcripts into your preferred language. Perfect for
              studying content in multiple languages or improving comprehension.
            </p>
          </Card>

          <Card className="academy-card border-l-4 border-l-orange-400 p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-sparkles text-orange-400 text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI Summaries</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Get intelligent summaries highlighting key points, concepts, and
              important information. Save hours of note-taking time.
            </p>
          </Card>

          <Card className="academy-card border-l-4 border-l-orange-400 p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-download text-orange-400 text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Export to Notes</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Seamlessly export transcripts and summaries to your Prysm notes.
              Link videos to syllabus topics for easy reference.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/tools" className="inline-flex items-center gap-2 text-orange-400 font-semibold hover:gap-3 transition-all">
            <i className="fa-solid fa-arrow-left"></i>
            Back to Tools
          </Link>
        </div>
      </section>
    </div>
  );
}

