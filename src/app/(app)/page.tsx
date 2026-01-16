'use client';
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail, Sparkles, ShieldCheck, Send, ArrowRight, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Autoplay from 'embla-carousel-autoplay'
import messages from '@/messages.json'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

const features = [
  {
    title: 'Anonymous by design',
    description: 'Invite honest thoughts without exposing identities.',
    icon: ShieldCheck,
  },
  {
    title: 'Share-ready links',
    description: 'Get a personal link you can share anywhere in seconds.',
    icon: Send,
  },
  {
    title: 'Stay in control',
    description: 'Pause messages or delete any note instantly.',
    icon: Sparkles,
  },
]

const steps = [
  'Create your account and claim a username.',
  'Share your unique link with friends or customers.',
  'Collect, review, and respond to feedback on your dashboard.',
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-[#05060a] text-white">
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />
          <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-[140px]" />
        </div>

        <section className="container mx-auto px-4 md:px-10 pt-14 pb-16">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                Built for honest conversations
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                Collect anonymous feedback with zero friction.
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl">
                Feedbackly gives you a polished public link, a calm inbox, and controls that keep
                feedback safe. Perfect for creators, teams, and communities that want the real story.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-black font-semibold hover:shadow-[0_0_24px_rgba(16,185,129,0.35)]">
                  <Link href="/sign-up">Start for free</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/20 text-black hover:bg-white/10">
                  <Link href="/sign-in" className="flex items-center gap-2">
                    Go to dashboard <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-emerald-300" />
                  <span>Trusted for private feedback</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-cyan-300" />
                  <span>Easy controls & quick cleanup</span>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/20 via-cyan-500/10 to-fuchsia-500/20 blur-3xl pointer-events-none" />
              <Card className="relative border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl">
                <CardHeader className="pb-0">
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    Live feedback stream
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <Carousel plugins={[Autoplay({ delay: 2600 })]} className="w-full">
                    <CarouselContent>
                      {messages.map((message, index) => (
                        <CarouselItem key={index}>
                          <Card className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 border border-white/10 shadow-lg rounded-2xl">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm text-emerald-200 flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                {message.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-gray-100">
                              <p className="leading-relaxed text-gray-200">{message.content}</p>
                              <p className="text-xs text-gray-400">{message.received}</p>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="features" className="container mx-auto px-4 md:px-10 pb-16">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="border border-white/10 bg-white/5 backdrop-blur-lg rounded-2xl hover:border-emerald-300/40 transition"
              >
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-300">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="container mx-auto px-4 md:px-10 pb-16">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl p-10">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-5 w-5 text-emerald-300" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">How Feedbackly works</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((step, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300 font-semibold">
                    {idx + 1}
                  </div>
                  <p className="text-gray-300 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 md:px-10 pb-14">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-500/15 via-cyan-500/15 to-fuchsia-500/15 p-10 text-center">
            <h3 className="text-3xl font-bold text-white mb-3">Ready to ask better questions?</h3>
            <p className="text-gray-200 max-w-2xl mx-auto mb-6">
              Spin up your anonymous inbox in under a minute. Get the honesty you need, keep the
              control you want.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild className="bg-white text-black font-semibold hover:bg-gray-100">
                <Link href="/sign-up">Create free account</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/30 text-black hover:bg-white/10">
                <Link href="/sign-in">See dashboard</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-black/60 backdrop-blur-sm py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Feedbackly. Built for safer conversations.
      </footer>
    </div>
  )
}
