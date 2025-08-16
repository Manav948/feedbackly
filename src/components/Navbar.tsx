'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import type { User } from 'next-auth';

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user as User | undefined;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-lg border-b border-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 p-4 md:px-6">
        
        {/* Logo */}
        <Link 
          href="/" 
          className="text-2xl font-extrabold tracking-tight text-white hover:text-purple-400 transition-colors duration-200"
        >
          Feedbackly
        </Link>

        {/* Right Section */}
        {session ? (
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="text-sm md:text-base text-gray-300">
              Welcome, <span className="font-semibold text-white">{user?.username || user?.email}</span>
            </span>
            <Button
              onClick={() => signOut()}
              className="bg-gradient-to-r from-teal-400 to-violet-500 text-black font-semibold 
                         hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:scale-[1.03] transition"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button
              className="bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 text-white font-semibold
hover:shadow-[0_0_20px_rgba(236,72,153,0.7)] hover:scale-[1.03] transition"
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
