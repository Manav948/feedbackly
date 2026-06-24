"use client";

import React from "react";
import { AnimatedContainer, AnimatedItem } from "@/components/ui/AnimatedContainer";

const stats = [
  { value: "10K+", label: "Active users" },
  { value: "500K+", label: "Messages sent" },
  { value: "99.9%", label: "Uptime guarantee" },
  { value: "< 1s", label: "Instant delivery" },
];

export default function StatsBar() {
  return (
    <section className="border-y border-[#232323] bg-[#0c0c0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <AnimatedContainer variant="stagger">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {stats.map((stat) => (
              <AnimatedItem key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-1">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">{stat.label}</p>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}