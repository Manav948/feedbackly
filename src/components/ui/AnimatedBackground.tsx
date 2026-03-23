'use client';
import React from 'react';

interface BlobProps {
  className?: string;
  color?: string;
  size?: string;
  delay?: number;
}

function Blob({ className = '', color = 'rgba(124, 58, 237, 0.25)', size = '500px', delay = 0 }: BlobProps) {
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
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F1A] via-[#0D1425] to-[#080B14]" />

      {variant === 'default' && (
        <>
          <Blob
            className="blob-animation -left-32 -top-32"
            color="rgba(124, 58, 237, 0.2)"
            size="600px"
            delay={0}
          />
          <Blob
            className="blob-animation right-0 top-1/4"
            color="rgba(59, 130, 246, 0.15)"
            size="500px"
            delay={2}
          />
          <Blob
            className="blob-animation bottom-0 left-1/3"
            color="rgba(6, 182, 212, 0.12)"
            size="400px"
            delay={4}
          />
          <Blob
            className="blob-animation right-1/4 bottom-1/4"
            color="rgba(236, 72, 153, 0.1)"
            size="350px"
            delay={1}
          />
        </>
      )}

      {variant === 'auth' && (
        <>
          <Blob
            className="blob-animation -right-24 -top-24"
            color="rgba(124, 58, 237, 0.25)"
            size="450px"
            delay={0}
          />
          <Blob
            className="blob-animation -left-24 bottom-0"
            color="rgba(6, 182, 212, 0.18)"
            size="400px"
            delay={3}
          />
          <Blob
            className="blob-animation left-1/2 top-1/2"
            color="rgba(236, 72, 153, 0.08)"
            size="300px"
            delay={1.5}
          />
        </>
      )}

      {variant === 'dashboard' && (
        <>
          <Blob
            className="blob-animation -left-40 top-0"
            color="rgba(124, 58, 237, 0.18)"
            size="700px"
            delay={0}
          />
          <Blob
            className="blob-animation right-0 -top-20"
            color="rgba(59, 130, 246, 0.12)"
            size="600px"
            delay={2.5}
          />
          <Blob
            className="blob-animation left-1/2 bottom-0"
            color="rgba(6, 182, 212, 0.1)"
            size="500px"
            delay={5}
          />
        </>
      )}

      {variant === 'minimal' && (
        <>
          <Blob
            className="blob-animation left-1/4 top-1/4"
            color="rgba(124, 58, 237, 0.1)"
            size="400px"
            delay={0}
          />
          <Blob
            className="blob-animation right-1/4 bottom-1/4"
            color="rgba(59, 130, 246, 0.08)"
            size="350px"
            delay={3}
          />
        </>
      )}

      {showGrid && (
        <div className="absolute inset-0 bg-grid opacity-40" />
      )}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(11,15,26,0.8)_100%)] overflow-hidden" />
    </div>
  );
}
