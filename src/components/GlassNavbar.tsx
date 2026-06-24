'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Zap, ChevronDown, LogOut, Menu, X } from 'lucide-react';
import type { User as NextAuthUser } from 'next-auth';
import { GradientButton } from './ui/GradientButton';

const navLinks = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Features', href: '/#features' },
];

export function GlassNavbar() {
  const { data: session } = useSession();
  const user = session?.user as NextAuthUser | undefined;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-500 ${
          scrolled
            ? 'bg-[#090909]/80 backdrop-blur-2xl border-b border-[#232323] shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex items-center justify-between px-4 md:px-8 h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative h-8 w-8 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <MessageSquare className="h-4 w-4 text-black" />
            </div>
            <span className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white tracking-tight">
              Feedbackly
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {!session && navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white/40 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#111111] border border-[#232323] hover:border-white/20 transition-all duration-200 group"
                >
                  <div className="h-7 w-7 rounded-lg bg-[#232323] flex items-center justify-center text-xs font-bold text-white">
                    {(user?.username || user?.email || 'U')[0].toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-300 max-w-[120px] truncate">
                    {user?.username || user?.email}
                  </span>
                  <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-[#111111] border border-[#232323] shadow-2xl overflow-hidden"
                    >
                      <div className="p-1.5">
                        <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/[0.04] transition-colors" onClick={() => setProfileOpen(false)}>
                          <Zap className="h-4 w-4 text-white" /> Dashboard
                        </Link>
                        <div className="h-px bg-[#232323] my-1.5" />
                        <button
                          onClick={() => { signOut(); setProfileOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/[0.04] transition-colors"
                        >
                          <LogOut className="h-4 w-4" /> Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/sign-in">
                  <GradientButton variant="ghost" size="sm">Sign in</GradientButton>
                </Link>
                <Link href="/sign-up">
                  <GradientButton variant="primary" size="sm">Get started</GradientButton>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl bg-[#111111] border border-[#232323] text-gray-400 hover:text-white transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-[60] bg-[#090909]/95 backdrop-blur-2xl border-b border-[#232323] p-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {!session && navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="px-3 py-2.5 text-sm text-gray-300 hover:text-white rounded-xl hover:bg-white/[0.04]" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
              {session ? (
                <>
                  <Link href="/dashboard" className="px-3 py-2.5 text-sm text-gray-300 hover:text-white rounded-xl hover:bg-white/[0.04]" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="text-left px-3 py-2.5 text-sm text-red-400 rounded-xl hover:bg-red-500/[0.04]">Sign out</button>
                </>
              ) : (
                <div className="flex gap-2 pt-2">
                  <Link href="/sign-in" className="flex-1"><GradientButton variant="secondary" size="sm" className="w-full">Sign in</GradientButton></Link>
                  <Link href="/sign-up" className="flex-1"><GradientButton variant="primary" size="sm" className="w-full">Get started</GradientButton></Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {profileOpen && <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />}
    </>
  );
}
