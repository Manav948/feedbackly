'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-violet-400' },
  { href: '/feedback', label: 'Feedback', icon: MessageSquare, color: 'text-blue-400' },
  { href: '/analytics', label: 'Analytics', icon: BarChart3, color: 'text-cyan-400' },
  { href: '/profile', label: 'Profile', icon: User, color: 'text-pink-400' },
  { href: '/settings', label: 'Settings', icon: Settings, color: 'text-gray-400' },
];

export function FloatingSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed left-3 top-1/2 -translate-y-1/2 z-30',
        'flex flex-col gap-2',
        'rounded-2xl glass border border-white/10',
        'shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_1px_rgba(255,255,255,0.08)]',
        'transition-all duration-300 ease-in-out',
        collapsed ? 'py-4 px-2 w-[56px]' : 'py-4 px-3 w-[200px]'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center gap-2.5 px-1 pb-3 border-b border-white/[0.08] mb-1',
        collapsed && 'justify-center'
      )}>
        <div className="h-7 w-7 shrink-0 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-[0_0_12px_rgba(124,58,237,0.5)]">
          <Zap className="h-3.5 w-3.5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="font-bold text-sm gradient-text font-[family-name:var(--font-poppins)] whitespace-nowrap overflow-hidden"
            >
              Feedbackly
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
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
                  ? 'bg-gradient-to-r from-violet-600/20 to-blue-600/10 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-blue-600/10 rounded-xl border border-violet-500/30"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <item.icon className={cn('h-4.5 w-4.5 shrink-0 relative z-10', isActive ? item.color : 'text-gray-500 group-hover:' + item.color.split('-')[0] + '-400')} />
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
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 relative z-10" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          'flex items-center justify-center p-2 rounded-xl',
          'text-gray-500 hover:text-white hover:bg-white/[0.06] transition-all duration-200',
          'border-t border-white/[0.08] pt-3 mt-1',
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
