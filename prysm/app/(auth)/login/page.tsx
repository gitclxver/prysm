'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [usePasswordless, setUsePasswordless] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, signInWithGoogle, sendPasswordlessLink, user } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  if (user) {
    router.push('/dashboard');
    return null;
  }

  const handleEmailAuth = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Handle passwordless authentication
      if (usePasswordless) {
        if (isSignUp && !displayName.trim()) {
          setError('Display name is required');
          setLoading(false);
          return;
        }
        await sendPasswordlessLink(email, isSignUp ? displayName : undefined);
        setSuccess(`We've sent a sign-in link to ${email}. Please check your inbox and click the link to continue.`);
        setLoading(false);
        return;
      }

      // Handle traditional email/password authentication
      if (isSignUp) {
        if (!displayName.trim()) {
          setError('Display name is required');
          setLoading(false);
          return;
        }
        await signUp(email, password, displayName);
        router.push('/verify-email');
      } else {
        await signIn(email, password);
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <Card className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-lime-300 rounded-lg flex items-center justify-center shadow-lg shadow-lime-400/30">
              <span className="text-[#120d2b] text-sm font-black">P</span>
            </div>
            <span className="font-extrabold tracking-tight text-white uppercase text-2xl">
              Prysm
            </span>
          </div>
          <h1 className="text-3xl font-extrabold mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-400">
            {isSignUp
              ? 'Join the first 200 users and get early access'
              : 'Sign in to continue to your account'}
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
            <div>
              <label htmlFor="displayName" className="block text-sm font-semibold mb-2">
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d4ff80] transition-colors"
                placeholder="Enter your name"
                required
              />
            </div>
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
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d4ff80] transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>

          {!usePasswordless && (
            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d4ff80] transition-colors"
                placeholder="••••••••"
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
                setPassword('');
                setError('');
                setSuccess('');
              }}
              className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#d4ff80] focus:ring-[#d4ff80] focus:ring-offset-0"
            />
            <label htmlFor="passwordless" className="text-sm text-gray-400 cursor-pointer">
              Sign in with email link (no password required)
            </label>
          </div>

          {!isSignUp && (
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-[#d4ff80] hover:underline"
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
              ? 'Loading...' 
              : success 
                ? 'Link Sent!' 
                : usePasswordless 
                  ? (isSignUp ? 'Send Sign-Up Link' : 'Send Sign-In Link')
                  : (isSignUp ? 'Sign Up' : 'Sign In')
            }
          </Button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#1d163d] text-gray-400">Or continue with</span>
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

        <div className="text-center text-sm text-gray-400">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setIsSignUp(false)}
                className="text-[#d4ff80] hover:underline font-semibold"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => setIsSignUp(true)}
                className="text-[#d4ff80] hover:underline font-semibold"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

