"use client";
import Link from "next/link";
import { GradientButton } from "@/components/ui/GradientButton";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";

export default function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-20">
      <AnimatedContainer variant="slideUp">
        <div className="relative rounded-3xl overflow-hidden p-8 md:p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-blue-600/15 to-cyan-600/20" />
          <div className="absolute inset-0 backdrop-blur-xl" />
          <div className="absolute inset-0 border border-white/[0.12] rounded-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to hear the truth?
            </h2>

            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Join Feedbackly and start collecting anonymous feedback today.
            </p>

            <div className="flex justify-center gap-3 flex-wrap">
              <Link href="/sign-up">
                <GradientButton size="lg">Create account</GradientButton>
              </Link>
              <Link href="/sign-in">
                <GradientButton variant="secondary" size="lg">
                  Go to dashboard
                </GradientButton>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedContainer>
    </section>
  );
}