"use client";

import React from "react";
import { Lock, Inbox, Zap, Trash2, Globe, Lightbulb, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedContainer, AnimatedItem } from "@/components/ui/AnimatedContainer";

const features = [
  {
    title: "Anonymous by Design",
    description: "Collect honest and helpful feedback from users without exposing their identities.",
    icon: Lock,
  },
  {
    title: "Dashboard Inbox HQ",
    description: "A centralized, technical feed to view, organize, and refresh your messages.",
    icon: Inbox,
  },
  {
    title: "Full Toggle Control",
    description: "Pause or resume message acceptance instantly directly from your settings.",
    icon: Zap,
  },
  {
    title: "Clean & Tidy Feed",
    description: "Permanently delete irrelevant or resolved messages to keep your board clean.",
    icon: Trash2,
  },
  {
    title: "Share-Ready Public Links",
    description: "Claim your custom public handle and share it in your social bios, websites, or newsletters.",
    icon: Globe,
  },
  {
    title: "Quick suggestions",
    description: "Provide visitors with randomized suggest cards to jumpstart their feedback loop.",
    icon: Lightbulb,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <AnimatedContainer variant="slideUp">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-lg border border-[#232323] bg-[#111111] px-3.5 py-1 text-xs font-medium uppercase tracking-[0.15em] text-gray-400 mb-4">
            <Sparkles className="h-3 w-3" /> Core Utility
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Everything you need. Nothing you don't.
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto text-base">
            Surgically built utility features to help you collect and review anonymous insights with ease.
          </p>
        </div>
      </AnimatedContainer>

      <AnimatedContainer variant="stagger">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <AnimatedItem key={f.title}>
              <GlassCard className="p-6 h-full flex flex-col items-start bg-[#111111] border border-[#232323] hover:border-white/20 transition-colors">
                <div className="h-10 w-10 rounded-lg bg-[#232323] border border-[#232323] flex items-center justify-center text-white mb-5">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.description}</p>
              </GlassCard>
            </AnimatedItem>
          ))}
        </div>
      </AnimatedContainer>
    </section>
  );
}