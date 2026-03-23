"use client";
import { AnimatedContainer, AnimatedItem } from "@/components/ui/AnimatedContainer";
import { GlassCard } from "@/components/ui/GlassCard";

const steps = [
  {
    step: "01",
    title: "Create your account",
    description: "Sign up and create your personal feedback link.",
  },
  {
    step: "02",
    title: "Share your link",
    description: "Share your link anywhere to collect feedback.",
  },
  {
    step: "03",
    title: "Collect & review",
    description: "Read feedback inside your dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <AnimatedContainer variant="slideUp">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            How it works
          </h2>
        </div>
      </AnimatedContainer>

      <AnimatedContainer variant="stagger">
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <AnimatedItem key={step.step}>
              <GlassCard className="p-6">
                <div className="text-violet-400 font-bold mb-2">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </GlassCard>
            </AnimatedItem>
          ))}
        </div>
      </AnimatedContainer>
    </section>
  );
}