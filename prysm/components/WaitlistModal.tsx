"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Badge } from "./Badge";

export function WaitlistModal() {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Check if cookie consent has been accepted first
    const cookieConsent = localStorage.getItem("cookie-consent");

    function checkAndShowModal() {
      // Don't show if user is logged in
      if (user) {
        setIsVisible(false);
        return;
      }

      // Check if modal was dismissed
      const dismissed = localStorage.getItem("waitlist-modal-dismissed");
      if (dismissed === "true") {
        setIsVisible(false);
        return;
      }

      // Show after 2 seconds (only after cookie consent)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    }

    if (cookieConsent !== "accepted") {
      // Listen for cookie consent acceptance
      const handleCookieAccept = () => {
        checkAndShowModal();
      };
      window.addEventListener("cookie-consent-accepted", handleCookieAccept);
      return () => {
        window.removeEventListener(
          "cookie-consent-accepted",
          handleCookieAccept
        );
      };
    } else {
      return checkAndShowModal();
    }
  }, [user]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("waitlist-modal-dismissed", "true");
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleDismiss();
    }
  };

  if (user) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[var(--prysm-card)] border border-[var(--lime)]/30 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden max-w-md w-full mx-4 sm:mx-6 pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="waitlist-modal-title"
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--lime)]/20 to-[var(--lavender)]/20 blur-xl opacity-50"></div>

              <div className="relative">
                <button
                  onClick={handleDismiss}
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[var(--bg-overlay)] hover:bg-red-500/20 flex items-center justify-center text-[var(--text-secondary)] hover:text-red-400 transition-all z-10"
                  aria-label="Close modal"
                  type="button"
                >
                  <i className="fa-solid fa-times text-sm"></i>
                </button>

                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[var(--lime)] to-[var(--lime)]/80 flex items-center justify-center flex-shrink-0 shadow-lg shadow-[var(--shadow-lime)]">
                    <i className="fa-solid fa-star text-[var(--prysm-bg)] text-xl sm:text-2xl"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <Badge variant="founders" className="text-xs">
                        Founders Badge
                      </Badge>
                    </div>
                    <h3
                      id="waitlist-modal-title"
                      className="text-lg sm:text-xl md:text-2xl font-extrabold mb-2"
                    >
                      Join the Waitlist
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
                      Be among the first 200 users and earn your honorary
                      student badge! Get early access to Prysm and help shape
                      the future of education.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Link
                    href="/login"
                    onClick={handleDismiss}
                    className="flex-1 bg-[var(--lime)] text-[var(--prysm-bg)] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base text-center hover:bg-[var(--lime)]/80 transition-all duration-300 shadow-lg shadow-[var(--shadow-lime)] hover:shadow-xl hover:shadow-[var(--shadow-lime)] hover:scale-105"
                  >
                    Join Now
                  </Link>
                  <button
                    onClick={handleDismiss}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[var(--bg-overlay)] text-[var(--text-secondary)] rounded-lg font-semibold text-sm sm:text-base hover:bg-[var(--bg-overlay-hover)] transition-all"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
