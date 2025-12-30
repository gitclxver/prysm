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

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  sendPasswordlessLink: (email: string, displayName?: string) => Promise<void>;
  signInWithEmailLink: (email: string, emailLink: string) => Promise<void>;
  isPasswordlessLink: (link: string) => boolean;
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        // Load user profile from Firestore
        const profile = await getUserProfile(firebaseUser.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
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
    displayName: string
  ) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Generate avatar URL
    const photoURL = getUserAvatarUrl(displayName);

    // Update Firebase Auth profile
    await firebaseUpdateProfile(userCredential.user, { displayName, photoURL });

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

    // Generate JWT token
    const token = await generateToken({
      uid: userCredential.user.uid,
      email: email,
    });

    // Store token in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }

    // Send verification email
    await sendEmailVerification(userCredential.user);

    // Refresh profile
    await refreshUserProfile();
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);

    // Check if this is a new user
    const isNewUser =
      userCredential.user.metadata.creationTime ===
      userCredential.user.metadata.lastSignInTime;

    if (isNewUser) {
      // Generate avatar URL (use Google photo if available, otherwise generate)
      const photoURL =
        userCredential.user.photoURL ||
        getUserAvatarUrl(
          userCredential.user.displayName || userCredential.user.email || "User"
        );

      // Check if user is early user and get signup number
      const { isEarly, signupNumber } = await checkAndMarkEarlyUser(
        userCredential.user.uid
      );

      // Create user profile in Firestore
      await createUserProfile(
        userCredential.user.uid,
        userCredential.user.email || "",
        userCredential.user.displayName || "User",
        photoURL,
        isEarly,
        signupNumber
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
    await refreshUserProfile();
  };

  const signOut = async () => {
    await firebaseSignOut(auth);

    // Remove JWT token
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }

    setUserProfile(null);
  };

  const sendVerificationEmail = async () => {
    if (user) {
      await sendEmailVerification(user);
    }
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const sendPasswordlessLink = async (email: string, displayName?: string) => {
    const actionCodeSettings = {
      url: `${window.location.origin}/auth/callback?email=${encodeURIComponent(
        email
      )}${
        displayName ? `&displayName=${encodeURIComponent(displayName)}` : ""
      }`,
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);

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
      const photoURL = getUserAvatarUrl(displayName);

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
