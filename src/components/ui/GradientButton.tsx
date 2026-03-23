'use client';
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function GradientButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  ...props
}: GradientButtonProps) {
  const sizeMap = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-2.5 text-sm rounded-xl',
    lg: 'px-8 py-3.5 text-base rounded-2xl',
  };

  const variantMap = {
    primary: 'bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-500 text-white font-semibold hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:from-violet-500 hover:via-blue-400 hover:to-cyan-400',
    secondary: 'bg-white/[0.08] border border-white/[0.15] text-white hover:bg-white/[0.12] hover:border-violet-400/40',
    outline: 'bg-transparent border border-violet-500/50 text-violet-300 hover:bg-violet-500/10 hover:border-violet-400',
    ghost: 'bg-transparent text-gray-300 hover:text-white hover:bg-white/[0.06]',
    danger: 'bg-gradient-to-r from-red-600 to-rose-500 text-white font-semibold hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]',
  };

  return (
    <motion.button
      type={type}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'relative inline-flex items-center justify-center gap-2',
        'font-medium transition-all duration-300',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'select-none outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50',
        sizeMap[size],
        variantMap[variant],
        className
      )}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </motion.button>
  );
}
