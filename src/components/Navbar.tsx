'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import type { User } from 'next-auth';

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user as User | undefined;

  const linkClasses =
    'text-sm font-medium text-gray-200 hover:text-white transition-colors duration-200';

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-lg md:text-xl font-bold tracking-tight text-white"
        >
          <span className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 flex items-center justify-center text-black shadow-lg">
            F
          </span>
          <span>Feedbackly</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            <Link href="/#how-it-works" className={linkClasses}>
              How it works
            </Link>
            <Link href="/#features" className={linkClasses}>
              Features
            </Link>
          </div>

          {session ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-gray-300">
                {user?.username || user?.email}
              </span>
              <Button
                onClick={() => signOut()}
                className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 text-white hover:shadow-[0_0_18px_rgba(236,72,153,0.5)]"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-black font-semibold hover:shadow-[0_0_18px_rgba(16,185,129,0.4)]">
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
