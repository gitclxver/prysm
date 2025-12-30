"use client";

import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen overflow-x-hidden w-full">
      <Navigation />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-x-hidden">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="flex justify-center mb-4 sm:mb-6">
            <Badge
              variant="purple"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm"
            >
              <i className="fa-solid fa-sparkles"></i>
              <span>Our Story</span>
            </Badge>
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 leading-[1.1] break-words px-2">
            Building the Future of{" "}
            <span className="bg-gradient-to-r from-[var(--lime)] to-[var(--lavender)] bg-clip-text text-transparent">
              Education
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            We&apos;re on a mission to revolutionize how SADC students learn,
            study, and succeed. Prysm isn&apos;t just another app—it&apos;s your
            complete academic operating system.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
              Who{" "}
              <span className="bg-gradient-to-r from-[var(--lime)] to-[var(--lavender)] bg-clip-text text-transparent">
                We Are
              </span>
            </h2>
            <div className="space-y-4 text-lg text-[var(--text-secondary)] leading-relaxed">
              <p>
                Prysm is an innovative education technology company founded with
                a singular vision: to centralize and simplify the academic
                journey for millions of students across the Southern African
                Development Community (SADC).
              </p>
              <p>
                Born from the frustration of juggling multiple apps, scattered
                notes, and fragmented study resources, Prysm represents the
                first truly unified platform designed specifically for African
                students. We understand the unique challenges students face—from
                accessing curriculum-specific exam papers to managing complex
                study schedules across different syllabuses.
              </p>
              <p>
                Our platform harnesses cutting-edge artificial intelligence to
                provide intelligent insights, automate tedious tasks, and
                deliver personalized learning experiences that adapt to each
                student&apos;s unique needs and learning style.
              </p>
            </div>
          </div>
          <Card className="academy-card p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-[var(--bg-overlay)] rounded-xl">
                <div className="w-16 h-16 rounded-full bg-[var(--lime)]/20 flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-users text-[var(--lime)] text-2xl"></i>
                </div>
                <p className="text-3xl font-extrabold text-[var(--text-primary)] mb-2">
                  Growing
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Community
                </p>
              </div>
              <div className="text-center p-6 bg-[var(--bg-overlay)] rounded-xl">
                <div className="w-16 h-16 rounded-full bg-purple-400/20 flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-globe text-purple-400 text-2xl"></i>
                </div>
                <p className="text-3xl font-extrabold text-[var(--text-primary)] mb-2">
                  3
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Countries
                </p>
              </div>
              <div className="text-center p-6 bg-[var(--bg-overlay)] rounded-xl">
                <div className="w-16 h-16 rounded-full bg-orange-400/20 flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-file-alt text-orange-400 text-2xl"></i>
                </div>
                <p className="text-3xl font-extrabold text-[var(--text-primary)] mb-2">
                  42,000+
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Exam Papers
                </p>
              </div>
              <div className="text-center p-6 bg-[var(--bg-overlay)] rounded-xl">
                <div className="w-16 h-16 rounded-full bg-blue-400/20 flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-rocket text-blue-400 text-2xl"></i>
                </div>
                <p className="text-3xl font-extrabold text-[var(--text-primary)] mb-2">
                  2026
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Launch Year
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="academy-card p-10">
            <div className="w-20 h-20 rounded-2xl bg-[var(--lime)]/20 flex items-center justify-center mb-6">
              <i className="fa-solid fa-bullseye text-[var(--lime)] text-3xl"></i>
            </div>
            <h3 className="text-3xl font-extrabold mb-4">Our Mission</h3>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              To empower every SADC student with intelligent, centralized tools
              that eliminate academic friction, streamline learning workflows,
              and unlock their full potential. We believe that access to
              organized, AI-enhanced educational resources should be universal,
              not a privilege.
            </p>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mt-4">
              By integrating exam preparation, note-taking, scheduling, and
              study analytics into one cohesive platform, we&apos;re not just
              building software—we&apos;re building the foundation for academic
              excellence across the region.
            </p>
          </Card>
          <Card className="academy-card p-10">
            <div className="w-20 h-20 rounded-2xl bg-purple-400/20 flex items-center justify-center mb-6">
              <i className="fa-solid fa-eye text-purple-400 text-3xl"></i>
            </div>
            <h3 className="text-3xl font-extrabold mb-4">Our Vision</h3>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              To become the definitive educational operating system for African
              students, recognized as the platform that transformed how millions
              of learners prepare for exams, organize their studies, and achieve
              academic success.
            </p>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mt-4">
              We envision a future where every student has instant access to
              curriculum-aligned resources, AI-powered study recommendations,
              and collaborative tools that make learning intuitive, efficient,
              and genuinely enjoyable.
            </p>
          </Card>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-6 py-16 overflow-x-hidden">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Badge
              variant="purple"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm"
            >
              <i className="fa-solid fa-book-open"></i>
              <span>The Journey</span>
            </Badge>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
            How It All{" "}
            <span className="bg-gradient-to-r from-[#d4ff80] to-[#e0d7ff] bg-clip-text text-transparent">
              Started
            </span>
          </h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <Card className="academy-card p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-lime-400/20 flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-lightbulb text-lime-400 text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold mb-3">The Problem</h3>
                  <p className="text-gray-300 leading-relaxed">
                    As students ourselves, we experienced firsthand the chaos of
                    academic life. Notes scattered across Google Drive, exam
                    papers buried in WhatsApp groups, study schedules scribbled
                    on paper, and no single source of truth for
                    curriculum-specific resources. We spent more time organizing
                    than actually studying.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="academy-card p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-purple-400/20 flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-code text-purple-400 text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold mb-3">The Solution</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We realized that what students needed wasn&apos;t another
                    app—it was a complete ecosystem. A unified platform that
                    combines AI-powered insights with intuitive design,
                    specifically tailored to SADC curricula. Thus, Prysm was
                    born: the Ultimate Student OS that centralizes everything
                    you need to succeed.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="academy-card p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-orange-400/20 flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-rocket text-orange-400 text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold mb-3">The Future</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Launching in February 2026, Prysm will begin its journey to
                    transform education across Southern Africa. With Phase 1
                    focusing on core tools and Phase 3 expanding to mobile apps
                    and parent dashboards, we&apos;re building not just for
                    today, but for the next generation of students.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-6 py-16 overflow-x-hidden">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Badge
              variant="purple"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm"
            >
              <i className="fa-solid fa-heart"></i>
              <span>What Drives Us</span>
            </Badge>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
            Our Core{" "}
            <span className="bg-gradient-to-r from-[#d4ff80] to-[#e0d7ff] bg-clip-text text-transparent">
              Values
            </span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "fa-graduation-cap",
              title: "Student-First",
              bgClass: "bg-lime-400/20",
              textClass: "text-lime-400",
              desc: "Every feature, every decision, every innovation is driven by what students actually need. We build for students, with students.",
            },
            {
              icon: "fa-globe-africa",
              title: "Local Focus",
              bgClass: "bg-purple-400/20",
              textClass: "text-purple-400",
              desc: "Built specifically for SADC curricula, exam boards, and educational systems. We understand your context because we share it.",
            },
            {
              icon: "fa-brain",
              title: "AI-Powered",
              bgClass: "bg-orange-400/20",
              textClass: "text-orange-400",
              desc: "Harnessing the latest AI to provide intelligent insights, predictions, and personalized recommendations that make studying smarter, not harder.",
            },
            {
              icon: "fa-lock",
              title: "Privacy & Security",
              bgClass: "bg-blue-400/20",
              textClass: "text-blue-400",
              desc: "Your data is yours. We implement enterprise-grade security to protect your academic information and respect your privacy.",
            },
            {
              icon: "fa-trophy",
              title: "Excellence",
              bgClass: "bg-red-400/20",
              textClass: "text-red-400",
              desc: "We're committed to building world-class software that rivals global education platforms while remaining accessible and relevant to African students.",
            },
            {
              icon: "fa-handshake",
              title: "Accessibility",
              bgClass: "bg-green-400/20",
              textClass: "text-green-400",
              desc: "Core features free forever. We believe premium education tools shouldn't come with premium price tags for essential functionality.",
            },
          ].map((value, idx) => (
            <Card key={idx} className="academy-card p-8 text-center">
              <div
                className={`w-16 h-16 rounded-xl ${value.bgClass} flex items-center justify-center mx-auto mb-4`}
              >
                <i
                  className={`fa-solid ${value.icon} ${value.textClass} text-2xl feature-icon`}
                ></i>
              </div>
              <h3 className="text-xl font-extrabold mb-3">{value.title}</h3>
              <p className="text-gray-400 leading-relaxed">{value.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* What We're Building */}
      <section className="max-w-7xl mx-auto px-6 py-16 overflow-x-hidden">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Badge
              variant="purple"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm"
            >
              <i className="fa-solid fa-cogs"></i>
              <span>Our Platform</span>
            </Badge>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
            What We&apos;re{" "}
            <span className="bg-gradient-to-r from-[#d4ff80] to-[#e0d7ff] bg-clip-text text-transparent">
              Building
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive suite of tools designed to centralize your entire
            academic journey
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="academy-card p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-lime-400/20 flex items-center justify-center">
                <i className="fa-solid fa-file-alt text-lime-400"></i>
              </div>
              <h3 className="text-2xl font-extrabold">Exam Paper Hub</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              The largest repository of SADC exam papers with AI-powered
              insights. Discover trending topics, frequently asked questions,
              and intelligent predictions to focus your revision where it
              matters most.
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-lime-400 text-xs"></i>
                <span>
                  42,000+ exam papers across NSSCO, CAPS, IEB, EGCSE, IGCSE,
                  ZIMSEC, and BGCSE
                </span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-lime-400 text-xs"></i>
                <span>AI topic frequency analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-lime-400 text-xs"></i>
                <span>Curriculum-specific filtering</span>
              </li>
            </ul>
          </Card>
          <Card className="academy-card p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-400/20 flex items-center justify-center">
                <i className="fa-solid fa-pencil text-purple-400"></i>
              </div>
              <h3 className="text-2xl font-extrabold">Smart Drawing Board</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              An intuitive note-taking and drawing platform that lets you sketch
              diagrams, annotate materials, and organize everything in one
              place. Link notes to syllabus chapters for seamless organization.
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-purple-400 text-xs"></i>
                <span>Interactive canvas with drawing tools</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-purple-400 text-xs"></i>
                <span>Syllabus chapter linking</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-purple-400 text-xs"></i>
                <span>Collaboration features (Phase 3)</span>
              </li>
            </ul>
          </Card>
          <Card className="academy-card p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-orange-400/20 flex items-center justify-center">
                <i className="fa-solid fa-calendar text-orange-400"></i>
              </div>
              <h3 className="text-2xl font-extrabold">Auto-Planner</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              An intelligent timetable generator that creates personalized study
              schedules based on your subjects, exam dates, and available hours.
              Automatic exam date fetching and smart study recommendations
              included.
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-orange-400 text-xs"></i>
                <span>Automated exam date detection</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-orange-400 text-xs"></i>
                <span>AI-powered study recommendations</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-orange-400 text-xs"></i>
                <span>Flexible schedule customization</span>
              </li>
            </ul>
          </Card>
          <Card className="academy-card p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-400/20 flex items-center justify-center">
                <i className="fa-brands fa-youtube text-blue-400"></i>
              </div>
              <h3 className="text-2xl font-extrabold">
                YouTube AI Intelligence
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Transform any educational YouTube video into structured notes with
              AI-generated transcripts, summaries, and translations. Extract key
              concepts automatically.
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-blue-400 text-xs"></i>
                <span>Automatic transcript generation</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-blue-400 text-xs"></i>
                <span>Multi-language translation</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-blue-400 text-xs"></i>
                <span>AI-powered summaries and key points</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Impact & Goals */}
      <section className="max-w-7xl mx-auto px-6 py-16 overflow-x-hidden">
        <Card className="academy-card p-8 sm:p-12">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Badge
                variant="purple"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                <i className="fa-solid fa-chart-line"></i>
                <span>Our Impact</span>
              </Badge>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
              Building a{" "}
              <span className="bg-gradient-to-r from-[#d4ff80] to-[#e0d7ff] bg-clip-text text-transparent">
                Better Future
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-lime-400/20 flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-users text-lime-400 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-extrabold mb-3">Empowerment</h3>
              <p className="text-gray-400 leading-relaxed">
                Giving students the tools they need to take control of their
                academic journey and achieve their full potential.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-purple-400/20 flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-globe text-purple-400 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-extrabold mb-3">Accessibility</h3>
              <p className="text-gray-400 leading-relaxed">
                Making premium educational resources accessible to all students,
                regardless of background or financial situation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-orange-400/20 flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-trophy text-orange-400 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-extrabold mb-3">Excellence</h3>
              <p className="text-gray-400 leading-relaxed">
                Raising the standard of educational technology in Africa and
                proving that world-class software can be built here, for here.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 overflow-x-hidden">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Badge
              variant="purple"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm"
            >
              <i className="fa-solid fa-envelope"></i>
              <span>Get In Touch</span>
            </Badge>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-[#d4ff80] to-[#e0d7ff] bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions, feedback, or want to partner with us? We&apos;d love
            to hear from you.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="academy-card p-8 text-center">
            <div className="w-16 h-16 rounded-xl bg-lime-400/20 flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-envelope text-lime-400 text-2xl"></i>
            </div>
            <h3 className="text-xl font-extrabold mb-2">Email</h3>
            <a
              href="mailto:support@prysmlearn.com"
              className="text-lime-400 hover:text-lime-300 transition-colors"
            >
              support@prysmlearn.com
            </a>
          </Card>
          <Card className="academy-card p-8 text-center">
            <div className="w-16 h-16 rounded-xl bg-purple-400/20 flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-phone text-purple-400 text-2xl"></i>
            </div>
            <h3 className="text-xl font-extrabold mb-2">Phone</h3>
            <a
              href="tel:+264814989258"
              className="text-lime-400 hover:text-lime-300 transition-colors"
            >
              +264 81 498 9258
            </a>
          </Card>
          <Card className="academy-card p-8 text-center">
            <div className="w-16 h-16 rounded-xl bg-orange-400/20 flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-location-dot text-orange-400 text-2xl"></i>
            </div>
            <h3 className="text-xl font-extrabold mb-2">Location</h3>
            <p className="text-gray-400">Windhoek, Namibia</p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.png"
                alt="Prysm Logo - The Ultimate Student OS"
                className="h-8 w-8"
                loading="lazy"
                width="32"
                height="32"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div
                className="w-8 h-8 bg-gradient-to-br from-lime-400 to-lime-300 rounded-lg flex items-center justify-center shadow-lg shadow-lime-400/30"
                style={{ display: "none" }}
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
              <li>
                <Link
                  href="/#features"
                  className="hover:text-lime-400 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/examhub"
                  className="hover:text-lime-400 transition-colors"
                >
                  Exam Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/canvas"
                  className="hover:text-lime-400 transition-colors"
                >
                  Drawing Board
                </Link>
              </li>
              <li>
                <Link
                  href="/autoplanner"
                  className="hover:text-lime-400 transition-colors"
                >
                  Auto-Planner
                </Link>
              </li>
              <li>
                <Link
                  href="/youtubeai"
                  className="hover:text-lime-400 transition-colors"
                >
                  YouTube AI
                </Link>
              </li>
              <li>
                <Link
                  href="/parenthub"
                  className="hover:text-lime-400 transition-colors"
                >
                  Parent Hub
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4">Company</h5>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-lime-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-lime-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-lime-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-lime-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4">Connect</h5>
            <div className="flex gap-4 text-xl text-gray-400 mb-6">
              <a
                href="https://facebook.com/prysmlearn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-lime-400/10 hover:text-lime-400 transition-all"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                href="https://instagram.com/prysm_learn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-lime-400/10 hover:text-lime-400 transition-all"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://tiktok.com/@prysmlearn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-lime-400/10 hover:text-lime-400 transition-all"
                aria-label="TikTok"
              >
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </div>
            <p className="text-xs text-gray-500 mb-2">
              <i className="fa-solid fa-envelope mr-2 text-lime-400"></i>
              <a
                href="mailto:support@prysmlearn.com"
                className="hover:text-lime-400 transition-colors"
              >
                support@prysmlearn.com
              </a>
            </p>
            <p className="text-xs text-gray-500 mb-2">
              <i className="fa-solid fa-phone mr-2 text-lime-400"></i>
              <a
                href="tel:+264814989258"
                className="hover:text-lime-400 transition-colors"
              >
                +264 81 498 9258
              </a>
            </p>
            <p className="text-xs text-gray-500">
              <i className="fa-solid fa-location-dot mr-2 text-lime-400"></i>
              Windhoek, Namibia
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5 text-sm text-gray-500">
          <p>© 2025 Prysm Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-lime-400 transition-colors"
            >
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
