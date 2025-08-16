'use client';

import Navbar from '@/components/Navbar';
import { SessionProvider } from 'next-auth/react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
}
