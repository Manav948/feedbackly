'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Bolt, Lock, Shield } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';
import FeedbackLoopAnimation from './FeedbackLoopAnimation';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      
      <div className="absolute inset-0 bg-grid opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-lg border border-[#232323] bg-[#111111] px-3.5 py-1 text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                Precision minimal loops
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.05]">
                Every Customer Idea. <br />
                <span className="text-[#E2E2E2]">One Place.</span>
              </h1>
            </div>

            <p className="text-gray-400 text-base sm:text-lg max-w-lg leading-relaxed">
              Collect, review, and act on anonymous feedback without losing valuable customer insights. Simple, clean, and completely private by design.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/sign-up">
                <GradientButton variant="primary" size="lg">
                  Start Collecting Feedback
                  <ArrowRight className="h-4 w-4 ml-1" />
                </GradientButton>
              </Link>

              <Link href="/#features">
                <GradientButton variant="secondary" size="lg">
                  Explore Features
                </GradientButton>
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-8 border-t border-[#232323] text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Bolt className="h-4 w-4 text-gray-400" />
                <span>Real-time Inbox</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-gray-400" />
                <span>Complete Anonymity</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-gray-400" />
                <span>Toggle Controls</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="w-full relative"
          >
          
            <FeedbackLoopAnimation />
          </motion.div>

        </div>
      </div>
    </section>
  );
}