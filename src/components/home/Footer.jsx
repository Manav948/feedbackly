"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#232323] bg-[#090909]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-4">

          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <MessageSquare className="h-4 w-4 text-black" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Feedbackly
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Collect anonymous feedback, improve faster, and grow with honest insights.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white tracking-wider uppercase mb-4">Product</h4>
            <div className="flex flex-col gap-2.5 text-sm text-gray-400">
              <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
              <Link href="/#how-it-works" className="hover:text-white transition-colors">How it works</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white tracking-wider uppercase mb-4">Company</h4>
            <div className="flex flex-col gap-2.5 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">About Us</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-medium text-white tracking-wider uppercase mb-4">Connect</h4>
            <div className="flex gap-4">
              <Link href="https://github.com/Manav948" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </Link>
              <Link href="https://x.com/ManavValani" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </Link>
              <Link href="https://www.linkedin.com/in/ManavValani/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

        </div>

        <div className="border-t border-[#232323] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Feedbackly. All rights reserved.</p>
          <p className="hover:text-white transition-colors">Made by Manav Valani</p>
        </div>  
      </div>
    </footer>
  );
}