"use client";

import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { motion } from "framer-motion";

export default function FeaturesPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="flex justify-center mb-4 sm:mb-6">
            <Badge variant="purple">
              <i className="fa-solid fa-sparkles mr-2"></i>
              Launching February 2026
            </Badge>
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 lg:mb-6 leading-[1.1] break-words px-2">
            Why{" "}
            <span className="bg-gradient-to-r from-[var(--lime)] to-[var(--lavender)] bg-clip-text text-transparent">
              Prysm?
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto px-4 sm:px-0">
            Why thousands of SADC students are making the switch. We understand
            your curriculum because we built this for you.
          </p>
        </motion.div>

        {/* Feature Highlights - Selling Points */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: "fa-map",
              title: "Complete Syllabus Coverage",
              desc: "Access all syllabuses in one place: NSSCO (Namibia), CAPS & IEB (South Africa), and EGCSE (Eswatini). No more switching between different platforms.",
              color: "lime",
              highlight: "All in One",
            },
            {
              icon: "fa-brain",
              title: "AI-Powered Exam Intelligence",
              desc: "Our AI analyzes thousands of past papers to identify the most frequently asked questions and trending topics. Focus your study time where it matters most.",
              color: "purple",
              highlight: "Smart Insights",
            },
            {
              icon: "fa-calendar-check",
              title: "Automated Study Planning",
              desc: "Never miss an exam deadline. Our smart planner automatically fetches exam dates from your syllabus and builds an optimized study schedule tailored to you.",
              color: "blue",
              highlight: "Auto-Sync",
            },
            {
              icon: "fa-note-sticky",
              title: "Infinite Visual Canvas",
              desc: "Sketch diagrams, annotate materials, and organize everything in one infinite canvas. Link notes directly to syllabus chapters for seamless organization.",
              color: "orange",
              highlight: "Unlimited Space",
            },
            {
              icon: "fa-fire",
              title: "Gamified Progress Tracking",
              desc: "Build consistent study habits with 24-hour streaks that automatically pause during holidays. Track your progress and celebrate your achievements.",
              color: "red",
              highlight: "Stay Motivated",
            },
            {
              icon: "fa-youtube",
              title: "Instant Video Intelligence",
              desc: "Transform any YouTube video into structured study notes. Get instant transcripts, AI summaries, and translations in seconds.",
              color: "yellow",
              highlight: "Save Time",
            },
            {
              icon: "fa-globe-africa",
              title: "Built for SADC Students",
              desc: "Every feature is designed specifically for Southern African curricula. We understand your marking rubrics, exam formats, and educational context.",
              color: "green",
              highlight: "Local Expertise",
            },
            {
              icon: "fa-cloud",
              title: "Universal Access",
              desc: "Access your notes, schedules, and exam papers from any device, anywhere. Everything syncs automatically to the cloud.",
              color: "cyan",
              highlight: "Always Available",
            },
            {
              icon: "fa-shield-check",
              title: "Free Core Features",
              desc: "Essential tools are free forever. We believe premium education shouldn't come with premium price tags for core functionality.",
              color: "lime",
              highlight: "Free Forever",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="academy-card border-l-4 border-l-[var(--lime)] p-6 sm:p-8 h-full hover:border-[var(--lime)]/60 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 bg-[var(--lime)]/10 rounded-xl flex items-center justify-center text-[var(--lime)]`}
                  >
                    <i
                      className={`fa-solid ${feature.icon} text-xl sm:text-2xl feature-icon`}
                    ></i>
                  </div>
                  <Badge variant="lime" className="text-xs">
                    {feature.highlight}
                  </Badge>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold mb-3 text-[var(--text-primary)]">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {feature.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
