'use client'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
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
    <div className="min-h-screen bg-[#090909] text-[#FAFAFA] flex items-center justify-center px-4">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.15] pointer-events-none" />

      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-6 hidden lg:block">
          <span className="inline-flex items-center gap-2 rounded-lg border border-[#232323] bg-[#111111] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Secure Access
          </span>

          <h1 className="text-4xl font-semibold tracking-tight text-white leading-tight">
            Welcome back to your feedback desk.
          </h1>

          <p className="text-gray-400">
            Sign in to view your inbox, control who can reach you, and keep the conversation moving.
          </p>

          <div className="rounded-2xl border border-[#232323] bg-[#111111] p-6">
            <h3 className="text-lg font-medium text-white mb-4">Why creators use Feedbackly</h3>
            <ul className="space-y-3.5 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Anonymous messages without the clutter.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                One-click pause and play controls.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Clean, distraction-free inbox view.
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="rounded-2xl border border-[#232323] bg-[#111111] p-6 md:p-8 shadow-2xl">
            
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold text-white">Sign in</h2>
              <p className="text-gray-400 text-sm mt-1">
                Enter your credentials to continue
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-5">
                
                <FormField
                  name="identifier"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email or username</FormLabel>
                      <Input
                        {...field}
                        className="bg-[#090909] border border-[#232323] text-white focus:border-white/40 focus:ring-0 rounded-xl"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Password</FormLabel>
                      <Input
                        type="password"
                        {...field}
                        className="bg-[#090909] border border-[#232323] text-white focus:border-white/40 focus:ring-0 rounded-xl"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full bg-white text-black hover:bg-white/90 font-semibold transition-colors mt-2"
                  type="submit"
                >
                  Sign In
                </Button>
              </form>
            </Form>

            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm">
                New to Feedbackly?{' '}
                <Link href="/sign-up" className="text-white hover:underline font-medium">
                  Create an account
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Page