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
  
  // Store refreshUserProfile in a ref to avoid dependency issues
  const refreshUserProfileRef = React.useRef(refreshUserProfile);
  useEffect(() => {
    refreshUserProfileRef.current = refreshUserProfile;
  }, [refreshUserProfile]);
  
  // Get initial theme preference - only use localStorage for initial state (not userProfile to avoid hydration issues)
  const getInitialThemePreference = (): ThemePreference => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as ThemePreference | null;
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system")) {
        return savedTheme;
      }
    }
    return "system";
  };

  const [themePreference, setThemePreferenceState] = useState<ThemePreference>(getInitialThemePreference);
  
  // Resolve theme preference to actual theme (light/dark)
  const theme = useMemo(() => resolveTheme(themePreference), [themePreference]);

  // Use refs to track synchronization state and prevent infinite loops
  const isSyncingToProfileRef = React.useRef(false);
  const isInitializedRef = React.useRef(false);
  const lastProfileThemeRef = React.useRef<ThemePreference | null>(null);
  const lastSyncedThemeRef = React.useRef<ThemePreference | null>(null);

  // Apply theme to document and sync to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Apply resolved theme to document
      document.documentElement.setAttribute("data-theme", theme);
      // Save preference to localStorage
      localStorage.setItem("theme", themePreference);
    }
  }, [theme, themePreference]);

  // Sync FROM userProfile to local state (initialization and external updates)
  useEffect(() => {
    if (!user || !userProfile) {
      // Reset initialization state when user logs out
      if (!user) {
        isInitializedRef.current = false;
        lastProfileThemeRef.current = null;
      }
      return;
    }
    
    const profileTheme = userProfile.theme;
    
    // Validate profile theme
    if (profileTheme && profileTheme !== "light" && profileTheme !== "dark" && profileTheme !== "system") {
      return;
    }
    
    // Skip if profile theme hasn't changed (using ref to avoid dependency on themePreference)
    if (profileTheme === lastProfileThemeRef.current) {
      return;
    }
    
    // Update ref to track current profile theme
    lastProfileThemeRef.current = profileTheme || null;
    
    // First initialization: load from profile if available
    if (!isInitializedRef.current) {
      // Use a function updater to get current themePreference without adding it to deps
      setThemePreferenceState((current) => {
        if (profileTheme && profileTheme !== current) {
          lastSyncedThemeRef.current = profileTheme;
          return profileTheme;
        }
        lastSyncedThemeRef.current = current;
        return current;
      });
      isInitializedRef.current = true;
      return;
    }
    
    // After initialization: sync FROM profile only if:
    // 1. We're not currently syncing TO profile
    // 2. Profile theme is different from what we last synced (external update)
    if (!isSyncingToProfileRef.current && profileTheme && profileTheme !== lastSyncedThemeRef.current) {
      // This is an external update - sync from profile
      setThemePreferenceState(profileTheme);
      lastSyncedThemeRef.current = profileTheme;
    }
  }, [userProfile?.theme, user]);

  // Sync theme changes TO userProfile (user-initiated changes)
  useEffect(() => {
    // Skip if not initialized yet
    if (!isInitializedRef.current) return;
    
    // Skip if we're currently syncing TO the profile
    if (isSyncingToProfileRef.current) {
      return;
    }

    // Skip if this matches what we last synced
    if (themePreference === lastSyncedThemeRef.current) {
      return;
    }

    if (user && userProfile) {
      // Only sync if the profile theme is different from current preference
      if (userProfile.theme !== themePreference) {
        isSyncingToProfileRef.current = true;
        const themeToSync = themePreference;
        
        updateUserProfile(user.uid, { theme: themeToSync })
          .then(() => {
            // Update lastSyncedTheme BEFORE refreshing to prevent sync-from from triggering
            lastSyncedThemeRef.current = themeToSync;
            return refreshUserProfileRef.current();
          })
          .then(() => {
            // Reset flag after sync completes
            setTimeout(() => {
              isSyncingToProfileRef.current = false;
            }, 50);
          })
          .catch((error) => {
            console.error("Error updating theme in profile:", error);
            isSyncingToProfileRef.current = false;
            // On error, allow retry by clearing lastSyncedTheme if it matches
            if (lastSyncedThemeRef.current === themeToSync) {
              lastSyncedThemeRef.current = userProfile.theme || null;
            }
          });
      }
    }
  }, [themePreference, user, userProfile]);

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
