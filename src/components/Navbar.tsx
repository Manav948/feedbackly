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
              className="bg-purple-500 hover:bg-purple-600 text-white shadow-md transition-all duration-200"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button
              className="bg-purple-500 hover:bg-purple-600 text-white shadow-md transition-all duration-200"
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
