"use client";
import { Shield, Globe, Zap, Lock, Send, Users, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedContainer, AnimatedItem } from "@/components/ui/AnimatedContainer";

const features = [
  {
    title: "Anonymous by design",
    description: "Collect honest feedback without exposing identities.",
    icon: Shield,
  },
  {
    title: "Share-ready links",
    description: "Get your personal link and share anywhere.",
    icon: Globe,
  },
  {
    title: "Full control",
    description: "Pause, delete, and manage messages anytime.",
    icon: Zap,
  },
  {
    title: "Secure",
    description: "Encrypted and anonymous messages.",
    icon: Lock,
  },
  {
    title: "Instant delivery",
    description: "Messages arrive in real time.",
    icon: Send,
  },
  {
    title: "Team ready",
    description: "Use for teams, creators, or communities.",
    icon: Users,
  },
];

export default function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <AnimatedContainer variant="slideUp">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs uppercase tracking-widest text-blue-300 mb-4">
            <Sparkles className="h-3 w-3" /> Features
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Everything you need
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Built for creators, teams, and communities who want real feedback.
          </p>
        </div>
      </AnimatedContainer>

      <AnimatedContainer variant="stagger">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <AnimatedItem key={f.title}>
              <GlassCard className="p-5">
                <f.icon className="h-6 w-6 text-violet-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-400">{f.description}</p>
              </GlassCard>
            </AnimatedItem>
          ))}
        </div>
      </AnimatedContainer>
    </section>
  );
}