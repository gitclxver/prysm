'use client';

import { Navigation } from '@/components/Navigation';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import Link from 'next/link';

export default function ExamHubPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center mb-12 sm:mb-16">
          <div className="relative order-2 lg:order-1">
            <Card className="p-8 relative overflow-hidden">
              <div className="absolute -inset-4 bg-[var(--lime)]/10 blur-2xl rounded-full"></div>
              <div className="relative bg-[var(--prysm-bg)] rounded-2xl p-6 border border-[var(--border-color)]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-[var(--lime)]/80"></div>
                  </div>
                  <div className="px-3 py-1 bg-[var(--lime)]/10 rounded-full border border-[var(--lime)]/30">
                    <span className="text-[10px] text-[var(--lime)] font-bold uppercase">AI Analysis</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[var(--bg-overlay)] rounded-xl p-4 border border-[var(--border-color)]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[var(--lime)]/20 flex items-center justify-center">
                        <i className="fa-solid fa-file-invoice text-[var(--lime)] text-sm"></i>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-secondary)]">NSSCO Biology 2024</p>
                        <p className="text-sm font-bold text-[var(--text-primary)]">Paper 2</p>
                      </div>
                    </div>
                    <div className="h-2 bg-[var(--bg-overlay)] rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-[var(--lime)]/30 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">Scanning... 85%</p>
                  </div>
                  <div className="bg-[var(--lime)]/10 rounded-xl p-4 border border-[var(--lime)]/20">
                    <p className="text-xs font-bold text-[var(--lime)] uppercase mb-2">Top Topics</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--text-primary)]">Enzymes</span>
                        <span className="text-xs text-[var(--lime)] font-bold">92%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--text-primary)]">Nutrition</span>
                        <span className="text-xs text-[var(--lime)] font-bold">88%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <Badge variant="purple" className="mb-6">
              Phase 1 Feature
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">Exam Hub</h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8 sm:mb-10">
              Access thousands of past papers from Namibia (NSSCO), South Africa (CAPS & IEB), Eswatini (EGCSE), IGCSE, Zimbabwe (ZIMSEC), and Botswana (BGCSE). AI-powered
              insights help you identify the most frequently asked questions and
              trending topics.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <Card className="academy-card border-l-4 border-l-[var(--lime)] p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[var(--lime)]/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-database text-[var(--lime)] text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">42,000+ Past Papers</h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Comprehensive database covering NSSCO (Namibia), CAPS & IEB (South Africa), and EGCSE (Eswatini). Find papers by subject, year, and exam
              board.
            </p>
          </Card>

          <Card className="academy-card border-l-4 border-l-[var(--lime)] p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[var(--lime)]/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-brain text-[var(--lime)] text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI-Powered Insights</h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Our AI analyzes patterns across thousands of papers to identify the
              most frequently tested topics and predict likely exam questions.
            </p>
          </Card>

          <Card className="academy-card border-l-4 border-l-[var(--lime)] p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[var(--lime)]/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-upload text-[var(--lime)] text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Community Uploads</h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Contribute to the community by uploading exam papers. All
              submissions are verified before being added to our database.
            </p>
          </Card>

          <Card className="academy-card border-l-4 border-l-[var(--lime)] p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[var(--lime)]/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-filter text-[var(--lime)] text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Smart Filtering</h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Filter by subject, year, exam board, paper number, and more. Find
              exactly what you need in seconds.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/tools" className="inline-flex items-center gap-2 text-[var(--lime)] font-semibold hover:gap-3 transition-all">
            <i className="fa-solid fa-arrow-left"></i>
            Back to Tools
          </Link>
        </div>
      </section>
    </div>
  );
}

