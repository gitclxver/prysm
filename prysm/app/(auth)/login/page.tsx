"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PrivacyPolicyModal } from "@/components/PrivacyPolicyModal";
import { sanitizeError } from "@/lib/utils/errorHandler";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [usePasswordless, setUsePasswordless] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [pendingAction, setPendingAction] = useState<"email" | "google" | null>(
    null
  );
  const { signIn, signUp, signInWithGoogle, sendPasswordlessLink, user } =
    useAuth();
  const router = useRouter();

  // Redirect if already logged in
  if (user) {
    router.push("/dashboard");
    return null;
  }

  const handleEmailAuth = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // For sign-up, check if privacy policy is accepted
    if (isSignUp && !privacyAccepted) {
      setError(
        "Please accept the Privacy Policy and Terms of Service to continue"
      );
      setShowPrivacyModal(true);
      return;
    }

    setLoading(true);

    try {
      // Handle passwordless authentication
      if (usePasswordless) {
        if (isSignUp) {
          if (!displayName.trim()) {
            setError("Full name is required");
            setLoading(false);
            return;
          }
          if (!username.trim()) {
            setError("Username is required");
            setLoading(false);
            return;
          }
          if (!/^[a-zA-Z0-9_]{3,20}$/.test(username.trim())) {
            setError(
              "Username must be 3-20 characters and contain only letters, numbers, and underscores"
            );
            setLoading(false);
            return;
          }
          if (!privacyAccepted) {
            setError("Please accept the Privacy Policy and Terms of Service");
            setShowPrivacyModal(true);
            setLoading(false);
            return;
          }
        }
        await sendPasswordlessLink(email, isSignUp ? displayName : undefined);
        setSuccess(
          `We've sent a sign-in link to ${email}. Please check your inbox and click the link to continue.`
        );
        setLoading(false);
        return;
      }

      // Handle traditional email/password authentication
      if (isSignUp) {
        if (!displayName.trim()) {
          setError("Full name is required");
          setLoading(false);
          return;
        }
        if (!username.trim()) {
          setError("Username is required");
          setLoading(false);
          return;
        }
        if (!/^[a-zA-Z0-9_]{3,20}$/.test(username.trim())) {
          setError(
            "Username must be 3-20 characters and contain only letters, numbers, and underscores"
          );
          setLoading(false);
          return;
        }
        if (!privacyAccepted) {
          setError("Please accept the Privacy Policy and Terms of Service");
          setShowPrivacyModal(true);
          setLoading(false);
          return;
        }
        await signUp(
          email,
          password,
          displayName,
          username.trim(),
          privacyAccepted
        );
        router.push("/verify-email");
      } else {
        await signIn(email, password);
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      // Sanitize error to show only user-friendly messages
      const userFriendlyError = sanitizeError(err);
      setError(userFriendlyError);
    } finally {
      setLoading(false);
    }
  };

  const executeGoogleSignIn = async () => {
    setLoading(true);

    try {
      await signInWithGoogle(privacyAccepted);
      router.push("/dashboard");
    } catch (err: unknown) {
      // Sanitize error to show only user-friendly messages
      // If popup was closed by user, don't show any error
      const userFriendlyError = sanitizeError(err);
      if (userFriendlyError) {
        setError(userFriendlyError);
      }
      // If empty string returned, user closed popup - silently ignore
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");

    // Check if privacy policy is accepted first
    if (!privacyAccepted) {
      setPendingAction("google");
      setShowPrivacyModal(true);
      return;
    }

    await executeGoogleSignIn();
  };

  const handlePrivacyAccept = () => {
    setPrivacyAccepted(true);
    setShowPrivacyModal(false);

    // If there was a pending action, execute it
    if (pendingAction === "google") {
      setPendingAction(null);
      executeGoogleSignIn();
    }
  };

  const handlePrivacyDecline = () => {
    setShowPrivacyModal(false);
    setPendingAction(null);
    setError(
      "You must accept the Privacy Policy and Terms of Service to create an account"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative">
      {/* Back to Website Link */}
      <Link
        href="/"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--lime)] transition-colors group z-10"
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
          <h1 className="text-3xl font-extrabold mb-2">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-[var(--text-secondary)]">
            {isSignUp
              ? "Join the first 200 users and get early access"
              : "Sign in to continue to your account"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
            <div className="flex items-start gap-2">
              <i className="fa-solid fa-envelope-circle-check mt-0.5"></i>
              <div>
                <p className="font-semibold mb-1">Check your email!</p>
                <p>{success}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
          {isSignUp && (
            <>
              <div>
                <label
                  htmlFor="displayName"
                  className="block text-sm font-semibold mb-2"
                >
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-4 py-3 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--lime)] transition-colors"
                  placeholder="Enter Your Full Name"
                  required
                  minLength={2}
                />
                <p className="text-xs text-[var(--text-tertiary)] mt-1">
                  This will be displayed on your profile
                </p>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold mb-2"
                >
                  Username <span className="text-red-400">*</span>
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")
                    )
                  }
                  className="w-full px-4 py-3 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--lime)] transition-colors"
                  placeholder="Enter Your Username"
                  required
                  minLength={3}
                  maxLength={20}
                  pattern="[a-zA-Z0-9_]{3,20}"
                />
                <p className="text-xs text-[var(--text-tertiary)] mt-1">
                  3-20 characters, letters, numbers, and underscores only
                </p>
              </div>
            </>
          )}

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
              placeholder="Enter Your Email"
              required
            />
          </div>

          {!usePasswordless && (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--bg-overlay)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--lime)] transition-colors"
                placeholder="Enter Your Password"
                required
                minLength={6}
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="passwordless"
              checked={usePasswordless}
              onChange={(e) => {
                setUsePasswordless(e.target.checked);
                setPassword("");
                setError("");
                setSuccess("");
              }}
              className="w-4 h-4 rounded border-[var(--border-color)] bg-[var(--bg-overlay)] text-[var(--lime)] focus:ring-[var(--lime)] focus:ring-offset-0"
            />
            <label
              htmlFor="passwordless"
              className="text-xs sm:text-sm text-[var(--text-secondary)] cursor-pointer"
            >
              Sign in with email link (no password required)
            </label>
          </div>

          {!isSignUp && (
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-[var(--lime)] hover:underline"
              >
                Forgot password?
              </a>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading || !!success}
          >
            {loading
              ? "Loading..."
              : success
              ? "Link Sent!"
              : usePasswordless
              ? isSignUp
                ? "Send Sign-Up Link"
                : "Send Sign-In Link"
              : isSignUp
              ? "Sign Up"
              : "Sign In"}
          </Button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--border-color)]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[var(--prysm-card)] text-[var(--text-secondary)]">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          className="w-full mb-6"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </div>
        </Button>

        <div className="text-center text-sm text-[var(--text-secondary)]">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsSignUp(false)}
                className="text-[var(--lime)] hover:underline font-semibold"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setIsSignUp(true)}
                className="text-[var(--lime)] hover:underline font-semibold"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </Card>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onAccept={handlePrivacyAccept}
        onDecline={handlePrivacyDecline}
      />
    </div>
  );
}
