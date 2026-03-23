"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { AnimatedContainer, AnimatedItem } from "@/components/ui/AnimatedContainer";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <AnimatedContainer variant="stagger">
            <AnimatedItem>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1 text-xs uppercase tracking-widest text-violet-300 mb-6">
                <Sparkles className="h-3 w-3" />
                Anonymous feedback platform
              </span>
            </AnimatedItem>

            <AnimatedItem>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Honest feedback, <br />
                <span className="gradient-text">zero friction.</span>
              </h1>
            </AnimatedItem>

            <AnimatedItem>
              <p className="text-gray-400 text-sm sm:text-base max-w-lg mb-8">
                Feedbackly lets you collect anonymous feedback with a beautiful dashboard.
                Share your link, receive honest messages, and grow with real insights.
              </p>
            </AnimatedItem>

            <AnimatedItem>
              <div className="flex flex-wrap gap-3">
                <Link href="/sign-up">
                  <GradientButton size="lg">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </GradientButton>
                </Link>

                <Link href="/sign-in">
                  <GradientButton variant="secondary" size="lg">
                    Go to Dashboard
                  </GradientButton>
                </Link>
              </div>
            </AnimatedItem>
          </AnimatedContainer>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-cyan-500/20 blur-3xl" />

            <div className="relative rounded-3xl glass border border-white/[0.12] p-6">
              <div className="space-y-4">
                <div className="bg-white/[0.05] border border-white/[0.08] rounded-xl p-4">
                  <p className="text-sm text-gray-300">
                    "Your UI is amazing but mobile version needs improvement."
                  </p>
                </div>

                <div className="bg-white/[0.05] border border-white/[0.08] rounded-xl p-4">
                  <p className="text-sm text-gray-300">
                    "I love this platform, super clean and easy to use."
                  </p>
                </div>

                <div className="bg-white/[0.05] border border-white/[0.08] rounded-xl p-4">
                  <p className="text-sm text-gray-300">
                    "Add analytics and charts feature!"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}