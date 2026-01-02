"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline?: () => void;
  title?: string;
}

export function PrivacyPolicyModal({
  isOpen,
  onAccept,
  onDecline,
  title = "Privacy Policy & Terms of Service",
}: PrivacyPolicyModalProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    setScrollPosition(scrollTop);

    // Consider scrolled if user has scrolled at least 80% of the content
    if (scrollTop > (scrollHeight - clientHeight) * 0.8) {
      setHasScrolled(true);
    }
  };

  const canAccept = hasScrolled || scrollPosition > 100; // Allow accept after scrolling 100px or 80% through
  const scrollProgress = scrollPosition > 100 ? 100 : (scrollPosition / 100) * 100;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - prevents interaction with background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[var(--prysm-card)] border border-[var(--lime)]/30 rounded-2xl shadow-2xl backdrop-blur-xl relative overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="privacy-modal-title"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)] flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--lime)]/20 flex items-center justify-center">
                    <i className="fa-solid fa-shield-halved text-[var(--lime)] text-lg"></i>
                  </div>
                  <h2
                    id="privacy-modal-title"
                    className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]"
                  >
                    {title}
                  </h2>
                </div>
              </div>

              {/* Scrollable Content */}
              <div
                className="flex-1 overflow-y-auto px-6 py-4"
                onScroll={handleScroll}
                style={{ scrollbarWidth: "thin" }}
              >
                <div className="prose prose-invert max-w-none">
                  <div className="text-[var(--text-primary)] space-y-6">
                    <div>
                      <h3 className="text-lg font-bold mb-3 text-[var(--lime)]">
                        1. Introduction
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        Welcome to Prysm (&quot;we,&quot; &quot;our,&quot; or
                        &quot;us&quot;). By creating an account or using our
                        services, you agree to be bound by these Privacy Policy
                        and Terms of Service. Please read them carefully.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-3 text-[var(--lime)]">
                        2. Data Collection and Use
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
                        We collect and use your personal information to provide,
                        maintain, and improve our services:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)] ml-4">
                        <li>
                          <strong className="text-[var(--text-primary)]">
                            Account Information:
                          </strong>{" "}
                          Name, email address, username, and profile information
                          you provide
                        </li>
                        <li>
                          <strong className="text-[var(--text-primary)]">
                            Academic Data:
                          </strong>{" "}
                          School, grade level, syllabus, and educational
                          preferences
                        </li>
                        <li>
                          <strong className="text-[var(--text-primary)]">
                            Usage Data:
                          </strong>{" "}
                          How you interact with our platform, features used, and
                          study patterns
                        </li>
                        <li>
                          <strong className="text-[var(--text-primary)]">
                            Device Information:
                          </strong>{" "}
                          Browser type, device type, and IP address for security
                          and optimization
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-3 text-[var(--lime)]">
                        3. Email Communications
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
                        We will send you emails for the following purposes:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)] ml-4">
                        <li>
                          <strong className="text-[var(--text-primary)]">
                            Account Management:
                          </strong>{" "}
                          Verification emails, password resets, and security
                          notifications
                        </li>
                        <li>
                          <strong className="text-[var(--text-primary)]">
                            Service Updates:
                          </strong>{" "}
                          Important updates about your account, new features,
                          and platform changes
                        </li>
                        <li>
                          <strong className="text-[var(--text-primary)]">
                            Educational Content:
                          </strong>{" "}
                          Study tips, exam reminders, and academic resources
                        </li>
                        <li>
                          <strong className="text-[var(--text-primary)]">
                            Marketing Communications:
                          </strong>{" "}
                          Product updates, special offers, and educational
                          content (you can opt out anytime)
                        </li>
                      </ul>
                      <p className="text-[var(--text-secondary)] leading-relaxed mt-3">
                        <strong className="text-[var(--lime)]">
                          You can opt out of marketing emails at any time
                        </strong>{" "}
                        by:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)] ml-4 mt-2">
                        <li>
                          Updating your email preferences in your account
                          settings
                        </li>
                        <li>
                          Clicking the unsubscribe link in any marketing email
                        </li>
                        <li>Contacting us at support@prysmlearn.com</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-3 text-[var(--lime)]">
                        4. Data Sharing and Protection
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
                        We are committed to protecting your data:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)] ml-4">
                        <li>
                          We{" "}
                          <strong className="text-[var(--text-primary)]">
                            do not sell
                          </strong>{" "}
                          your personal information to third parties
                        </li>
                        <li>
                          We{" "}
                          <strong className="text-[var(--text-primary)]">
                            do not share
                          </strong>{" "}
                          your data except as necessary to provide our services
                          (e.g., with service providers who help us operate the
                          platform)
                        </li>
                        <li>
                          We use{" "}
                          <strong className="text-[var(--text-primary)]">
                            industry-standard security measures
                          </strong>{" "}
                          to protect your data
                        </li>
                        <li>
                          Your data is stored securely using Firebase (Google
                          Cloud Platform) with encryption
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-3 text-[var(--lime)]">
                        5. Your Rights
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
                        You have the right to:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)] ml-4">
                        <li>Access and review your personal data</li>
                        <li>Update or correct your information at any time</li>
                        <li>Delete your account and request data deletion</li>
                        <li>Opt out of marketing communications</li>
                        <li>Export your data in a portable format</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-3 text-[var(--lime)]">
                        6. Account Responsibilities
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
                        By using Prysm, you agree to:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)] ml-4">
                        <li>Provide accurate and truthful information</li>
                        <li>
                          Maintain the security of your account credentials
                        </li>
                        <li>
                          Use the platform in accordance with applicable laws
                          and regulations
                        </li>
                        <li>Not share your account with others</li>
                        <li>Respect intellectual property rights</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-3 text-[var(--lime)]">
                        7. Service Availability
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        We strive to provide reliable service but cannot
                        guarantee uninterrupted access. We reserve the right to
                        modify, suspend, or discontinue any part of our service
                        at any time.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-3 text-[var(--lime)]">
                        8. Changes to This Policy
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        We may update this Privacy Policy and Terms of Service
                        from time to time. We will notify you of significant
                        changes via email or through the platform. Continued use
                        of our services after changes constitutes acceptance of
                        the updated terms.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-3 text-[var(--lime)]">
                        9. Contact Us
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        If you have questions about this policy or your data,
                        please contact us at:
                      </p>
                      <p className="text-[var(--lime)] font-semibold mt-2">
                        Email: support@prysmlearn.com
                      </p>
                    </div>

                    <div className="bg-[var(--bg-overlay)] rounded-lg p-4 mt-6 border border-[var(--border-color)]">
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        <strong className="text-[var(--text-primary)]">
                          Last Updated:
                        </strong>{" "}
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer with Accept Button */}
              <div className="border-t border-[var(--border-color)] p-6 flex-shrink-0 bg-[var(--prysm-card)]">
                {!canAccept && (
                  <div className="mb-4 p-3 bg-[var(--lime)]/10 border border-[var(--lime)]/30 rounded-lg">
                    <p className="text-sm text-[var(--text-primary)] font-semibold flex items-center gap-2">
                      <i className="fa-solid fa-arrow-down text-[var(--lime)] animate-bounce"></i>
                      <span>Please scroll down to read the full policy before accepting</span>
                    </p>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-[var(--text-secondary)] text-center sm:text-left flex-1">
                    {canAccept ? (
                      <span className="text-[var(--lime)] font-semibold flex items-center gap-2">
                        <i className="fa-solid fa-check-circle"></i>
                        <span>Thank you for reading! You can now accept the policy.</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <i className="fa-solid fa-arrow-down text-[var(--text-tertiary)]"></i>
                        <span>Scroll down to read the complete policy</span>
                      </span>
                    )}
                  </p>
                  <div className="flex gap-3">
                    {onDecline && (
                      <Button
                        variant="outline"
                        onClick={onDecline}
                        className="px-6"
                      >
                        Decline
                      </Button>
                    )}
                    <Button
                      variant="primary"
                      onClick={onAccept}
                      disabled={!canAccept}
                      className={`px-6 transition-all duration-300 ${
                        !canAccept 
                          ? 'opacity-50 cursor-not-allowed grayscale' 
                          : 'opacity-100 cursor-pointer'
                      }`}
                    >
                      <i className={`fa-solid ${canAccept ? 'fa-check' : 'fa-lock'} mr-2`}></i>
                      Accept & Continue
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
