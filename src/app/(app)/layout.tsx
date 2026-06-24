'use client';

import { GlassNavbar } from '@/components/GlassNavbar';
import { FloatingSidebar } from '@/components/FloatingSidebar';
import { MobileBottomNav } from '@/components/MobileNav';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { SessionProvider, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  const isLoggedIn = !!session;
  const isHomePage = pathname === '/';
  const showSidebar = isLoggedIn && !isHomePage;

  return (
    <div className="min-h-screen bg-[#090909] text-[#FAFAFA]">
      <AnimatedBackground variant="dashboard" showGrid />
      <GlassNavbar />

      {showSidebar && (
        <>
          <div className="hidden md:block">
            <FloatingSidebar />
          </div>
          <MobileBottomNav />
        </>
      )}

      <main
        className={`
          transition-all duration-300 ${showSidebar ? 'md:pl-[220px]' : ''}
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