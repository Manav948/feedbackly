"use client";

import React from "react";
import Link from "next/link";
import { GradientButton } from "@/components/ui/GradientButton";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";

export default function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-24 border-t border-[#232323] pt-16">
      <AnimatedContainer variant="slideUp">
        <div className="relative rounded-2xl overflow-hidden p-8 md:p-12 text-center bg-[#111111] border border-[#232323]">
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
              Ready to hear the truth?
            </h2>

            <p className="text-gray-400 max-w-md mx-auto text-base">
              Create your link and start collecting honest anonymous feedback from your community today.
            </p>

            <div className="flex justify-center gap-4 flex-wrap pt-4">
              <Link href="/sign-up">
                <GradientButton variant="primary" size="lg">Create account</GradientButton>
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