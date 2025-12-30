'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold mb-2">Check Your Email</h1>
            <p className="text-gray-400">
              We've sent a password reset link to <span className="text-[#d4ff80] font-semibold">{email}</span>
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-300">
              Click the link in the email to reset your password. The link will expire in 1 hour.
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
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <Card className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold mb-2">Reset Password</h1>
          <p className="text-gray-400">
            Enter your email address and we'll send you a link to reset your password.
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
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d4ff80] transition-colors"
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
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/login"
            className="text-sm text-[#d4ff80] hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
}

