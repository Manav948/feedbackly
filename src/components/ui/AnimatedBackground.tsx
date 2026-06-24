'use client';
import React from 'react';

interface BlobProps {
  className?: string;
  color?: string;
  size?: string;
  delay?: number;
}

function Blob({ className = '', color = 'rgba(255, 255, 255, 0.015)', size = '500px', delay = 0 }: BlobProps) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-[120px] ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

interface AnimatedBackgroundProps {
  variant?: 'default' | 'auth' | 'dashboard' | 'minimal';
  showGrid?: boolean;
}

export function AnimatedBackground({ variant = 'default', showGrid = false }: AnimatedBackgroundProps) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#090909]" />

      {variant === 'default' && (
        <>
          <Blob
            className="blob-animation -left-32 -top-32"
            color="rgba(255, 255, 255, 0.015)"
            size="600px"
            delay={0}
          />
          <Blob
            className="blob-animation right-0 top-1/4"
            color="rgba(255, 255, 255, 0.01)"
            size="500px"
            delay={2}
          />
          <Blob
            className="blob-animation bottom-0 left-1/3"
            color="rgba(255, 255, 255, 0.008)"
            size="400px"
            delay={4}
          />
        </>
      )}

      {variant === 'auth' && (
        <>
          <Blob
            className="blob-animation -right-24 -top-24"
            color="rgba(255, 255, 255, 0.015)"
            size="450px"
            delay={0}
          />
          <Blob
            className="blob-animation -left-24 bottom-0"
            color="rgba(255, 255, 255, 0.01)"
            size="400px"
            delay={3}
          />
        </>
      )}

      {variant === 'dashboard' && (
        <>
          <Blob
            className="blob-animation -left-40 top-0"
            color="rgba(255, 255, 255, 0.012)"
            size="700px"
            delay={0}
          />
          <Blob
            className="blob-animation right-0 -top-20"
            color="rgba(255, 255, 255, 0.008)"
            size="600px"
            delay={2.5}
          />
        </>
      )}

      {variant === 'minimal' && (
        <>
          <Blob
            className="blob-animation left-1/4 top-1/4"
            color="rgba(255, 255, 255, 0.005)"
            size="400px"
            delay={0}
          />
        </>
      )}

      {showGrid && (
        <div className="absolute inset-0 bg-grid opacity-30" />
      )}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(9,9,9,0.9)_100%)] overflow-hidden" />
    </div>
  );
}
