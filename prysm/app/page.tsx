"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { AnimatedCard } from "@/components/AnimatedCard";
import { useState, useEffect, useRef } from "react";

export default function HomePage() {
  const { user, userProfile } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<Array<{ id: number; element: HTMLDivElement }>>([]);
  const trailIdRef = useRef(0);

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
        const href = anchor.getAttribute("href");
        if (href && href !== "#" && href !== "#top") {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  // Canvas trailing effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const createTrail = (x: number, y: number) => {
      const trail = document.createElement("div");
      const id = trailIdRef.current++;
      trail.className = "canvas-trail";
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      canvas.appendChild(trail);

      trailRefs.current.push({ id, element: trail });

      // Remove trail after animation
      setTimeout(() => {
        trail.remove();
        trailRefs.current = trailRefs.current.filter((t) => t.id !== id);
      }, 600);
    };

    const handleMove = (e: Event) => {
      const rect = canvas.getBoundingClientRect();
      // Check if event has touches property (TouchEvent) or clientX (MouseEvent)
      let clientX: number;
      let clientY: number;
      
      // Type guard for TouchEvent - check if touches exists and has length property
      if ("touches" in e && e.touches && typeof (e.touches as any).length === "number" && (e.touches as any).length > 0) {
        // TouchEvent - access touches array
        const touchList = e.touches as { length: number; [index: number]: { clientX: number; clientY: number } };
        const touch = touchList[0];
        clientX = touch?.clientX ?? 0;
        clientY = touch?.clientY ?? 0;
      } else if ("clientX" in e && "clientY" in e) {
        // MouseEvent - access clientX/clientY directly
        clientX = (e as { clientX: number }).clientX;
        clientY = (e as { clientY: number }).clientY;
      } else {
        return; // Unknown event type
      }
      
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        createTrail(x, y);
      }
    };

    const handleLeave = () => {
      // Clear all trails when leaving
      trailRefs.current.forEach(({ element }) => element.remove());
      trailRefs.current = [];
    };

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("touchmove", handleMove, { passive: true });
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("touchend", handleLeave);

    return () => {
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("touchend", handleLeave);
    };
  }, []);

  return (
    <main id="main-content" className="min-h-screen overflow-x-hidden w-full">
      <Navigation />

      {/* Hero Section */}
      <header
        id="top"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12 lg:py-20 xl:py-32 relative overflow-x-hidden"
      >
        <div className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 z-20 hidden lg:block max-w-full">
          <Badge variant="purple">
            <i className="fa-solid fa-sparkles mr-2"></i>
            Launching February 2026
          </Badge>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-4 sm:mb-6 lg:hidden"
        >
          <Badge variant="purple" className="mb-3 sm:mb-4">
            <i className="fa-solid fa-sparkles mr-2"></i>
            Launching February 2026
          </Badge>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center relative justify-items-center lg:justify-items-stretch min-w-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="text-center lg:text-left relative z-10 w-full max-w-2xl lg:max-w-none min-w-0"
          >
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-3 sm:mb-4 lg:mb-6 leading-[1.1] break-words overflow-wrap-anywhere">
              Save Your Semester.
              <br />
              <span className="text-[var(--lime)]">Escape the Prysm.</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] mb-4 sm:mb-5 lg:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              The education assistant that centralizes your notes, exam papers,
              and schedule into one intelligent ecosystem. Harnessing the power
              of AI to build a brighter future for SADC students.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-5 sm:mb-6 lg:mb-12 justify-center lg:justify-start">
              {user ? (
                <Link href="/dashboard">
                  <Button
                    variant="primary"
                    className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base w-full sm:w-auto"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <a
                  href="https://forms.gle/aSoACEDfygW3aap2A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--lime)] text-[var(--prysm-bg)] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base inline-block text-center w-full sm:w-auto hover:shadow-[0_0_40px_var(--shadow-lime)] hover:scale-105 transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10">Take the Survey</span>
                </a>
              )}
              <a
                href="#features"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base border-2 border-[var(--border-color)] hover:border-[var(--lime)]/50 hover:bg-[var(--bg-overlay)] transition-all duration-300 inline-flex items-center justify-center w-full sm:w-auto"
              >
                Explore Features
                <i className="fa-solid fa-arrow-down ml-2 text-[var(--lime)]"></i>
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--lime)]/10 flex items-center justify-center border border-[var(--lime)]/20 flex-shrink-0">
                  <i className="fa-solid fa-rocket text-[var(--lime)] text-lg sm:text-xl"></i>
                </div>
                <div className="text-xs sm:text-sm min-w-0">
                  <p className="font-bold text-[var(--text-primary)] text-sm sm:text-base">
                    Launching February 2026
                  </p>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm mt-0.5 sm:mt-1">
                    <i className="fa-solid fa-users text-[var(--lime)] mr-1"></i>
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
            className="relative mt-6 sm:mt-8 lg:mt-0 w-full max-w-2xl lg:max-w-none min-w-0"
          >
            <div className="relative">
              <div className="absolute -inset-3 sm:-inset-4 md:-inset-6 border-2 border-[var(--lime)]/20 rounded-2xl pointer-events-none"></div>
              <Card className="relative p-3 sm:p-4 md:p-5 lg:p-6">
              <div className="bg-[var(--prysm-bg)] rounded-2xl p-5 sm:p-7 lg:p-10 border border-[var(--border-color)]">
                <div className="flex items-center justify-between mb-5 sm:mb-6 gap-2">
                  <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[var(--lime)]/80"></div>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 bg-[var(--lime)]/10 rounded-full border border-[var(--lime)]/30 flex-shrink-0">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--lime)] animate-pulse"></div>
                    <span className="text-[9px] xs:text-[10px] text-[var(--lime)] font-bold uppercase tracking-wider sm:tracking-widest whitespace-nowrap">
                      Live AI Analysis
                    </span>
                  </div>
                </div>
                <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                  <div className="h-14 sm:h-16 lg:h-20 w-full bg-[var(--bg-overlay)] rounded-xl border border-[var(--border-color)] flex items-center px-4 sm:px-5 lg:px-6 gap-3 sm:gap-4 hover:bg-[var(--bg-overlay-active)] transition-colors overflow-hidden">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[var(--lime)]/20 flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-magnifying-glass text-[var(--lime)] text-sm sm:text-base"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium truncate">
                        Scanning Exam Paper
                      </p>
                      <p className="text-sm sm:text-base text-[var(--text-primary)] font-semibold truncate">
                        NSSCO Biology Paper 2 - 2024
                      </p>
                    </div>
                    <div className="flex gap-1 sm:gap-1.5 flex-shrink-0">
                      <div className="w-1 sm:w-1.5 h-4 sm:h-5 bg-[var(--lime)] rounded-full animate-pulse"></div>
                      <div
                        className="w-1 sm:w-1.5 h-4 sm:h-5 bg-[var(--lime)]/60 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-1 sm:w-1.5 h-4 sm:h-5 bg-[var(--lime)]/40 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-[var(--lime)]/10 to-[var(--lime)]/5 rounded-xl border border-[var(--lime)]/30 shadow-[var(--shadow-lime)]">
                    <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
                      <i className="fa-solid fa-brain text-[var(--lime)] text-base sm:text-lg"></i>
                      <p className="text-xs sm:text-sm font-bold text-[var(--lime)] uppercase tracking-wider sm:tracking-widest">
                        AI Prediction
                      </p>
                    </div>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-medium break-words">
                      <span className="text-[var(--lime)] font-bold">
                        &quot;Enzymes and Nutrition&quot;
                      </span>{" "}
                      has appeared in{" "}
                      <span className="font-bold">4 consecutive</span> IEB final
                      exams with a 92% probability of reappearing.
                    </p>
                    <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-[var(--lime)]/20 flex flex-wrap items-center gap-3 sm:gap-4">
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <i className="fa-solid fa-chart-line text-[var(--lime)] text-xs sm:text-sm"></i>
                        <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                          Trending Topic
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <i className="fa-solid fa-clock text-[var(--lime)] text-xs sm:text-sm"></i>
                        <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                          Most Frequent
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center sm:text-left overflow-x-hidden"
      >
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-6">
            Why{" "}
            <span className="bg-gradient-to-r from-[var(--lime)] to-[var(--lavender)] bg-clip-text text-transparent">
              Prysm?
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center md:justify-items-stretch">
            {[
              {
                icon: "fa-map",
                title: "Complete Syllabus Coverage",
                desc: "Access all syllabuses in one place: NSSCO (Namibia), CAPS & IEB (South Africa), and EGCSE (Eswatini). No more switching between different platforms.",
                highlight: "All in One",
              },
              {
                icon: "fa-brain",
                title: "AI-Powered Exam Intelligence",
                desc: "Our AI analyzes thousands of past papers to identify the most frequently asked questions and trending topics. Focus your study time where it matters most.",
                highlight: "Smart Insights",
              },
              {
                icon: "fa-calendar-check",
                title: "Automated Study Planning",
                desc: "Never miss an exam deadline. Our smart planner automatically fetches exam dates from your syllabus and builds an optimized study schedule tailored to you.",
                highlight: "Auto-Sync",
              },
              {
                icon: "fa-note-sticky",
                title: "Infinite Visual Canvas",
                desc: "Sketch diagrams, annotate materials, and organize everything in one infinite canvas. Link notes directly to syllabus chapters for seamless organization.",
                highlight: "Unlimited Space",
              },
              {
                icon: "fa-fire",
                title: "Gamified Progress Tracking",
                desc: "Build consistent study habits with 24-hour streaks that automatically pause during holidays. Track your progress and celebrate your achievements.",
                highlight: "Stay Motivated",
              },
              {
                icon: "fa-brands fa-youtube",
                title: "Instant Video Intelligence",
                desc: "Transform any YouTube video into structured study notes. Get instant transcripts, AI summaries, and translations in seconds.",
                highlight: "Save Time",
              },
              {
                icon: "fa-globe-africa",
                title: "Built for SADC Students",
                desc: "Every feature is designed specifically for Southern African curricula. We understand your marking rubrics, exam formats, and educational context.",
                highlight: "Local Expertise",
              },
              {
                icon: "fa-cloud",
                title: "Universal Access",
                desc: "Access your notes, schedules, and exam papers from any device, anywhere. Everything syncs automatically to the cloud.",
                highlight: "Always Available",
              },
              {
                icon: "fa-shield-halved",
                title: "Free Core Features",
                desc: "Essential tools are free forever. We believe premium education shouldn't come with premium price tags for core functionality.",
                highlight: "Free Forever",
              },
            ].map((feature, idx) => (
              <AnimatedCard
                key={idx}
                delay={idx * 0.1}
                className="academy-card border-l-4 border-l-[var(--lime)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[var(--lime)]/10 rounded-xl flex items-center justify-center text-[var(--lime)]">
                    <i
                      className={`${
                        feature.icon.includes("fa-brands")
                          ? feature.icon
                          : `fa-solid ${feature.icon}`
                      } text-xl sm:text-2xl feature-icon`}
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
              </AnimatedCard>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Smart Note Taking Section */}
      <section
        id="tools"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24 grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-14 lg:gap-16 items-center overflow-x-hidden"
      >
        <div className="relative order-2 lg:order-1 overflow-hidden lg:overflow-visible hidden lg:block">
          <div
            ref={canvasRef}
            className="drawing-canvas canvas-interactive w-full sm:min-h-[320px] lg:min-h-[400px] xl:min-h-[450px] sm:aspect-[16/9] lg:aspect-video rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 shadow-inner relative bg-[var(--prysm-card)] overflow-hidden"
          >
            <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-8">
              <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-[var(--lime)] shadow-[var(--shadow-lime)] cursor-pointer hover:scale-110 transition-transform flex-shrink-0"></div>
              <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-[var(--lavender)] shadow-[var(--lavender)]/30 cursor-pointer hover:scale-110 transition-transform flex-shrink-0"></div>
              <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-[var(--border-color)] cursor-pointer hover:border-[var(--border-hover)] transition-colors flex-shrink-0"></div>
            </div>
            <div className="sketch-line top-12 sm:top-16 md:top-20 lg:top-24 left-12 sm:left-16 md:left-20 lg:left-24"></div>
            <div
              className="sketch-line top-16 sm:top-20 md:top-28 lg:top-32 left-20 sm:left-24 md:left-32 lg:left-40 opacity-40"
              style={{ animationDelay: "1s" }}
            ></div>
            <div className="absolute border border-[var(--border-color)] rounded-lg sm:rounded-xl p-1.5 sm:p-2 md:p-2.5 lg:p-3 xl:p-4 top-4 sm:top-5 md:top-7 lg:top-9 xl:top-11 right-4 sm:right-5 md:right-7 lg:right-9 xl:right-11 rotate-3 bg-[var(--prysm-card)]/90 backdrop-blur-sm z-10">
              <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 mb-0.5 sm:mb-1">
                <i className="fa-solid fa-sparkles text-[var(--lime)] text-[7px] sm:text-[8px] md:text-[9px] lg:text-xs flex-shrink-0"></i>
                <p className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-xs font-bold text-[var(--lime)] uppercase tracking-tighter sm:tracking-tight md:tracking-wider leading-tight">
                  Interactive Canvas
                </p>
              </div>
              <p className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] xl:text-xs text-[var(--text-secondary)] font-medium leading-tight">
                Phase 1 Drawing Board
              </p>
            </div>
            <div className="absolute bottom-4 sm:bottom-5 md:bottom-7 lg:bottom-9 xl:bottom-11 right-4 sm:right-5 md:right-7 lg:right-9 xl:right-11 flex gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 z-10">
              <div className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 xl:h-12 xl:w-12 bg-[var(--prysm-card)] flex items-center justify-center rounded-lg sm:rounded-xl text-[var(--lime)] border-2 border-[var(--lime)]/40 hover:border-[var(--lime)] cursor-pointer shadow-[var(--shadow-lime)] transition-all flex-shrink-0">
                <i className="fa-solid fa-pencil text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm"></i>
              </div>
              <div className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 xl:h-12 xl:w-12 bg-[var(--prysm-card)] flex items-center justify-center rounded-lg sm:rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer border border-[var(--border-color)] transition-all flex-shrink-0">
                <i className="fa-solid fa-shapes text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm"></i>
              </div>
            </div>
          </div>
          <div className="absolute bottom-2 sm:bottom-2 md:bottom-2 lg:-bottom-2 xl:-bottom-2 right-2 sm:right-2 md:right-2 lg:-right-2 xl:-right-2 bg-gradient-to-r from-[var(--lime)] to-[var(--lime)]/80 text-[var(--prysm-bg)] px-2 sm:px-2.5 md:px-3 lg:px-4 xl:px-5 py-0.5 sm:py-1 md:py-1.5 lg:py-2 rounded-full text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-xs font-black uppercase tracking-tighter shadow-[var(--shadow-lime)] z-20 whitespace-nowrap max-w-[calc(100%-1rem)] sm:max-w-[calc(100%-1rem)] md:max-w-none">
            <i className="fa-solid fa-star mr-0.5 sm:mr-0.5 md:mr-1"></i>New:
            Drawing Board
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Badge variant="purple">Smart Note Taking</Badge>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
            Visual Notes for{" "}
            <span className="text-[var(--lavender)]">Visual Learners.</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-10 leading-relaxed">
            Prysm Phase 1 introduces our <strong>Smart Drawing Board</strong>.
            Sketch diagrams, annotate study materials, link notes to syllabus
            chapters, and organize everything in one place. Works seamlessly on
            your phone, tablet, and computer. Collaboration features coming in
            Phase 3 for group projects.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Card className="p-5 border border-[var(--border-color)] hover:border-[var(--lime)]/30">
              <div className="w-10 h-10 rounded-lg bg-[var(--lime)]/10 flex items-center justify-center mb-3">
                <i className="fa-solid fa-layer-group text-[var(--lime)] text-lg"></i>
              </div>
              <p className="text-sm font-bold text-[var(--text-primary)] mb-1">
                Infinite Canvas
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                Unlimited drawing space
              </p>
            </Card>
            <Card className="p-5 border border-[var(--border-color)] hover:border-[var(--lime)]/30">
              <div className="w-10 h-10 rounded-lg bg-[var(--lime)]/10 flex items-center justify-center mb-3">
                <i className="fa-solid fa-cloud-arrow-up text-[var(--lime)] text-lg"></i>
              </div>
              <p className="text-sm font-bold text-[var(--text-primary)] mb-1">
                Cloud Sync
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                Access anywhere, anytime
              </p>
            </Card>
            <Card className="p-5 border border-[var(--border-color)] hover:border-[var(--lime)]/30">
              <div className="w-10 h-10 rounded-lg bg-[var(--lime)]/10 flex items-center justify-center mb-3">
                <i className="fa-solid fa-mobile-screen-button text-[var(--lime)] text-lg"></i>
              </div>
              <p className="text-sm font-bold text-[var(--text-primary)] mb-1">
                Mobile & Tablet
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                Works on all devices
              </p>
            </Card>
            <Card className="p-5 border border-[var(--border-color)] hover:border-[var(--lime)]/30">
              <div className="w-10 h-10 rounded-lg bg-[var(--lime)]/10 flex items-center justify-center mb-3">
                <i className="fa-solid fa-laptop text-[var(--lime)] text-lg"></i>
              </div>
              <p className="text-sm font-bold text-[var(--text-primary)] mb-1">
                Web & Desktop
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                Full-featured on all platforms
              </p>
            </Card>
          </div>
          <Link
            href="/canvas"
            className="inline-flex items-center gap-2 text-[var(--lime)] font-semibold hover:gap-3 transition-all duration-300"
          >
            Learn More About Note Taking
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </section>

      {/* Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24 overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-6">
            <Badge variant="purple">Phase 1 Features</Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-[var(--lime)] to-[var(--lavender)] bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            The core modules available at launch. Built to centralize your
            entire academic journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center sm:justify-items-stretch">
          <AnimatedCard
            delay={0.1}
            className="academy-card border-l-4 border-l-[var(--lime)]"
            id="exams"
          >
            <div className="w-14 h-14 bg-[var(--lime)]/10 rounded-xl flex items-center justify-center text-[var(--lime)] mb-6">
              <i className="fa-solid fa-file-invoice text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">
              Exam Hub
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              Access thousands of past papers from Namibia (NSSCO), South Africa
              (CAPS & IEB), Eswatini (EGCSE), IGCSE, Zimbabwe (ZIMSEC), and
              Botswana (BGCSE). AI identifies most frequently asked questions
              and trending topics.
            </p>
            <Link
              href="/examhub"
              className="text-[var(--lime)] text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              Explore Exam Hub
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>

          <AnimatedCard
            delay={0.2}
            className="academy-card border-l-4 border-l-purple-400"
          >
            <div className="w-14 h-14 bg-purple-400/10 rounded-xl flex items-center justify-center text-purple-400 mb-6">
              <i className="fa-solid fa-calendar-check text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">
              Auto-Planner
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              Input your subjects and available study hours. Prysm automatically
              fetches exam dates from your syllabus and builds an optimized
              study schedule with smart recommendations.
            </p>
            <Link
              href="/autoplanner"
              className="text-[var(--lavender)] text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              Plan Your Schedule
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>

          <AnimatedCard
            delay={0.3}
            className="academy-card border-l-4 border-l-blue-400"
          >
            <div className="w-14 h-14 bg-blue-400/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
              <i className="fa-solid fa-pen-nib text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">
              Drawing Board
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              Smart drawing board with infinite canvas. Sketch diagrams,
              annotate study materials, and link notes to syllabus chapters.
              Cloud sync included.
            </p>
            <Link
              href="/canvas"
              className="text-blue-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              Start Drawing
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>

          <AnimatedCard
            delay={0.4}
            className="academy-card border-l-4 border-l-orange-400"
          >
            <div className="w-14 h-14 bg-orange-400/10 rounded-xl flex items-center justify-center text-orange-400 mb-6">
              <i className="fa-brands fa-youtube text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">
              YouTube AI
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              Paste any YouTube link and get instant transcripts, AI-powered
              summaries, and translations. Never miss a key point from your
              study videos again.
            </p>
            <Link
              href="/youtubeai"
              className="text-orange-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              Try YouTube AI
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>
        </div>
      </section>

      {/* Parents Section */}
      <section
        id="parents"
        className="bg-[var(--prysm-bg)] py-12 sm:py-16 md:py-20 lg:py-24 overflow-x-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <Card className="rounded-3xl p-8 border border-[var(--border-color)] relative overflow-hidden bg-[var(--prysm-card)]">
              <div className="absolute -inset-4 bg-[var(--lime)]/10 blur-2xl rounded-full"></div>
              <div className="relative bg-[var(--prysm-bg)] rounded-2xl p-6 border border-[var(--border-color)]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-[var(--lime)]/80"></div>
                  </div>
                  <div className="px-3 py-1 bg-[var(--lime)]/10 rounded-full border border-[var(--lime)]/30">
                    <span className="text-[10px] text-[var(--lime)] font-bold uppercase">
                      Parent View
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[var(--bg-overlay)] rounded-xl p-4 border border-[var(--border-color)]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[var(--text-secondary)]">
                        Study Time Today
                      </span>
                      <span className="text-sm font-bold text-[var(--lime)]">
                        3h 24m
                      </span>
                    </div>
                    <div className="h-2 bg-[var(--bg-overlay)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--lime)]/30 rounded-full"
                        style={{ width: "68%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[var(--bg-overlay)] rounded-lg p-3 border border-[var(--border-color)]">
                      <p className="text-xs text-[var(--text-secondary)] mb-1">
                        Math
                      </p>
                      <p className="text-lg font-bold text-[var(--text-primary)]">
                        45m
                      </p>
                    </div>
                    <div className="bg-[var(--bg-overlay)] rounded-lg p-3 border border-[var(--border-color)]">
                      <p className="text-xs text-[var(--text-secondary)] mb-1">
                        Biology
                      </p>
                      <p className="text-lg font-bold text-[var(--text-primary)]">
                        1h 12m
                      </p>
                    </div>
                  </div>
                  <div className="bg-[var(--lime)]/10 rounded-lg p-3 border border-[var(--lime)]/20">
                    <p className="text-xs font-bold text-[var(--lime)] uppercase mb-1">
                      Upcoming Exam
                    </p>
                    <p className="text-sm text-[var(--text-primary)] font-semibold">
                      Biology Paper 2
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      Nov 15, 2025
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="text-center mb-8">
              <div className="flex justify-center lg:justify-start mb-6">
                <Badge variant="purple">Coming Phase 3</Badge>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8 leading-tight">
              Peace of mind for{" "}
              <span className="text-[var(--lavender)]">Parents.</span>
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Stay connected with your child&apos;s academic journey. Monitor
              study time, track progress, and receive insights to support their
              success.
            </p>
            <Link
              href="/parenthub"
              className="bg-[var(--prysm-card)] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold border border-[var(--border-color)] hover:border-[var(--lime)]/50 hover:bg-[var(--bg-overlay)] transition-all inline-flex items-center gap-3 text-sm sm:text-base"
            >
              <span>Explore Parent Dashboard</span>
              <i className="fa-solid fa-arrow-right text-[var(--lime)]"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 border-t border-[var(--border-color)] overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-6">
            <Badge variant="purple">Additional Services</Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6">
            More Ways to{" "}
            <span className="bg-gradient-to-r from-[var(--lime)] to-[var(--lavender)] bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Access Prysm from any device - web browser or mobile app. Integrated
            services to support every step of your academic journey.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center md:justify-items-stretch">
          <AnimatedCard
            delay={0.1}
            className="academy-card border-l-4 border-l-[var(--lime)] border-t border-r border-b border-[var(--border-color)] p-8 rounded-2xl bg-[var(--prysm-card)]"
          >
            <div className="w-14 h-14 bg-[var(--lime)]/10 rounded-xl flex items-center justify-center text-[var(--lime)] mb-6">
              <i className="fa-solid fa-user-graduate text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">
              Prysm Tutors
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              Book 1-on-1 sessions with top-tier university students who
              mastered the exact curriculum you're studying now. Get
              personalized help from tutors who understand your syllabus.
            </p>
            <Link
              href="/tutors"
              className="text-[var(--lime)] text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              Explore Tutors
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>

          <AnimatedCard
            delay={0.2}
            className="academy-card border-l-4 border-l-purple-400 border-t border-r border-b border-[var(--border-color)] p-8 rounded-2xl bg-[var(--prysm-card)] relative"
          >
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <Badge variant="purple" className="text-[10px] px-2 py-0.5 whitespace-nowrap">
                Coming Soon
              </Badge>
            </div>
            <div className="w-14 h-14 bg-purple-400/10 rounded-xl flex items-center justify-center text-purple-400 mb-6">
              <i className="fa-solid fa-book-open text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">
              Prysm Print
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              Transform your digital notes and AI-generated summaries into
              premium physical study guides. Get professionally printed
              materials delivered to your door.
            </p>
            <Link
              href="/print"
              className="text-purple-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              Learn More
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>

          <AnimatedCard
            delay={0.3}
            className="academy-card border-l-4 border-l-blue-400 border-t border-r border-b border-[var(--border-color)] p-8 rounded-2xl bg-[var(--prysm-card)] relative"
          >
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <Badge variant="purple" className="text-[10px] px-2 py-0.5 whitespace-nowrap">
                Future Phase
              </Badge>
            </div>
            <div className="w-14 h-14 bg-blue-400/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
              <i className="fa-solid fa-paper-plane text-2xl feature-icon"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">
              Uni-Link
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              Centralized university applications across SADC and beyond. We
              match your results to degree requirements and streamline your
              application process.
            </p>
            <Link
              href="/unilink"
              className="text-blue-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              Learn More
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </AnimatedCard>
        </div>
      </section>

      {/* SADC Specialized Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24 overflow-x-hidden">
        <Card className="academy-card p-8 sm:p-12 rounded-[3rem] bg-gradient-to-br from-[var(--prysm-card)] to-[var(--prysm-bg)] overflow-hidden relative">
          <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 opacity-5 hidden lg:block pointer-events-none overflow-hidden max-w-full max-h-full">
            <i className="fa-solid fa-earth-africa text-[400px] lg:text-[400px] xl:text-[500px]"></i>
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <Badge variant="purple">Built for SADC</Badge>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 italic">
                SADC{" "}
                <span className="bg-gradient-to-r from-[var(--lime)] to-[var(--lavender)] bg-clip-text text-transparent">
                  Specialized.
                </span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-10 leading-relaxed">
                Unlike global tools, Prysm is built from the ground up to
                understand the specific marking rubrics, exam formats, and
                syllabus requirements of Namibia, South Africa, Eswatini, and
                IGCSE Cambridge schools. We speak your curriculum&apos;s
                language.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { country: "Namibia", syllabus: "NSSCO" },
                  { country: "South Africa", syllabus: "CAPS & IEB" },
                  { country: "Eswatini", syllabus: "EGCSE" },
                  { country: "International", syllabus: "IGCSE Cambridge" },
                ].map((item) => (
                  <div
                    key={`${item.country}-${item.syllabus}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--bg-overlay)] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--lime)]/10 flex items-center justify-center">
                      <i className="fa-solid fa-circle-check text-[var(--lime)] text-sm"></i>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-[var(--text-primary)] block">
                        {item.country}
                      </span>
                      <span className="text-xs text-[var(--text-secondary)]">
                        {item.syllabus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 bg-[var(--bg-overlay)] rounded-2xl border border-[var(--border-color)] backdrop-blur-sm">
              <p className="text-xs font-bold text-[var(--lime)] uppercase tracking-widest mb-4">
                Live Database Status
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-2">
                  <span className="text-sm">Past Exam Papers</span>
                  <span className="font-bold">42,000+</span>
                </div>
                <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-2">
                  <span className="text-sm">Subject Guides</span>
                  <span className="font-bold">1,200+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Study Hubs</span>
                  <span className="font-bold text-[var(--lime)]">
                    Live in 8 Countries
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24 overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-6">
            <Badge variant="purple">Got Questions?</Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[var(--lime)] to-[var(--lavender)] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Everything you need to know about Prysm and how it can transform
            your academic journey.
          </p>
        </motion.div>
        <div className="space-y-4">
          {[
            {
              q: "Is Prysm free for students?",
              a: "The core OS features (Smart Timetabling, Drawing Board, and Note Taking) are completely free forever. Advanced AI-powered exam predictions, detailed analytics, and priority Hub access are available with our premium membership. Free users still get access to thousands of exam papers and basic study tools.",
            },
            {
              q: "Does it work for my specific subjects?",
              a: "Absolutely! We cover all major Science, Humanities, and Commerce subjects for NSSCO, CAPS, IEB, EGCSE, ECZ, ZIMSEC, BGCSE, and LGCSE curricula. This includes localized content for History, Literature, and regional studies. Our database grows with contributions from students and educators across the SADC region.",
            },
            {
              q: "When will Prysm be available?",
              a: "Prysm launches in February 2026. Join our waitlist now to get early access, exclusive updates, and be among the first to experience the future of SADC education. Early registrants will receive priority access and special launch incentives.",
            },
            {
              q: "How does the AI Exam Hub work?",
              a: "Our AI analyzes thousands of past exam papers to identify patterns, frequently asked questions, and trending topics specific to your syllabus. Simply select your subject and exam level, and get instant insights into what topics are most likely to appear, complete with AI explanations and study recommendations.",
            },
            {
              q: "What devices can I use Prysm on?",
              a: "Prysm Phase 1 is available on web browsers. Our mobile app for iOS and Android will be available in Phase 3, bringing Focus Mode, study streaks, and notifications to your phone.",
            },
            {
              q: "Can parents access my account?",
              a: "Parent access is optional and controlled by you. In Phase 3, you can invite your parents to view your progress dashboard, which shows study time, subject progress, and upcoming exams. You maintain full control over what information is shared.",
            },
            {
              q: "How accurate are the AI exam predictions?",
              a: "Our AI predictions are based on analysis of thousands of past papers and have shown high accuracy in identifying frequently tested topics. However, we always recommend comprehensive study rather than relying solely on predictions. Use our AI insights to prioritize your revision, not replace thorough preparation.",
            },
            {
              q: "Can I upload my own exam papers?",
              a: "Yes! Our public upload feature allows students and educators to contribute exam papers to the community. All uploads are verified before being added to the database. Contributing quality content helps everyone in the SADC region access better study resources.",
            },
          ].map((faq, idx) => (
            <Card
              key={idx}
              className={`academy-card p-6 rounded-2xl cursor-pointer faq-item group transition-all duration-300 border border-[var(--border-color)] ${
                openFaq === idx ? "active" : ""
              }`}
              onClick={() => toggleFaq(idx)}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-[var(--text-primary)] text-lg group-hover:text-[var(--lime)] transition-colors">
                  {faq.q}
                </h4>
                <i className="fa-solid fa-plus text-[var(--lime)] text-lg faq-icon transition-transform duration-300"></i>
              </div>
              <div className="faq-answer">
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24 overflow-x-hidden">
        <Card className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 rounded-3xl text-center relative overflow-hidden border-2 border-[var(--lime)]/20">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--lime)]/5 to-transparent opacity-50"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-4 sm:mb-6">
              <Badge variant="purple">Launching February 2026</Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6">
              Ready to{" "}
              <span className="bg-gradient-to-r from-[var(--lime)] to-[var(--lavender)] bg-clip-text text-transparent">
                Save Your Semester?
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
              Join thousands of SADC students who are already on the waitlist.
              Be the first to experience the future of education. Sign up now to
              get early access.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2">
              <a
                href="https://forms.gle/aSoACEDfygW3aap2A"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--lime)] text-[var(--prysm-bg)] px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg inline-block text-center w-full sm:w-auto hover:shadow-[0_0_40px_var(--shadow-lime)] hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">Join Waitlist</span>
              </a>
              <a
                href="https://forms.gle/aSoACEDfygW3aap2A"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg border-2 border-[var(--border-color)] hover:border-[var(--lime)]/50 hover:bg-[var(--bg-overlay)] transition-all duration-300 inline-flex items-center justify-center w-full sm:w-auto"
              >
                Feedback
                <i className="fa-solid fa-arrow-right ml-2 text-[var(--lime)]"></i>
              </a>
            </div>
            <p className="text-sm text-[var(--text-tertiary)] mt-8">
              <i className="fa-solid fa-shield-check text-[var(--lime)] mr-2"></i>
              Free forever for core features • No credit card required
            </p>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-[var(--border-color)] overflow-x-hidden">
        {/* Desktop Footer */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-5 gap-8 mb-8">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/logo.png"
                  alt="Prysm Logo"
                  className="h-8 w-8"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div
                  className="w-8 h-8 bg-gradient-to-br from-[var(--lime)] to-[var(--lime)]/80 rounded-lg flex items-center justify-center shadow-[var(--shadow-lime)]"
                  style={{ display: "none" }}
                >
                  <span className="text-[var(--prysm-bg)] text-sm font-black">
                    P
                  </span>
                </div>
                <span className="font-extrabold tracking-tight text-[var(--text-primary)] uppercase text-xl">
                  Prysm
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                The Ultimate Student OS. Centralizing education for SADC
                students.
              </p>
              <div className="flex gap-3 text-lg text-[var(--text-secondary)]">
                <a
                  href="https://instagram.com/prysm_learn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[var(--bg-overlay)] flex items-center justify-center hover:bg-[var(--lime)]/10 hover:text-[var(--lime)] transition-all"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  href="https://tiktok.com/@prysmlearn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[var(--bg-overlay)] flex items-center justify-center hover:bg-[var(--lime)]/10 hover:text-[var(--lime)] transition-all"
                  aria-label="TikTok"
                >
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h5 className="font-bold text-[var(--text-primary)] mb-4 text-sm">
                Product
              </h5>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li>
                  <Link
                    href="/features"
                    className="hover:text-[var(--lime)] transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/examhub"
                    className="hover:text-[var(--lime)] transition-colors"
                  >
                    Exam Hub
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools"
                    className="hover:text-[var(--lime)] transition-colors"
                  >
                    Study Tools
                  </Link>
                </li>
                <li>
                  <Link
                    href="/parenthub"
                    className="hover:text-[var(--lime)] transition-colors"
                  >
                    For Parents
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className="hover:text-[var(--lime)] transition-colors"
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h5 className="font-bold text-[var(--text-primary)] mb-4 text-sm">
                Company
              </h5>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[var(--lime)] transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:support@prysmlearn.com"
                    className="hover:text-[var(--lime)] transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <Link
                    href="/tutors"
                    className="hover:text-[var(--lime)] transition-colors"
                  >
                    Tutors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/unilink"
                    className="hover:text-[var(--lime)] transition-colors"
                  >
                    Uni-Link
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Resources Column */}
            <div>
              <h5 className="font-bold text-[var(--text-primary)] mb-4 text-sm">
                Legal
              </h5>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-[var(--lime)] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-[var(--lime)] transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="hover:text-[var(--lime)] transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/acceptable-use"
                    className="hover:text-[var(--lime)] transition-colors"
                  >
                    Acceptable Use
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column - Right Side */}
            <div>
              <h5 className="font-bold text-[var(--text-primary)] mb-4 text-sm">
                Contact
              </h5>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-envelope text-[var(--lime)] text-xs"></i>
                  <a
                    href="mailto:support@prysmlearn.com"
                    className="hover:text-[var(--lime)] transition-colors"
                  >
                    support@prysmlearn.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-phone text-[var(--lime)] text-xs"></i>
                  <a
                    href="tel:+264814989258"
                    className="hover:text-[var(--lime)] transition-colors"
                  >
                    +264 81 498 9258
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-location-dot text-[var(--lime)] text-xs mt-1"></i>
                  <span>Windhoek, Namibia</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Desktop Bottom Bar */}
          <div className="flex justify-between items-center pt-8 border-t border-[var(--border-color)] text-sm text-[var(--text-tertiary)]">
            <p>
              © {new Date().getFullYear()} Prysm Learn. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="hover:text-[var(--lime)] transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-[var(--lime)] transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="hover:text-[var(--lime)] transition-colors"
              >
                Cookies
              </Link>
              <a
                href="mailto:support@prysmlearn.com"
                className="hover:text-[var(--lime)] transition-colors"
              >
                Support
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden">
          <div className="space-y-8 mb-8">
            {/* Brand Section */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img
                  src="/logo.png"
                  alt="Prysm Logo"
                  className="h-8 w-8"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div
                  className="w-8 h-8 bg-gradient-to-br from-[var(--lime)] to-[var(--lime)]/80 rounded-lg flex items-center justify-center shadow-[var(--shadow-lime)]"
                  style={{ display: "none" }}
                >
                  <span className="text-[var(--prysm-bg)] text-sm font-black">
                    P
                  </span>
                </div>
                <span className="font-extrabold tracking-tight text-[var(--text-primary)] uppercase text-xl">
                  Prysm
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                The Ultimate Student OS. Centralizing education for SADC
                students.
              </p>
              <div className="flex justify-center gap-3 text-lg text-[var(--text-secondary)]">
                <a
                  href="https://instagram.com/prysm_learn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[var(--bg-overlay)] flex items-center justify-center hover:bg-[var(--lime)]/10 hover:text-[var(--lime)] transition-all"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  href="https://tiktok.com/@prysmlearn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[var(--bg-overlay)] flex items-center justify-center hover:bg-[var(--lime)]/10 hover:text-[var(--lime)] transition-all"
                  aria-label="TikTok"
                >
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h5 className="font-bold text-[var(--text-primary)] mb-3 text-sm">
                  Product
                </h5>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>
                    <Link
                      href="/features"
                      className="hover:text-[var(--lime)] transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/examhub"
                      className="hover:text-[var(--lime)] transition-colors"
                    >
                      Exam Hub
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tools"
                      className="hover:text-[var(--lime)] transition-colors"
                    >
                      Study Tools
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/parenthub"
                      className="hover:text-[var(--lime)] transition-colors"
                    >
                      For Parents
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-[var(--text-primary)] mb-3 text-sm">
                  Company
                </h5>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-[var(--lime)] transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <a
                      href="mailto:support@prysmlearn.com"
                      className="hover:text-[var(--lime)] transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/tutors"
                      className="hover:text-[var(--lime)] transition-colors"
                    >
                      Tutors
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/community"
                      className="hover:text-[var(--lime)] transition-colors"
                    >
                      Community
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h5 className="font-bold text-[var(--text-primary)] mb-3 text-sm">
                Legal
              </h5>
              <div className="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
                <Link
                  href="/privacy"
                  className="hover:text-[var(--lime)] transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-[var(--lime)] transition-colors"
                >
                  Terms
                </Link>
                <Link
                  href="/cookies"
                  className="hover:text-[var(--lime)] transition-colors"
                >
                  Cookies
                </Link>
                <Link
                  href="/acceptable-use"
                  className="hover:text-[var(--lime)] transition-colors"
                >
                  Acceptable Use
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Bottom Bar */}
          <div className="pt-6 border-t border-[var(--border-color)] text-center">
            <p className="text-xs text-[var(--text-tertiary)] mb-3">
              © {new Date().getFullYear()} Prysm Learn. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-[var(--text-tertiary)]">
              <a
                href="mailto:support@prysmlearn.com"
                className="hover:text-[var(--lime)] transition-colors"
              >
                <i className="fa-solid fa-envelope mr-1"></i>Support
              </a>
              <span className="text-[var(--text-tertiary)]">•</span>
              <a
                href="tel:+264814989258"
                className="hover:text-[var(--lime)] transition-colors"
              >
                <i className="fa-solid fa-phone mr-1"></i>Call
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
