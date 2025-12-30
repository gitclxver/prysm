'use client';

import { Navigation } from '@/components/Navigation';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import Link from 'next/link';

export default function CanvasPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center mb-12 sm:mb-16">
          <div className="relative order-2 lg:order-1">
            <div className="w-full aspect-video rounded-3xl p-8 shadow-inner bg-black/20 relative border-2 border-dashed border-blue-400/20">
              <div className="flex gap-2 mb-6">
                <div className="w-6 h-6 rounded-full bg-blue-400 shadow-lg shadow-blue-400/30"></div>
                <div className="w-6 h-6 rounded-full bg-purple-400"></div>
                <div className="w-6 h-6 rounded-full border-2 border-white/30"></div>
              </div>
              <div className="absolute top-24 left-24">
                <div className="w-32 h-1 bg-blue-400 rounded-full transform rotate-[-15deg] shadow-lg shadow-blue-400/50"></div>
              </div>
              <div className="absolute top-32 left-40 opacity-60">
                <div className="w-40 h-1 bg-blue-400 rounded-full transform rotate-[-15deg]"></div>
              </div>
              <div className="absolute top-10 right-10 border border-white/10 rounded-xl p-3 bg-[#1d163d]/80 backdrop-blur-sm rotate-3">
                <p className="text-[10px] font-bold text-blue-400 uppercase">Canvas</p>
                <p className="text-xs text-gray-300">Infinite Space</p>
              </div>
              <div className="absolute bottom-10 right-10 flex gap-2">
                <div className="h-10 w-10 bg-white/5 rounded-lg flex items-center justify-center border border-blue-400/30 text-blue-400">
                  <i className="fa-solid fa-pencil text-sm"></i>
                </div>
                <div className="h-10 w-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400">
                  <i className="fa-solid fa-shapes text-sm"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <Badge variant="purple" className="mb-6">
              Phase 1 Feature
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">Smart Drawing Board</h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-10">
              Visual notes for visual learners. Sketch diagrams, annotate study
              materials, and organize everything in one infinite canvas with cloud
              sync.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <Card className="academy-card border-l-4 border-l-blue-400 p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-layer-group text-blue-400 text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Infinite Canvas</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Unlimited drawing space to create complex diagrams, mind maps, and
              visual notes. Zoom, pan, and organize your ideas without limits.
            </p>
          </Card>

          <Card className="academy-card border-l-4 border-l-blue-400 p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-cloud-arrow-up text-blue-400 text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Cloud Sync</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Access your drawings from any device, anywhere. All your visual
              notes are automatically synced and backed up in the cloud.
            </p>
          </Card>

          <Card className="academy-card border-l-4 border-l-blue-400 p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-link text-blue-400 text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Link to Syllabus</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Connect your drawings directly to syllabus chapters and topics.
              Organize your visual notes by subject and curriculum area.
            </p>
          </Card>

          <Card className="academy-card border-l-4 border-l-blue-400 p-6 sm:p-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-400/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <i className="fa-solid fa-users text-blue-400 text-2xl sm:text-3xl feature-icon"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Collaboration (Coming)</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Phase 3 will introduce real-time collaboration for group projects.
              Work together on diagrams and study materials with your classmates.
            </p>
          </Card>
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

