'use client';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface Shape {
  type: 'circle' | 'ring' | 'diamond' | 'cross' | 'dots';
  x: string;
  y: string;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

const shapes: Shape[] = [
  { type: 'ring', x: '10%', y: '15%', size: 80, color: 'rgba(124, 58, 237, 0.6)', delay: 0, duration: 6 },
  { type: 'circle', x: '80%', y: '20%', size: 50, color: 'rgba(59, 130, 246, 0.5)', delay: 1, duration: 7 },
  { type: 'diamond', x: '70%', y: '70%', size: 40, color: 'rgba(6, 182, 212, 0.6)', delay: 0.5, duration: 5 },
  { type: 'ring', x: '85%', y: '55%', size: 60, color: 'rgba(236, 72, 153, 0.4)', delay: 2, duration: 8 },
  { type: 'circle', x: '15%', y: '70%', size: 35, color: 'rgba(167, 139, 250, 0.5)', delay: 1.5, duration: 6 },
  { type: 'cross', x: '45%', y: '10%', size: 30, color: 'rgba(6, 182, 212, 0.5)', delay: 0.8, duration: 7 },
  { type: 'dots', x: '55%', y: '80%', size: 20, color: 'rgba(124, 58, 237, 0.4)', delay: 2.5, duration: 5 },
  { type: 'ring', x: '30%', y: '40%', size: 100, color: 'rgba(59, 130, 246, 0.15)', delay: 1.2, duration: 9 },
];

function ShapeElement({ shape }: { shape: Shape }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: '+=20',
      x: '+=8',
      rotation: '+=15',
      duration: shape.duration,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: shape.delay,
    });
  }, [shape.delay, shape.duration]);

  const common = {
    position: 'absolute' as const,
    left: shape.x,
    top: shape.y,
    transform: 'translate(-50%, -50%)',
  };

  if (shape.type === 'ring') {
    return (
      <div
        ref={ref}
        style={{
          ...common,
          width: shape.size,
          height: shape.size,
          borderRadius: '50%',
          border: `2px solid ${shape.color}`,
          boxShadow: `0 0 20px ${shape.color}, inset 0 0 20px ${shape.color.replace('0.', '0.1')}`,
        }}
      />
    );
  }

  if (shape.type === 'circle') {
    return (
      <div
        ref={ref}
        style={{
          ...common,
          width: shape.size,
          height: shape.size,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${shape.color}, transparent 70%)`,
          boxShadow: `0 0 30px ${shape.color}`,
        }}
      />
    );
  }

  if (shape.type === 'diamond') {
    return (
      <div
        ref={ref}
        style={{
          ...common,
          width: shape.size,
          height: shape.size,
          background: shape.color,
          transform: 'translate(-50%, -50%) rotate(45deg)',
          boxShadow: `0 0 20px ${shape.color}`,
        }}
      />
    );
  }

  if (shape.type === 'cross') {
    return (
      <div ref={ref} style={{ ...common, width: shape.size, height: shape.size, position: 'absolute' }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: '2px',
          height: '100%',
          background: shape.color,
          transform: 'translateX(-50%)',
          boxShadow: `0 0 10px ${shape.color}`,
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          height: '2px',
          width: '100%',
          background: shape.color,
          transform: 'translateY(-50%)',
          boxShadow: `0 0 10px ${shape.color}`,
        }} />
      </div>
    );
  }

  if (shape.type === 'dots') {
    return (
      <div ref={ref} style={{ ...common, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: shape.size / 3,
              height: shape.size / 3,
              borderRadius: '50%',
              background: shape.color,
              boxShadow: `0 0 8px ${shape.color}`,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}

export function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((shape, i) => (
        <ShapeElement key={i} shape={shape} />
      ))}

      {/* Large ambient rings */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          border: '1px solid rgba(124, 58, 237, 0.08)',
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        style={{
          width: 400,
          height: 400,
          borderRadius: '50%',
          border: '1px solid rgba(6, 182, 212, 0.08)',
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          border: '1px solid rgba(236, 72, 153, 0.1)',
        }}
      />
    </div>
  );
}
