"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import { getUserAvatarUrl } from "@/lib/avatar";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const { user, userProfile } = useAuth();
  const sidebarRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const avatarUrl = getUserAvatarUrl(
    userProfile?.displayName || user?.displayName || user?.email || "User",
    userProfile?.photoURL || user?.photoURL || null,
    32
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/features", label: "Features", icon: "fa-sparkles" },
    { href: "/examhub", label: "Exams", icon: "fa-file-invoice" },
    { href: "/tools", label: "Tools", icon: "fa-toolbox" },
    { href: "/community", label: "Community", icon: "fa-users" },
    { href: "/parenthub", label: "Parents", icon: "fa-user-group" },
    { href: "/about", label: "About", icon: "fa-info-circle" },
  ];

  const sidebarContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={backdropRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] lg:hidden"
            onClick={onClose}
            aria-hidden="true"
            style={{ position: "fixed", zIndex: 9998 }}
          />

          {/* Sidebar - 70% width from right */}
          <motion.aside
            ref={sidebarRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-[70%] max-w-md bg-[var(--prysm-card)] border-l border-[var(--border-color)] z-[9999] lg:hidden overflow-y-auto shadow-2xl"
            role="complementary"
            aria-label="Mobile navigation"
            style={{ position: "fixed", zIndex: 9999 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[var(--border-color)]">
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center gap-2 sm:gap-3 group"
                >
                  <img
                    src="/logo.png"
                    alt="Prysm Logo"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--lime)] to-[var(--lime)]/80 rounded-lg flex items-center justify-center shadow-[var(--shadow-lime)]"
                    style={{ display: "none" }}
                  >
                    <span className="text-[var(--prysm-bg)] text-sm sm:text-base font-black">
                      P
                    </span>
                  </div>
                  <span className="font-extrabold tracking-tight text-[var(--text-primary)] uppercase text-lg sm:text-xl group-hover:text-[var(--lime)] transition-colors">
                    Prysm
                  </span>
                </Link>
                <div className="flex items-center gap-2 sm:gap-3">
                  <ThemeToggle />
                  <button
                    onClick={onClose}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--lime)] transition-colors"
                    aria-label="Close menu"
                  >
                    <i className="fa-solid fa-times text-xl sm:text-2xl"></i>
                  </button>
                </div>
              </div>

              {/* User Info (if logged in) */}
              {user && (
                <div className="p-4 sm:p-6 border-b border-[var(--border-color)] bg-[var(--bg-overlay)]">
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[var(--lime)]/30"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-base sm:text-lg text-[var(--text-primary)] truncate">
                        {userProfile?.username ||
                          userProfile?.displayName ||
                          user?.displayName ||
                          "User"}
                      </p>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] truncate">
                        {userProfile?.displayName && userProfile?.username
                          ? userProfile.displayName
                          : user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <nav
                className="flex-1 p-4 sm:p-6 space-y-2 sm:space-y-3 overflow-y-auto"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 rounded-lg text-base sm:text-lg text-[var(--text-secondary)] hover:text-[var(--lime)] hover:bg-[var(--bg-overlay)] transition-all group"
                  >
                    <i
                      className={`fa-solid ${link.icon} w-5 sm:w-6 text-center text-lg sm:text-xl`}
                    ></i>
                    <span className="font-semibold">{link.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Footer Actions */}
              <div className="p-4 sm:p-6 border-t border-[var(--border-color)] space-y-3 sm:space-y-4">
                {user ? (
                  <>
                    <Link href="/dashboard" onClick={onClose}>
                      <Button variant="primary" className="w-full">
                        <i className="fa-solid fa-gauge mr-2"></i>
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/profile" onClick={onClose}>
                      <Button variant="secondary" className="w-full">
                        <i className="fa-solid fa-user mr-2"></i>
                        Profile
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link href="/login" onClick={onClose}>
                    <Button variant="primary" className="w-full">
                      <i className="fa-solid fa-star mr-2"></i>
                      Join Waitlist
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  // Render to document.body via portal to bypass Navigation's stacking context
  // Only render portal on client side (after mount)
  if (typeof window === "undefined") return null;
  return createPortal(sidebarContent, document.body);
}
