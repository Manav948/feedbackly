'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  User,
  Settings,
  HomeIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: HomeIcon },
  { href: '/dashboard', icon: LayoutDashboard },
  // { href: '/', icon: BarChart3 },
  // { href: '/', icon: User },
  // { href: '/', icon: Settings },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-5 px-3 py-2 rounded-2xl glass border border-white/10">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'p-3 rounded-xl transition-all',
                isActive
                  ? 'bg-gradient-to-br from-violet-600 to-cyan-500 text-white'
                  : 'text-gray-400'
              )}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}