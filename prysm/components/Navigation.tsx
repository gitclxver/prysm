'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Button } from './Button';
import { getUserAvatarUrl } from '@/lib/avatar';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, userProfile } = useAuth();
  const avatarUrl = getUserAvatarUrl(
    userProfile?.displayName || user?.displayName || user?.email || 'User',
    32
  );

  return (
    <nav className="sticky top-0 z-50 bg-[#120d2b]/95 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 py-4 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <motion.img
              src="/logo.png"
              alt="Prysm Logo - The Ultimate Student OS"
              className="h-8 w-8 rounded-lg"
              width="32"
              height="32"
              loading="eager"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div
              className="w-8 h-8 bg-gradient-to-br from-lime-400 to-lime-300 rounded-lg flex items-center justify-center shadow-lg shadow-lime-400/30"
              style={{ display: 'none' }}
            >
              <span className="text-[#120d2b] text-sm font-black">P</span>
            </div>
            <span className="font-extrabold tracking-tight text-white uppercase text-lg sm:text-xl group-hover:text-lime-400 transition-colors">
              Prysm
            </span>
          </Link>
          <div className="hidden lg:flex gap-6 xl:gap-10 text-sm font-semibold">
            <Link href="/features" className="nav-link text-gray-400 hover:text-lime-400 relative">
              Features
            </Link>
            <Link href="/examhub" className="nav-link text-gray-400 hover:text-lime-400 relative">
              Exams
            </Link>
            <Link href="/tools" className="nav-link text-gray-400 hover:text-lime-400 relative">
              Tools
            </Link>
            <Link href="/community" className="nav-link text-gray-400 hover:text-lime-400 relative">
              Community
            </Link>
            <Link href="/parenthub" className="nav-link text-gray-400 hover:text-lime-400 relative">
              Parents
            </Link>
            <Link href="/about" className="nav-link text-gray-400 hover:text-lime-400 relative">
              About
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          {user ? (
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/dashboard" className="hidden sm:block">
                <Button variant="secondary">Dashboard</Button>
              </Link>
              <Link href="/profile" className="flex items-center gap-2">
                <motion.img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-lime-400/30"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                />
              </Link>
            </div>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block">
                <Button variant="primary">Join Waitlist</Button>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:text-lime-400 transition-colors"
                aria-label="Menu"
              >
                <i className={`fa-solid ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 border-t border-white/5 pt-4"
          >
            <div className="flex flex-col gap-4">
              <Link href="/features" className="text-gray-400 hover:text-lime-400 transition-colors py-2">
                Features
              </Link>
              <Link href="/examhub" className="text-gray-400 hover:text-lime-400 transition-colors py-2">
                Exams
              </Link>
              <Link href="/tools" className="text-gray-400 hover:text-lime-400 transition-colors py-2">
                Tools
              </Link>
              <Link href="/community" className="text-gray-400 hover:text-lime-400 transition-colors py-2">
                Community
              </Link>
              <Link href="/parenthub" className="text-gray-400 hover:text-lime-400 transition-colors py-2">
                Parents
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-lime-400 transition-colors py-2">
                About
              </Link>
              {!user && (
                <Link href="/login" className="mt-2">
                  <Button variant="primary" className="w-full">Join Waitlist</Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

