'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  gradient?: string;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export function StatCard({
  label,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-violet-400',
  gradient = 'from-violet-500/10 to-blue-500/10',
  trend,
  className,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'relative rounded-2xl overflow-hidden',
        'bg-white/[0.04] backdrop-blur-xl',
        'border border-white/[0.1]',
        'hover:border-white/[0.2] hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]',
        'transition-all duration-300 p-5',
        className
      )}
    >
      {/* Gradient top bar */}
      <div className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r ${gradient}`} />

      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50`} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            'h-10 w-10 rounded-xl flex items-center justify-center',
            'bg-white/[0.06] border border-white/[0.1]'
          )}>
            <Icon className={cn('h-5 w-5', iconColor)} />
          </div>
          {trend && (
            <span className={cn(
              'text-xs font-medium px-2 py-1 rounded-lg',
              trend.positive
                ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                : 'text-red-400 bg-red-500/10 border border-red-500/20'
            )}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </span>
          )}
        </div>

        {/* Value */}
        <div className="space-y-1">
          <p className="text-3xl font-bold font-[family-name:var(--font-poppins)] text-white tracking-tight">
            {value}
          </p>
          <p className="text-sm font-medium text-gray-300">{label}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </motion.div>
  );
}
