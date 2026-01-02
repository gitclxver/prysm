"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { auth } from "@/lib/firebase/config";
import { sanitizeError } from "@/lib/utils/errorHandler";

function VerifyEmailContent() {
  const { user, sendVerificationEmail, loading } = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    // Check if user is coming from email verification link (Firebase handles verification automatically)
    // Firebase redirects to continueUrl after verifying, so we check if email is now verified
    const checkVerification = async () => {
      if (user) {
        // Reload user to check if email was just verified
        await user.reload();
        if (user.emailVerified) {
          // Email was verified, redirect to dashboard
          router.push("/dashboard");
        }
      }
    };

    // Check if coming from verification link (URL has verified=true param)
    const isFromVerificationLink = searchParams.get('verified') === 'true';
    
    if (isFromVerificationLink) {
      // User clicked verification link - check verification status
      checkVerification();
      // Also check after a short delay (in case Firebase is still processing)
      const timeout = setTimeout(checkVerification, 1000);
      return () => clearTimeout(timeout);
    } else if (user?.emailVerified) {
      // User is already verified, redirect to dashboard
      router.push("/dashboard");
    }
  }, [user, loading, router, searchParams]);

  const handleResendEmail = async () => {
    try {
      setResending(true);
      setError("");
      await sendVerificationEmail();
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 5000);
    } catch (err) {
      console.error("Error sending verification email:", err);
      const friendlyError = sanitizeError(err);
      if (friendlyError) {
        setError(friendlyError);
      } else {
        setError("Failed to send verification email. Please try again.");
      }
    } finally {
      setResending(false);
    }
  };

  // Send email automatically on page load if not already sent
  useEffect(() => {
    if (user && !user.emailVerified && !emailSent) {
      // Auto-send verification email when page loads
      sendVerificationEmail().catch((error) => {
        console.error("Error sending verification email:", error);
      });
      setEmailSent(true); // Mark as sent to prevent multiple sends
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--prysm-bg)]">
        <div className="text-[var(--text-primary)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative bg-[var(--prysm-bg)]">
      {/* Back to Website Link */}
      <Link
        href="/"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--lime)] transition-colors group"
      >
        <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
        <span className="font-semibold">Back to Website</span>
      </Link>

      <Card className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative w-12 h-12">
              <Image
                src="/logo.png"
                alt="Prysm Logo"
                width={48}
                height={48}
                className="rounded-lg"
                priority
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div
                className="w-12 h-12 bg-gradient-to-br from-[var(--lime)] to-[var(--lime)]/80 rounded-lg flex items-center justify-center shadow-[var(--shadow-lime)]"
                style={{ display: "none" }}
              >
                <span className="text-[var(--prysm-bg)] text-lg font-black">
                  P
                </span>
              </div>
            </div>
            <span className="font-extrabold tracking-tight text-[var(--text-primary)] uppercase text-2xl">
              Prysm
            </span>
          </div>
          <div className="w-20 h-20 rounded-full bg-[var(--lime)]/20 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-[var(--lime)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold mb-2">Verify Your Email</h1>
          <p className="text-[var(--text-secondary)]">
            We&apos;ve sent a verification email to
          </p>
          <p className="text-[var(--lime)] font-semibold mt-1">{user.email}</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="bg-[var(--bg-overlay)] rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-[var(--text-secondary)] mb-2">
            <strong className="text-[var(--text-primary)]">
              Steps to verify:
            </strong>
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sm text-[var(--text-secondary)]">
            <li>Check your email inbox</li>
            <li>Click the verification link in the email</li>
            <li>You&apos;ll be automatically redirected and verified</li>
          </ol>
        </div>

        {emailSent && !error && (
          <div className="mb-4 p-3 bg-[var(--lime)]/10 border border-[var(--lime)]/20 rounded-lg text-[var(--lime)] text-sm">
            Verification email sent! Check your inbox.
          </div>
        )}

        <div className="space-y-3">
          <Button
            variant="secondary"
            className="w-full"
            onClick={handleResendEmail}
            disabled={resending}
          >
            {resending ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Sending...
              </>
            ) : (
              <>
                <i className="fa-solid fa-envelope mr-2"></i>
                Resend Verification Email
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-[var(--text-tertiary)] mt-6">
          Didn&apos;t receive the email? Check your spam folder or try
          resending.
        </p>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--prysm-bg)]">
        <Card className="max-w-md w-full text-center">
          <div className="w-16 h-16 border-4 border-[var(--lime)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--text-primary)]">Loading...</p>
        </Card>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
