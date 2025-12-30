'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

export default function VerifyEmailPage() {
  const { user, sendVerificationEmail, loading } = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  const [checking, setChecking] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    
    if (user?.emailVerified) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleResendEmail = async () => {
    try {
      await sendVerificationEmail();
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 5000);
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };

  const handleCheckVerification = async () => {
    setChecking(true);
    // Reload user to check verification status
    await user?.reload();
    if (user?.emailVerified) {
      router.push('/dashboard');
    }
    setChecking(false);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <Card className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-20 h-20 rounded-full bg-[#d4ff80]/20 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-[#d4ff80]"
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
          <p className="text-gray-400">
            We've sent a verification email to
          </p>
          <p className="text-[#d4ff80] font-semibold mt-1">{user.email}</p>
        </div>

        <div className="bg-white/5 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-300 mb-2">
            <strong className="text-white">Steps to verify:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-400">
            <li>Check your email inbox</li>
            <li>Click the verification link in the email</li>
            <li>Return here and click "I've verified"</li>
          </ol>
        </div>

        {emailSent && (
          <div className="mb-4 p-3 bg-[#d4ff80]/10 border border-[#d4ff80]/20 rounded-lg text-[#d4ff80] text-sm">
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
            {checking ? 'Checking...' : "I've Verified My Email"}
          </Button>

          <Button
            variant="secondary"
            className="w-full"
            onClick={handleResendEmail}
          >
            Resend Verification Email
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Didn't receive the email? Check your spam folder or try resending.
        </p>
      </Card>
    </div>
  );
}

