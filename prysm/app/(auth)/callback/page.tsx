'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/Card';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signInWithEmailLink, isPasswordlessLink } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email link...');

  useEffect(() => {
    const handleAuth = async () => {
      try {
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

        // Get the full URL including the query parameters
        const fullUrl = window.location.href;
        
        // Check if this is a passwordless link
        if (!isPasswordlessLink(fullUrl)) {
          setStatus('error');
          setMessage('Invalid or expired link. Please request a new sign-in link.');
          return;
        }

        // Sign in with the email link
        await signInWithEmailLink(email, fullUrl);
        
        setStatus('success');
        setMessage('Successfully signed in! Redirecting to dashboard...');
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } catch (error: any) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setMessage(error.message || 'An error occurred while signing in. Please try again.');
      }
    };

    handleAuth();
  }, [searchParams, signInWithEmailLink, isPasswordlessLink, router]);

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

