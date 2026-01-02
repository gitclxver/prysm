"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export default function AccountDeletedPage() {
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
          <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-trash text-orange-400 text-3xl"></i>
          </div>
          <h1 className="text-3xl font-extrabold mb-2">Account Deleted</h1>
          <p className="text-[var(--text-secondary)]">
            Your account has been marked for deletion
          </p>
        </div>

        <div className="bg-[var(--bg-overlay)] rounded-lg p-6 mb-6 text-left">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[var(--lime)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i className="fa-solid fa-clock text-[var(--lime)]"></i>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-extrabold mb-2 text-[var(--text-primary)]">
                21-Day Recovery Window
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                Your account has been marked as deleted, but you have <strong className="text-[var(--lime)]">21 days</strong> to recover it. Simply sign in with your email and password, and your account will be automatically restored.
              </p>
              <div className="bg-[var(--prysm-bg)]/50 rounded-lg p-4 mt-4">
                <p className="text-xs text-[var(--text-secondary)]">
                  <i className="fa-solid fa-info-circle text-[var(--lime)] mr-2"></i>
                  After 21 days, your account and all associated data will be permanently deleted and cannot be recovered.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link href="/login">
            <Button variant="primary" className="w-full">
              <i className="fa-solid fa-sign-in-alt mr-2"></i>
              Sign In to Recover Account
            </Button>
          </Link>
          <Link href="/">
            <Button variant="secondary" className="w-full">
              <i className="fa-solid fa-home mr-2"></i>
              Back to Home
            </Button>
          </Link>
        </div>

        <p className="text-xs text-[var(--text-tertiary)] mt-6">
          Need help? Contact our support team for assistance.
        </p>
      </Card>
    </div>
  );
}

