'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  ChevronLeft,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function FloatingSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const username = session?.user?.username;
  
  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  if (username) {
    navItems.push({
      href: `/u/${username}`,
      label: 'Public Board',
      icon: MessageSquare,
    });
  }

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed left-3 top-1/2 -translate-y-1/2 z-30',
        'flex flex-col gap-2',
        'rounded-2xl bg-[#111111] border border-[#232323]',
        'shadow-[0_8px_32px_rgba(0,0,0,0.5)]',
        'transition-all duration-300 ease-in-out',
        collapsed ? 'py-4 px-2 w-[56px]' : 'py-4 px-3 w-[200px]'
      )}
    >
     
      <div className={cn(
        'flex items-center gap-2.5 px-1 pb-3 border-b border-[#232323] mb-1',
        collapsed && 'justify-center'
      )}>
        <div className="h-7 w-7 shrink-0 rounded-lg bg-white flex items-center justify-center shadow-sm">
          <Zap className="h-3.5 w-3.5 text-black" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="font-bold text-sm text-white whitespace-nowrap overflow-hidden tracking-tight"
            >
              Feedbackly
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex items-center gap-2.5 px-2 py-2.5 rounded-xl text-sm transition-all duration-200',
                'group overflow-hidden',
                collapsed && 'justify-center',
                isActive
                  ? 'text-white bg-white/[0.06] border border-[#232323]'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              )}
            >
              <item.icon className={cn('h-4.5 w-4.5 shrink-0 relative z-10', isActive ? 'text-white' : 'text-gray-500 group-hover:text-white')} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-medium whitespace-nowrap overflow-hidden relative z-10"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shrink-0 relative z-10" />
              )}
            </Link>
          );
        })}
      </nav>

     
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          'flex items-center justify-center p-2 rounded-xl',
          'text-gray-500 hover:text-white hover:bg-white/[0.04] transition-all duration-200',
          'border-t border-[#232323] pt-3 mt-1',
          collapsed && 'w-full'
        )}
      >
        <motion.div animate={{ rotate: collapsed ? 0 : 180 }} transition={{ duration: 0.2 }}>
          <ChevronLeft className="h-4 w-4" />
        </motion.div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="text-xs ml-2 whitespace-nowrap overflow-hidden"
            >
              Collapse
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.aside>
  );
}
