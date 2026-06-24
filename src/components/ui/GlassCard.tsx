'use client';
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  gradient = false,
  padding = 'md',
  ...props
}: GlassCardProps) {
  const paddingMap = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'relative rounded-2xl overflow-hidden',
        'bg-white/[0.05] backdrop-blur-xl',
        'border border-white/[0.1]',
        'transition-all duration-300',
        hover && 'hover:border-white/30 hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)]',
        glow && 'shadow-[0_4px_24px_rgba(0,0,0,0.5)]',
        gradient && 'bg-white/[0.02]',
        paddingMap[padding],
        className
      )}
      {...props}
    >
      {/* Subtle inner glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
