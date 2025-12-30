"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import { MobileSidebar } from "./MobileSidebar";
import { getUserAvatarUrl } from "@/lib/avatar";

export function Navigation() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user, userProfile } = useAuth();
  const displayName = userProfile?.displayName || user?.displayName || user?.email || "User";
  const displayText = userProfile?.username || displayName;
  const avatarUrl = getUserAvatarUrl(
    displayName,
    userProfile?.photoURL || user?.photoURL || null,
    32
  );

  return (
    <nav
      className="sticky top-0 z-50 bg-[var(--prysm-bg)]/95 backdrop-blur-xl border-b border-[var(--border-color)] px-4 sm:px-6 py-4 shadow-lg shadow-[var(--shadow-color)]"
      style={{ isolation: "isolate" }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <motion.img
              src="/logo.png"
              alt="Prysm Logo - The Ultimate Student OS"
              className="h-8 w-8 rounded-lg"
              width="32"
              height="32"
              loading="eager"
              fetchPriority="high"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              style={{ willChange: "transform" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget
                  .nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div
              className="w-8 h-8 bg-gradient-to-br from-[var(--lime)] to-[var(--lime)]/80 rounded-lg flex items-center justify-center shadow-lg shadow-[var(--shadow-lime)]"
              style={{ display: "none" }}
            >
              <span className="text-[var(--prysm-bg)] text-sm font-black">
                P
              </span>
            </div>
            <span className="font-extrabold tracking-tight text-[var(--text-primary)] uppercase text-lg sm:text-xl group-hover:text-[var(--lime)] transition-colors">
              Prysm
            </span>
          </Link>
          <nav
            className="hidden lg:flex gap-6 xl:gap-10 text-sm font-semibold"
            aria-label="Main navigation"
          >
            <Link
              href="/features"
              className="nav-link text-[var(--text-secondary)] hover:text-[var(--lime)] relative"
              aria-label="View Features"
            >
              Features
            </Link>
            <Link
              href="/examhub"
              className="nav-link text-[var(--text-secondary)] hover:text-[var(--lime)] relative"
              aria-label="Browse Exam Hub"
            >
              Exams
            </Link>
            <Link
              href="/tools"
              className="nav-link text-[var(--text-secondary)] hover:text-[var(--lime)] relative"
              aria-label="Explore Tools"
            >
              Tools
            </Link>
            <Link
              href="/community"
              className="nav-link text-[var(--text-secondary)] hover:text-[var(--lime)] relative"
              aria-label="Join Community"
            >
              Community
            </Link>
            <Link
              href="/parenthub"
              className="nav-link text-[var(--text-secondary)] hover:text-[var(--lime)] relative"
              aria-label="Parent Hub"
            >
              Parents
            </Link>
            <Link
              href="/about"
              className="nav-link text-[var(--text-secondary)] hover:text-[var(--lime)] relative"
              aria-label="About Prysm"
            >
              About
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/dashboard" className="hidden sm:block">
                <Button variant="secondary">Dashboard</Button>
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-2 sm:gap-3 group"
              >
                <motion.img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[var(--lime)]/30"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
                <span className="hidden md:block font-semibold text-[var(--text-primary)] group-hover:text-[var(--lime)] transition-colors">
                  {displayText}
                </span>
              </Link>
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--lime)] transition-colors"
                aria-label="Open menu"
              >
                <i className="fa-solid fa-bars text-xl"></i>
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block">
                <Button variant="primary">Join Waitlist</Button>
              </Link>
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--lime)] transition-colors"
                aria-label="Open menu"
              >
                <i className="fa-solid fa-bars text-xl"></i>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />
    </nav>
  );
}
