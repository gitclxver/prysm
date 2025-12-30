"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export default function VerifyEmailPage() {
  const { user, sendVerificationEmail, loading } = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  const [checking, setChecking] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }

    if (user?.emailVerified) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleResendEmail = async () => {
    try {
      await sendVerificationEmail();
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 5000);
    } catch (error) {
      // Error is logged but not shown to user to avoid exposing stack
      console.error("Error sending verification email:", error);
      // Could add a toast notification here if needed
    }
  };

  const handleCheckVerification = async () => {
    setChecking(true);
    // Reload user to check verification status
    await user?.reload();
    if (user?.emailVerified) {
      router.push("/dashboard");
    }
    setChecking(false);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--text-primary)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative">
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

        <div className="bg-[var(--bg-overlay)] rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-[var(--text-secondary)] mb-2">
            <strong className="text-[var(--text-primary)]">
              Steps to verify:
            </strong>
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sm text-[var(--text-secondary)]">
            <li>Check your email inbox</li>
            <li>Click the verification link in the email</li>
            <li>Return here and click &quot;I&apos;ve verified&quot;</li>
          </ol>
        </div>

        {emailSent && (
          <div className="mb-4 p-3 bg-[var(--lime)]/10 border border-[var(--lime)]/20 rounded-lg text-[var(--lime)] text-sm">
            Verification email sent! Check your inbox.
          </div>
        )}

        <div className="space-y-3">
          <Button
            variant="primary"
            className="w-full"
            onClick={handleCheckVerification}
            disabled={checking}
          >
            {checking ? "Checking..." : "I've Verified My Email"}
          </Button>

          <Button
            variant="secondary"
            className="w-full"
            onClick={handleResendEmail}
          >
            Resend Verification Email
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
