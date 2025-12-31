'use client';

import { useEffect, useState, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/Card';
import { auth } from '@/lib/firebase/config';
import { isSignInWithEmailLink, signInWithEmailLink as firebaseSignInWithEmailLink } from 'firebase/auth';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUserProfile, userProfile } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email link...');
  const hasRunRef = useRef(false);

  useEffect(() => {
    // Prevent running multiple times
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const handleAuth = async () => {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'callback/page.tsx:18',message:'handleAuth started',data:{url:window.location.href},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      try {
        // Get the full current URL
        const fullUrl = window.location.href;
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'callback/page.tsx:22',message:'Checking isSignInWithEmailLink',data:{fullUrl},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        
        // Get email from URL params or localStorage
        const emailFromUrl = searchParams.get('email');
        const emailFromStorage = typeof window !== 'undefined' 
          ? localStorage.getItem('emailForSignIn')
          : null;
        
        const email = emailFromUrl || emailFromStorage;
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'callback/page.tsx:40',message:'Email extracted',data:{email,fromUrl:!!emailFromUrl,fromStorage:!!emailFromStorage},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        
        // Check if this is a passwordless link using Firebase's built-in function
        const isEmailLink = isSignInWithEmailLink(auth, fullUrl);
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'callback/page.tsx:45',message:'isSignInWithEmailLink result',data:{isEmailLink,hasOobCode:fullUrl.includes('oobCode')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        
        // If URL contains auth code, sign in with it
        if (isEmailLink) {
          if (!email) {
            setStatus('error');
            setMessage('No email found. Please try signing in again.');
            return;
          }
          
          // Sign in with the email link using Firebase's built-in function
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'callback/page.tsx:54',message:'Before firebaseSignInWithEmailLink',data:{email},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
          // #endregion
          await firebaseSignInWithEmailLink(auth, email, fullUrl);
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'callback/page.tsx:57',message:'firebaseSignInWithEmailLink succeeded',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
          // #endregion
        } else {
          // URL doesn't have auth code - check if user is already authenticated
          // This happens when Firebase processes the link server-side and redirects
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'callback/page.tsx:62',message:'No auth code in URL, checking if already authenticated',data:{currentUser:auth.currentUser?.email},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
          // #endregion
          
          // Wait a bit for auth state to settle after Firebase's redirect
          await new Promise(resolve => setTimeout(resolve, 500));
          
          if (!auth.currentUser) {
            setStatus('error');
            setMessage('Authentication failed. Please try signing in again.');
            return;
          }
        }
        
        // Clear stored email
        if (typeof window !== 'undefined') {
          localStorage.removeItem('emailForSignIn');
        }

        // Refresh user profile
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'callback/page.tsx:89',message:'Before refreshUserProfile',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        await refreshUserProfile();
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'callback/page.tsx:93',message:'refreshUserProfile succeeded, redirecting to profile',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        
        setStatus('success');
        setMessage('Successfully signed in! Redirecting to profile...');
        
        // Wait a moment for profile to be set in context before redirecting
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Check if profile is complete (has country, school, grade, syllabus)
        // Note: userProfile might not be updated yet, so we'll always redirect to /profile
        // The profile page will handle redirecting to dashboard if already complete
        setTimeout(() => {
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'callback/page.tsx:107',message:'Redirecting to profile page',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
          // #endregion
          router.push('/profile');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

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

