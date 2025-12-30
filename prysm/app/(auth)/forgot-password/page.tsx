"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { sanitizeError } from "@/lib/utils/errorHandler";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: unknown) {
      // Sanitize error to show only user-friendly messages
      const userFriendlyError = sanitizeError(err);
      setError(userFriendlyError);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <Card className="max-w-md w-full text-center">
          <div className="mb-6">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold mb-2">Check Your Email</h1>
            <p className="text-[var(--text-secondary)]">
              We&apos;ve sent a password reset link to{" "}
              <span className="text-[var(--lime)] font-semibold">{email}</span>
            </p>
          </div>

          <div className="bg-[var(--bg-overlay)] rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-[var(--text-secondary)]">
              Click the link in the email to reset your password. The link will
              expire in 1 hour.
            </p>
          </div>

          <Link href="/login">
            <Button variant="primary" className="w-full">
              Back to Login
            </Button>
          </Link>
        </Card>
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

      <Card className="max-w-md w-full">
        <div className="text-center mb-8">
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
                className="w-12 h-12 bg-gradient-to-br from-[var(--lime)] to-[var(--lime)]/80 rounded-lg flex items-center justify-center shadow-lg shadow-[var(--shadow-lime)]"
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
          <h1 className="text-3xl font-extrabold mb-2">Reset Password</h1>
          <p className="text-[var(--text-secondary)]">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--lime)] transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/login"
            className="text-sm text-[var(--lime)] hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
}
