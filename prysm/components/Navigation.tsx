"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import { MobileSidebar } from "./MobileSidebar";
import { getUserAvatarUrl } from "@/lib/avatar";

export function Navigation() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, userProfile, signOut, loading } = useAuth();
  const displayName = userProfile?.displayName || user?.displayName || user?.email || "User";
  const displayText = userProfile?.username || displayName;
  const avatarUrl = getUserAvatarUrl(
    displayName,
    userProfile?.photoURL || user?.photoURL || null,
    32
  );

  // Detect scroll to make header sticky
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setIsScrolled(scrollY > 50); // Become sticky after scrolling 50px
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    await signOut();
  };

  const handleEditProfile = () => {
    setDropdownOpen(false);
    router.push("/profile");
  };

  return (
    <nav
      className={`${isScrolled ? 'fixed' : 'relative'} top-0 left-0 right-0 z-50 bg-[var(--prysm-bg)]/95 backdrop-blur-xl border-b border-[var(--border-color)] px-4 sm:px-6 py-4 ${isScrolled ? 'shadow-lg shadow-[var(--shadow-color)]' : ''}`}
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
              animate={loading ? {
                scale: [1, 1.1, 1],
                opacity: [1, 0.7, 1],
              } : {}}
              transition={loading ? {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              } : { type: "spring", stiffness: 400 }}
              whileHover={!loading ? { scale: 1.1, rotate: 5 } : {}}
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
              
              {/* User Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 sm:gap-3 group focus:outline-none"
                  aria-label="User menu"
                  aria-expanded={dropdownOpen}
                >
                  <motion.img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[var(--lime)]/30 group-hover:border-[var(--lime)]/60 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  <span className="hidden md:block font-semibold text-[var(--text-primary)] group-hover:text-[var(--lime)] transition-colors">
                    {displayText}
                  </span>
                  <i className={`fa-solid fa-chevron-down text-xs text-[var(--text-tertiary)] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}></i>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-[var(--prysm-card)] border border-[var(--border-color)] rounded-lg shadow-xl z-50 overflow-hidden"
                    >
                      <div className="py-1">
                        <button
                          onClick={handleEditProfile}
                          className="w-full px-4 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] transition-colors flex items-center gap-2"
                        >
                          <i className="fa-solid fa-user-edit w-4"></i>
                          <span>Edit Profile</span>
                        </button>
                        <button
                          onClick={handleSignOut}
                          className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                        >
                          <i className="fa-solid fa-sign-out-alt w-4"></i>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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
                <Button variant="secondary">Login</Button>
              </Link>
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
