"use client";

import React from "react";
import { AnimatedContainer, AnimatedItem } from "@/components/ui/AnimatedContainer";
import { GlassCard } from "@/components/ui/GlassCard";

const steps = [
  {
    step: "01",
    title: "Create your account",
    description: "Sign up instantly and claim your custom feedback username.",
  },
  {
    step: "02",
    title: "Share your link",
    description: "Post your unique URL in your bio, website, or anywhere you interact.",
  },
  {
    step: "03",
    title: "Collect & act",
    description: "Receive anonymous feedback in real-time inside your dashboard HQ.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24 border-t border-[#232323]">
      <AnimatedContainer variant="slideUp">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            How it works
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-base">
            Three simple steps to establish your own anonymous feedback loop.
          </p>
        </div>
      </AnimatedContainer>

      <AnimatedContainer variant="stagger">
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <AnimatedItem key={step.step}>
              <GlassCard className="p-6 h-full flex flex-col items-start bg-[#111111] border border-[#232323] hover:border-white/20 transition-colors">
                <div className="text-[#E2E2E2] font-mono text-sm tracking-wider font-semibold border border-[#232323] px-2 py-0.5 rounded bg-[#1c1c1c] mb-4">
                  STEP {step.step}
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
              </GlassCard>
            </AnimatedItem>
          ))}
        </div>
      </AnimatedContainer>
    </section>
  );
}