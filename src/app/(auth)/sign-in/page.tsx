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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-800 bg-white/10 backdrop-blur-xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-5xl mb-2">
            Welcome Back
          </h1>
          <p className="mb-6 text-gray-400">
            Sign in to continue your secret conversations
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email/Username</FormLabel>
                  <Input
                    {...field}
                    className="bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
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
                  <FormLabel className="text-gray-300">Password</FormLabel>
                  <Input
                    type="password"
                    {...field}
                    className="bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                  />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-2 rounded-lg transition-all duration-300 shadow-lg shadow-purple-900/50"
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </Form>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-purple-400 hover:text-purple-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
