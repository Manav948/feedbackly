'use client'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod';
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { signInSchema } from '@/schemas/signIn'
import { signIn } from 'next-auth/react'

const Page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  const onsubmit = async (data: z.infer<typeof signInSchema>) => {
    const response = await signIn('credentials', {
      redirect: false,
      callbackUrl: '/dashboard',
      identifier: data.identifier,
      password: data.password
    })
    if (response?.error) {
      toast.error(response.error);
    } else if (response?.ok && response.url) {
      router.replace(response.url);
    } else {
      toast.error("Invalid credentials");
    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-[#0b0d11] text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-10 top-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute left-8 bottom-10 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-[120px]" />
      </div>

      <div className="container mx-auto flex min-h-screen items-center px-4 py-10">
        <div className="grid w-full gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
              Secure access
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Welcome back to your feedback desk.
            </h1>
            <p className="text-lg text-gray-300">
              Sign in to view your inbox, control who can reach you, and keep the conversation
              moving.
            </p>
            <div className="hidden lg:block rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <h3 className="text-lg font-semibold mb-3">Why people love Feedbackly</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Anonymous messages without the chaos.</li>
                <li>• One-click pause and delete controls.</li>
                <li>• Clean, distraction-free inbox view.</li>
              </ul>
            </div>
          </div>

          <div className="w-full max-w-xl justify-self-end">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
              <div className="mb-6">
                <h2 className="text-3xl font-bold">Sign in</h2>
                <p className="text-gray-400 text-sm">
                  Enter your credentials to jump back into the dashboard.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-5">
                  <FormField
                    name="identifier"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Email or username</FormLabel>
                        <Input
                          {...field}
                          className="bg-black/40 border border-white/15 text-white placeholder-gray-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40"
                        />
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Password</FormLabel>
                        <Input
                          type="password"
                          {...field}
                          className="bg-black/40 border border-white/15 text-white placeholder-gray-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40"
                        />
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-black font-semibold hover:shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                    type="submit"
                  >
                    Sign In
                  </Button>
                </form>
              </Form>

              <div className="text-center mt-6">
                <p className="text-gray-400 text-sm">
                  New to Feedbackly?{' '}
                  <Link href="/sign-up" className="text-emerald-300 hover:text-emerald-200 font-medium">
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
