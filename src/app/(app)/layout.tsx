'use client';

import { GlassNavbar } from '@/components/GlassNavbar';
import { FloatingSidebar } from '@/components/FloatingSidebar';
import { MobileBottomNav } from '@/components/MobileNav';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { SessionProvider, useSession } from 'next-auth/react';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <AnimatedBackground variant="dashboard" showGrid />
      <GlassNavbar />

      {isLoggedIn && (
        <>
          <MobileBottomNav />
        </>
      )}

      <main
        className={`
          ${isLoggedIn ? '' : ''}
        `}
      >
        <div className="w-full overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LayoutContent>{children}</LayoutContent>
    </SessionProvider>
  );
}