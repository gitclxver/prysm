"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink as firebaseSignInWithEmailLink,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import {
  createUserProfile,
  checkAndMarkEarlyUser,
  getUserProfile,
} from "@/lib/firebase/users";
import { generateToken } from "@/lib/jwt";
import { getUserAvatarUrl } from "@/lib/avatar";
import { UserProfile } from "@/types/user";
import { withFirebaseDelay } from "@/lib/utils/firebaseDelay";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
    username?: string,
    privacyPolicyAccepted?: boolean,
    firstName?: string,
    lastName?: string
  ) => Promise<void>;
  signInWithGoogle: (privacyPolicyAccepted?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  sendPasswordlessLink: (email: string, displayName?: string) => Promise<void>;
  signInWithEmailLink: (email: string, emailLink: string) => Promise<void>;
  isPasswordlessLink: (link: string) => boolean;
  isProfileComplete: (profile: UserProfile | null) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUserProfile = async () => {
    if (user) {
      const profile = await getUserProfile(user.uid);
      setUserProfile(profile);
    }
  };

  const isProfileComplete = (profile: UserProfile | null): boolean => {
    if (!profile) return false;
    return !!(
      profile.country &&
      profile.region &&
      profile.school &&
      // For high school students: need grade or level and syllabus
      // For tertiary students: need department (no syllabus required)
      ((profile.isUniversityStudent && profile.department) || 
       (!profile.isUniversityStudent && (profile.grade || profile.level) && profile.syllabus))
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        // Load user profile from Firestore
        const profile = await getUserProfile(firebaseUser.uid);
        setUserProfile(profile);
        
        // Refresh JWT token with sliding expiration (30 days from now)
        // This resets the expiration timer every time the user visits
        try {
          const token = await generateToken({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
          });
          
          if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', token);
          }
        } catch (error) {
          console.error('Failed to refresh token:', error);
        }
      } else {
        setUserProfile(null);
        // Clear token when user signs out
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const userCredential = await withFirebaseDelay(
      signInWithEmailAndPassword(auth, email, password),
      500
    );

    // Generate JWT token
    const token = await generateToken({
      uid: userCredential.user.uid,
      email: email,
    });

    // Store token in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    displayName: string,
    username?: string,
    privacyPolicyAccepted: boolean = false,
    firstName?: string,
    lastName?: string
  ) => {
    if (!privacyPolicyAccepted) {
      throw new Error(
        "Privacy Policy and Terms must be accepted to create an account"
      );
    }

    // Ensure we're in a clean state before creating account
    // Sign out any existing user to prevent conflicts
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await firebaseSignOut(auth);
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("emailForSignIn");
          localStorage.removeItem("displayNameForSignIn");
        }
        // Small delay to ensure sign out completes
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (signOutError) {
      // If sign out fails, continue anyway - might already be signed out
      console.warn("Warning: Could not clear existing auth state:", signOutError);
    }

    try {
      const userCredential = await withFirebaseDelay(
        createUserWithEmailAndPassword(auth, email, password),
        600
      );

      // Generate avatar URL
      const photoURL = getUserAvatarUrl(displayName, undefined);

      // Update Firebase Auth profile
      await withFirebaseDelay(
        firebaseUpdateProfile(userCredential.user, { displayName, photoURL }),
        500
      );

      // Check if user is early user and get signup number
      const { isEarly, signupNumber } = await withFirebaseDelay(
        checkAndMarkEarlyUser(userCredential.user.uid),
        500
      );

      // Create user profile in Firestore
      await withFirebaseDelay(
        createUserProfile(
          userCredential.user.uid,
          email,
          displayName,
          photoURL,
          isEarly,
          signupNumber,
          username,
          privacyPolicyAccepted,
          firstName,
          lastName
        ),
        600
      );

      // Generate JWT token
      const token = await generateToken({
        uid: userCredential.user.uid,
        email: email,
      });

      // Store token in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
      }

      // Email verification disabled for now
      // await withFirebaseDelay(
      //   sendEmailVerification(userCredential.user),
      //   500
      // );

      // Refresh profile
      await withFirebaseDelay(refreshUserProfile(), 500);
    } catch (error: any) {
      // If account creation fails (e.g., email already in use), ensure we're signed out
      // This prevents issues when trying to create another account on the same device
      try {
        await firebaseSignOut(auth);
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("emailForSignIn");
          localStorage.removeItem("displayNameForSignIn");
        }
      } catch (signOutError) {
        // Ignore sign out errors, just ensure we tried to clear state
        console.error("Error clearing auth state after signup failure:", signOutError);
      }
      // Re-throw the original error
      throw error;
    }
  };

  const signInWithGoogle = async (privacyPolicyAccepted: boolean = false) => {
    // Ensure we're in a clean state before Google sign in/sign up
    // Sign out any existing user to prevent conflicts
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await firebaseSignOut(auth);
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("emailForSignIn");
          localStorage.removeItem("displayNameForSignIn");
        }
        // Small delay to ensure sign out completes
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (signOutError) {
      // If sign out fails, continue anyway - might already be signed out
      console.warn("Warning: Could not clear existing auth state:", signOutError);
    }

    const provider = new GoogleAuthProvider();
    const userCredential = await withFirebaseDelay(
      signInWithPopup(auth, provider),
      600
    );

    // Check if this is a new user
    const isNewUser =
      userCredential.user.metadata.creationTime ===
      userCredential.user.metadata.lastSignInTime;

    if (isNewUser) {
      if (!privacyPolicyAccepted) {
        // Don't create account if privacy policy not accepted
        await firebaseSignOut(auth);
        throw new Error(
          "Privacy Policy and Terms must be accepted to create an account"
        );
      }

      // Generate avatar URL (use Google photo if available, otherwise generate)
      const photoURL =
        userCredential.user.photoURL ||
        getUserAvatarUrl(
          userCredential.user.displayName || userCredential.user.email || "User",
          undefined
        );

      // Check if user is early user and get signup number
      const { isEarly, signupNumber } = await withFirebaseDelay(
        checkAndMarkEarlyUser(userCredential.user.uid),
        500
      );

      // Create user profile with privacy policy acceptance
      await withFirebaseDelay(
        createUserProfile(
          userCredential.user.uid,
          userCredential.user.email || "",
          userCredential.user.displayName || "User",
          photoURL,
          isEarly,
          signupNumber,
          undefined, // username
          privacyPolicyAccepted
        ),
        600
      );
    }

    // Generate JWT token
    const token = await generateToken({
      uid: userCredential.user.uid,
      email: userCredential.user.email || "",
    });

    // Store token in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }

    // Refresh profile
    await withFirebaseDelay(refreshUserProfile(), 500);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);

    // Clear all authentication-related data from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("emailForSignIn");
      localStorage.removeItem("displayNameForSignIn");
      // Clear any other auth-related items that might persist
      // Note: Firebase Auth's internal persistence is handled by firebaseSignOut above
    }

    setUserProfile(null);
  };

  const sendVerificationEmail = async () => {
    if (user) {
      // Get the site URL for the continue URL
      const siteUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_SITE_URL || 'https://prysmlearn.com';
      
      const continueUrl = `${siteUrl}/verify-email?verified=true`;
      
      await sendEmailVerification(user, {
        url: continueUrl,
        handleCodeInApp: false, // Open in browser, not in app
      });
    }
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const sendPasswordlessLink = async (email: string, displayName?: string) => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AuthContext.tsx:242',message:'sendPasswordlessLink called',data:{email,hasDisplayName:!!displayName},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    try {
      // Construct callback URL - Firebase requires absolute URL
      const baseUrl = window.location.origin;
      const callbackUrl = `${baseUrl}/auth/callback?email=${encodeURIComponent(email)}`;
      
      // Build actionCodeSettings - Firebase validates the URL format
      const actionCodeSettings = {
        url: callbackUrl,
        handleCodeInApp: true, // Must be true for email link authentication to work
      };
      
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AuthContext.tsx:271',message:'Before sendSignInLinkToEmail',data:{callbackUrl,baseUrl,hasDisplayName:!!displayName,actionCodeSettings:JSON.stringify(actionCodeSettings)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AuthContext.tsx:253',message:'sendSignInLinkToEmail succeeded',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
    } catch (error) {
      // #region agent log
      const errorData = error instanceof Error ? {
        message: error.message,
        name: error.name,
        code: (error as any)?.code,
        serverResponse: (error as any)?.serverResponse,
        errorInfo: (error as any)?.errorInfo,
        customData: (error as any)?.customData,
        stack: error.stack
      } : { rawError: String(error) };
      fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AuthContext.tsx:285',message:'sendSignInLinkToEmail error',data:errorData,timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      
      // Provide user-friendly error message for quota exceeded
      const errorCode = (error as any)?.code;
      if (errorCode === 'auth/quota-exceeded' || errorCode === 400) {
        const quotaError = new Error(
          'We\'ve reached the daily limit for sending sign-in emails. Please try again tomorrow or contact support if you need immediate assistance.'
        );
        (quotaError as any).code = errorCode;
        throw quotaError;
      }
      
      throw error;
    }

    // Store email and displayName in localStorage for when user clicks the link
    if (typeof window !== "undefined") {
      localStorage.setItem("emailForSignIn", email);
      if (displayName) {
        localStorage.setItem("displayNameForSignIn", displayName);
      }
    }
  };

  const signInWithEmailLink = async (email: string, emailLink: string) => {
    const userCredential = await firebaseSignInWithEmailLink(
      auth,
      email,
      emailLink
    );

    // Check if this is a new user
    const isNewUser =
      userCredential.user.metadata.creationTime ===
      userCredential.user.metadata.lastSignInTime;

    if (isNewUser) {
      // Get display name from localStorage if available
      const displayName =
        typeof window !== "undefined"
          ? localStorage.getItem("displayNameForSignIn") || "User"
          : "User";

      // Generate avatar URL
      const photoURL = getUserAvatarUrl(displayName, undefined);

      // Update Firebase Auth profile
      await firebaseUpdateProfile(userCredential.user, {
        displayName,
        photoURL,
      });

      // Check if user is early user and get signup number
      const { isEarly, signupNumber } = await checkAndMarkEarlyUser(
        userCredential.user.uid
      );

      // Create user profile in Firestore
      await createUserProfile(
        userCredential.user.uid,
        email,
        displayName,
        photoURL,
        isEarly,
        signupNumber
      );

      // Clear stored values
      if (typeof window !== "undefined") {
        localStorage.removeItem("displayNameForSignIn");
      }
    }

    // Generate JWT token
    const token = await generateToken({
      uid: userCredential.user.uid,
      email: email,
    });

    // Store token in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
      localStorage.removeItem("emailForSignIn");
    }

    // Refresh profile
    await refreshUserProfile();
  };

  const isPasswordlessLink = (link: string): boolean => {
    return isSignInWithEmailLink(auth, link);
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    sendVerificationEmail,
    resetPassword,
    refreshUserProfile,
    sendPasswordlessLink,
    signInWithEmailLink,
    isPasswordlessLink,
    isProfileComplete,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
