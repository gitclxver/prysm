"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";

export function CookieConsent() {
  // Initialize state based on localStorage
  const [showConsent, setShowConsent] = useState(() => {
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("cookie-consent");
      return !consent;
    }
    return false;
  });
  const [isAccepted, setIsAccepted] = useState(() => {
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("cookie-consent");
      return consent === "accepted";
    }
    return false;
  });

  useEffect(() => {
    if (showConsent) {
      // Block body scroll when consent is shown
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [showConsent]);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setShowConsent(false);
    setIsAccepted(true);
    // Restore body scroll
    document.body.style.overflow = "";
    // Dispatch event to notify other components
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cookie-consent-accepted"));
    }
  };

  // Block site access until cookies are accepted
  if (!isAccepted && showConsent) {
    return (
      <>
        {/* Full-screen overlay that blocks all interaction */}
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center">
          <AnimatePresence>
            {showConsent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="bg-[var(--prysm-card)] border border-[var(--lime)]/30 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-xl max-w-lg w-full mx-4 sm:mx-6"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--lime)]/20 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-cookie text-[var(--lime)] text-lg sm:text-xl"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl font-extrabold mb-2">
                      Cookie Consent Required
                    </h2>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                      We use cookies to enhance your browsing experience,
                      analyze site traffic, and personalize content. By clicking
                      &quot;Accept All&quot;, you consent to our use of cookies.
                    </p>
                    <p className="text-xs sm:text-sm text-[var(--text-tertiary)] mt-2 sm:mt-3">
                      <a
                        href="/privacy"
                        className="text-[var(--lime)] hover:underline"
                      >
                        Learn more about our privacy policy
                      </a>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    onClick={handleAccept}
                    className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base whitespace-nowrap"
                  >
                    Accept All Cookies
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>
    );
  }

  if (!showConsent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="fixed bottom-0 left-0 right-0 z-[100] bg-[var(--prysm-bg)]/90 backdrop-blur-xl border-t border-[var(--border-color)] shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
          >
            <div className="flex items-start gap-3 sm:gap-4 flex-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--lime)]/20 flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-cookie text-[var(--lime)] text-lg sm:text-xl"></i>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-extrabold mb-1 sm:mb-2">
                  Cookie Consent
                </h2>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  We use cookies to enhance your browsing experience, analyze
                  site traffic, and personalize content. By clicking
                  &quot;Accept All&quot;, you consent to our use of cookies.
                  <a
                    href="/privacy"
                    className="text-[var(--lime)] hover:underline ml-1"
                  >
                    Learn more
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-shrink-0">
              <Button
                variant="primary"
                onClick={handleAccept}
                className="px-6 py-2.5 text-sm sm:text-base whitespace-nowrap"
              >
                Accept All Cookies
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
