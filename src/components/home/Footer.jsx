"use client";
import Link from "next/link";
import { MessageSquare, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080B14] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-4">

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">
                Feedbackly
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Collect anonymous feedback, improve faster, and grow with honest insights.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
              <Link href="/#" className="hover:text-white">Feedback</Link>
              <Link href="/#" className="hover:text-white">Analytics</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="#" className="hover:text-white">About</Link>
              <Link href="#" className="hover:text-white">Privacy</Link>
              <Link href="#" className="hover:text-white">Terms</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Connect</h4>
            <div className="flex gap-3">
              <Link href="https://github.com/Manav948">
                <Github className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
              <Link href="https://x.com/ManavValani">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
              <Link href="https://www.linkedin.com/in/ManavValani/">
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Feedbackly. All rights reserved.</p>
          <p>Made by Manav Valani</p>
        </div>  
      </div>
    </footer>
  );
}