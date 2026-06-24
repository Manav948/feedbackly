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
    primary: 'bg-white text-black font-semibold hover:bg-white/90 shadow-[0_2px_8px_rgba(255,255,255,0.15)]',
    secondary: 'bg-[#111111] border border-[#232323] text-white hover:bg-white/[0.04]',
    outline: 'bg-transparent border border-[#232323] text-gray-300 hover:text-white hover:bg-white/[0.04] hover:border-white/20',
    ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-white/[0.06]',
    danger: 'bg-red-950/40 border border-red-900/50 text-red-400 font-semibold hover:bg-red-900/20 hover:text-red-300',
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
        'select-none outline-none focus-visible:ring-2 focus-visible:ring-white/30',
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
