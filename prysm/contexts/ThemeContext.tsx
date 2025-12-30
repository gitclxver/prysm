"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { updateUserProfile } from "@/lib/firebase/profile";

type Theme = "light" | "dark";
type ThemePreference = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  themePreference: ThemePreference;
  toggleTheme: () => void;
  setTheme: (theme: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to resolve "system" theme to actual theme
function resolveTheme(preference: ThemePreference | undefined): Theme {
  if (preference === "light" || preference === "dark") {
    return preference;
  }
  // "system" or undefined - check system preference
  if (typeof window !== "undefined") {
    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    return prefersLight ? "light" : "dark";
  }
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user, userProfile, refreshUserProfile } = useAuth();
  
  // Store refreshUserProfile in a ref to avoid dependency issues (Bug 2 fix)
  const refreshUserProfileRef = React.useRef(refreshUserProfile);
  useEffect(() => {
    refreshUserProfileRef.current = refreshUserProfile;
  }, [refreshUserProfile]);
  
  // Get initial theme preference from userProfile, localStorage, or system
  const getInitialThemePreference = (): ThemePreference => {
    // Priority 1: userProfile.theme (if already loaded)
    if (userProfile?.theme && (userProfile.theme === "light" || userProfile.theme === "dark" || userProfile.theme === "system")) {
      return userProfile.theme;
    }
    // Priority 2: localStorage (for quick initialization)
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as ThemePreference | null;
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system")) {
        return savedTheme;
      }
    }
    // Priority 3: system (default)
    return "system";
  };

  const [themePreference, setThemePreferenceState] = useState<ThemePreference>(getInitialThemePreference);
  
  // Resolve theme preference to actual theme (light/dark)
  const theme = useMemo(() => resolveTheme(themePreference), [themePreference]);

  // Use refs to track synchronization state and prevent infinite loops
  const isSyncingToProfileRef = React.useRef(false);
  const lastSyncedThemeRef = React.useRef<ThemePreference | null>(null);
  const userProfileThemeRef = React.useRef<ThemePreference | null>(null);

  // Track userProfile.theme in a ref to detect changes
  useEffect(() => {
    if (userProfile?.theme && (userProfile.theme === "light" || userProfile.theme === "dark" || userProfile.theme === "system")) {
      userProfileThemeRef.current = userProfile.theme;
    } else {
      userProfileThemeRef.current = null;
    }
  }, [userProfile?.theme]);

  // Apply theme to document and sync to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Apply resolved theme to document
      document.documentElement.setAttribute("data-theme", theme);
      // Save preference to localStorage
      localStorage.setItem("theme", themePreference);
    }
  }, [theme, themePreference]);

  // Update theme when userProfile loads or changes (Priority 1: userProfile.theme from database)
  // This effect syncs FROM the database TO the local state
  useEffect(() => {
    // Skip if we're currently syncing TO the profile (to avoid circular updates)
    if (isSyncingToProfileRef.current) {
      return;
    }

    const profileTheme = userProfileThemeRef.current;
    if (profileTheme && profileTheme !== themePreference) {
      // Update lastSyncedTheme BEFORE state update to prevent sync-to effect from running
      lastSyncedThemeRef.current = profileTheme;
      setThemePreferenceState(profileTheme);
    }
  }, [userProfile?.theme, themePreference]);

  // Sync theme changes to userProfile if user is logged in
  // This effect syncs FROM the local state TO the database
  useEffect(() => {
    // Skip if we're syncing FROM profile (to avoid circular updates)
    if (isSyncingToProfileRef.current) {
      return;
    }

    // Skip if this is the same value we just synced (prevents re-syncing after refresh)
    if (lastSyncedThemeRef.current === themePreference) {
      return;
    }

    if (user && userProfile) {
      // Only sync if the profile theme is different from current preference
      if (userProfile.theme !== themePreference) {
        // CRITICAL: Set flag and lastSyncedTheme BEFORE any async operations
        // This must happen synchronously to prevent race conditions where:
        // 1. refreshUserProfile() updates userProfile.theme
        // 2. Sync-FROM effect runs before promise completes
        // 3. Without the flag, sync-FROM would try to update themePreference again
        const themeToSync = themePreference;
        isSyncingToProfileRef.current = true;
        lastSyncedThemeRef.current = themeToSync;

        // Update profile - use promise chain to ensure proper sequencing
        updateUserProfile(user.uid, { theme: themeToSync })
          .then(() => {
            // Refresh userProfile to get updated data (using ref to avoid dependency)
            // This will update userProfile.theme in AuthContext, which triggers a re-render
            // The sync-FROM effect will run, but the flag is already set, so it returns early
            return refreshUserProfileRef.current();
          })
          .then(() => {
            // Reset flag after both operations complete
            // Use setTimeout to ensure this happens after React has processed the userProfile update
            // This prevents the sync-FROM effect from running again immediately after flag reset
            setTimeout(() => {
              isSyncingToProfileRef.current = false;
            }, 0);
          })
          .catch((error) => {
            console.error("Error updating theme in profile:", error);
            // Reset flag even on error
            isSyncingToProfileRef.current = false;
            // Clear the last synced ref on error so we can retry
            if (lastSyncedThemeRef.current === themeToSync) {
              lastSyncedThemeRef.current = null;
            }
          });
      }
    }
  }, [themePreference, user, userProfile?.theme]);

  const toggleTheme = () => {
    // Toggle between light and dark (not system)
    setThemePreferenceState((prev) => {
      const currentTheme = resolveTheme(prev);
      return currentTheme === "light" ? "dark" : "light";
    });
  };

  const setTheme = (newTheme: ThemePreference) => {
    setThemePreferenceState(newTheme);
  };

  // Always provide the context, even before mounting
  // This prevents the "useTheme must be used within a ThemeProvider" error
  return (
    <ThemeContext.Provider value={{ theme, themePreference, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
