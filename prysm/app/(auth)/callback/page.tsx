'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/Card';
import { auth } from '@/lib/firebase/config';
import { isSignInWithEmailLink, signInWithEmailLink as firebaseSignInWithEmailLink } from 'firebase/auth';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUserProfile } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email link...');

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Get the full current URL
        const fullUrl = window.location.href;
        
        // Check if this is a passwordless link using Firebase's built-in function
        if (!isSignInWithEmailLink(auth, fullUrl)) {
          setStatus('error');
          setMessage('Invalid or expired link. Please request a new sign-in link.');
          return;
        }

        // Get email from URL params or localStorage
        const emailFromUrl = searchParams.get('email');
        const emailFromStorage = typeof window !== 'undefined' 
          ? localStorage.getItem('emailForSignIn')
          : null;
        
        const email = emailFromUrl || emailFromStorage;
        
        if (!email) {
          setStatus('error');
          setMessage('No email found. Please try signing in again.');
          return;
        }

        // Sign in with the email link using Firebase's built-in function
        await firebaseSignInWithEmailLink(auth, email, fullUrl);
        
        // Clear stored email
        if (typeof window !== 'undefined') {
          localStorage.removeItem('emailForSignIn');
        }

        // Refresh user profile
        await refreshUserProfile();
        
        setStatus('success');
        setMessage('Successfully signed in! Redirecting to dashboard...');
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } catch (error: unknown) {
        console.error('Auth callback error:', error);
        setStatus('error');
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'An error occurred while signing in. Please try again.';
        setMessage(errorMessage);
      }
    };

    handleAuth();
  }, [searchParams, refreshUserProfile, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <Card className="max-w-md w-full">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-[var(--lime)] to-[var(--lime)]/80 rounded-lg flex items-center justify-center shadow-lg shadow-[var(--shadow-lime)]">
              <span className="text-[var(--prysm-bg)] text-sm font-black">P</span>
            </div>
            <span className="font-extrabold tracking-tight text-[var(--text-primary)] uppercase text-2xl">
              Prysm
            </span>
          </div>

          {status === 'loading' && (
            <>
              <div className="w-16 h-16 border-4 border-[var(--lime)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h1 className="text-2xl font-extrabold mb-2">Verifying...</h1>
              <p className="text-[var(--text-secondary)]">{message}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-check text-green-400 text-2xl"></i>
              </div>
              <h1 className="text-2xl font-extrabold mb-2 text-green-400">Success!</h1>
              <p className="text-[var(--text-secondary)]">{message}</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-exclamation-triangle text-red-400 text-2xl"></i>
              </div>
              <h1 className="text-2xl font-extrabold mb-2 text-red-400">Error</h1>
              <p className="text-[var(--text-secondary)] mb-6">{message}</p>
              <button
                onClick={() => router.push('/login')}
                className="px-6 py-3 bg-[var(--lime)] text-[var(--prysm-bg)] font-bold rounded-lg hover:bg-[var(--lime)]/80 transition-colors"
              >
                Go to Login
              </button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <Card className="max-w-md w-full">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--lime)] to-[var(--lime)]/80 rounded-lg flex items-center justify-center shadow-lg shadow-[var(--shadow-lime)]">
                <span className="text-[var(--prysm-bg)] text-sm font-black">P</span>
              </div>
              <span className="font-extrabold tracking-tight text-[var(--text-primary)] uppercase text-2xl">
                Prysm
              </span>
            </div>
            <div className="w-16 h-16 border-4 border-[var(--lime)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h1 className="text-2xl font-extrabold mb-2">Loading...</h1>
            <p className="text-[var(--text-secondary)]">Verifying your email link...</p>
          </div>
        </Card>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}

