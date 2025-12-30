"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "founders" | "early-user" | "purple" | "lime";
  className?: string;
}

// Founders Badge SVG Icon (Crown/Trophy style)
const FoundersIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
  >
    <path
      d="M5 16L3 10L8 12L12 2L16 12L21 10L19 16H5Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 16V20H19V16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Badge({
  children,
  variant = "purple",
  className = "",
}: BadgeProps) {
  const { theme } = useTheme();

  const getPurpleVariantClasses = () => {
    if (theme === "light") {
      return "bg-[var(--lavender)]/15 text-[var(--lavender)] border-2 border-[var(--lavender)]/30 hover:bg-[var(--lavender)]/20 hover:border-[var(--lavender)]/40";
    }
    return "bg-[var(--prysm-bg)] text-[var(--text-secondary)] border-2 border-[var(--border-color)] hover:bg-[var(--prysm-bg)]/90 hover:border-[var(--border-color)]/80";
  };

  const variants = {
    founders:
      "bg-gradient-to-r from-[var(--lime)] to-[var(--lime)]/80 text-[var(--prysm-bg)] shadow-[0_4px_15px_var(--shadow-lime)] hover:shadow-[0_6px_20px_var(--shadow-lime)]",
    "early-user":
      "bg-gradient-to-r from-[var(--lime)] to-[var(--lime)]/80 text-[var(--prysm-bg)] shadow-[0_4px_15px_var(--shadow-lime)] hover:shadow-[0_6px_20px_var(--shadow-lime)]", // Legacy support
    purple: `${getPurpleVariantClasses()} backdrop-blur-sm hover:scale-105`,
    lime: "bg-[var(--lime)]/15 text-[var(--lime)] border-2 border-[var(--lime)]/30 hover:bg-[var(--lime)]/20 hover:border-[var(--lime)]/40 hover:scale-105",
  };

  return (
    <span
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {variant === "founders" && <FoundersIcon />}
      {children}
    </span>
  );
}
