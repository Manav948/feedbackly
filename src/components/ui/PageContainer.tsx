'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  withSidebar?: boolean;
}

const maxWidthMap = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
  '2xl': 'max-w-7xl',
  full: 'max-w-full',
};

export function PageContainer({
  children,
  className,
  maxWidth = 'xl',
  withSidebar = false,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        'min-h-screen w-full px-4 py-8 md:px-8 md:py-10',
        withSidebar && 'pl-[72px] md:pl-[220px]',
        className
      )}
    >
      <div className={cn('mx-auto w-full', maxWidthMap[maxWidth])}>
        {children}
      </div>
    </div>
  );
}
