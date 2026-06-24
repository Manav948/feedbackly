'use client'
import React, { useState, useEffect } from 'react'
import { ApiResponse } from '@/types/apiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signUp } from '@/schemas/signUp'
import Link from 'next/link'
import * as z from 'zod'
import { useDebounceCallback } from 'usehooks-ts'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Input } from "@/components/ui/input"

const Page = () => {
  const [username, setUsername] = useState('')
  const [userMessage, setUserMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const debounced = useDebounceCallback(setUsername, 500)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(signUp),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    const checkUser = async () => {
      if (username) {
        setLoading(true)
        setUserMessage('')
        try {
          const response = await axios.get(`/api/check-username?username=${username}`)
          setUserMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>
          setUserMessage(axiosError.response?.data.message ?? "Error checking username")
        } finally {
          setLoading(false)
        }
      }
    }
    checkUser()
  }, [username])

  const onSubmit = async (data: z.infer<typeof signUp>) => {
    setLoading(true)
    try {
      await axios.post<ApiResponse>('/api/sign-up', data)
      toast.success('Sign-Up successful! Please verify OTP')
      router.replace(`/verify/${username}`)
    } catch (error) {
      toast.error("Sign-up failed, please try again")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#090909] text-[#FAFAFA] flex items-center justify-center px-4">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.15] pointer-events-none" />

      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center relative z-10">

        <div className="space-y-6 hidden lg:block">
          <span className="inline-flex items-center gap-2 rounded-lg border border-[#232323] bg-[#111111] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Create your link
          </span>

          <h1 className="text-4xl font-semibold tracking-tight text-white leading-tight">
            Join Feedbackly and get your anonymous inbox.
          </h1>

          <p className="text-gray-400">
            Choose a username, share your unique link, and start collecting honest feedback.
          </p>

          <div className="rounded-2xl border border-[#232323] bg-[#111111] p-6">
            <h3 className="text-lg font-medium text-white mb-4">You'll be able to:</h3>
            <ul className="space-y-3.5 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Toggle new messages on/off anytime.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Delete unwanted messages instantly.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Share your public link in one click.
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="rounded-2xl border border-[#232323] bg-[#111111] p-6 md:p-8 shadow-2xl">
            
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold text-white">Create account</h2>
              <p className="text-gray-400 text-sm mt-1">
                Start collecting anonymous feedback today
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Username</FormLabel>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          setUsername(e.target.value)
                        }}
                        className="bg-[#090909] border border-[#232323] text-white focus:border-white/40 focus:ring-0 rounded-xl"
                      />
                      {userMessage && (
                        <p className={`text-xs mt-1 ${userMessage.includes('available') ? 'text-gray-300 font-medium' : 'text-red-400'}`}>
                          {userMessage}
                        </p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <Input
                        {...field}
                        type="email"
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
                  type="submit"
                  className="w-full bg-white text-black hover:bg-white/90 font-semibold transition-colors mt-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin text-black" />
                      Creating account...
                    </>
                  ) : (
                    'Create account'
                  )}
                </Button>

              </form>
            </Form>

            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <Link href="/sign-in" className="text-white hover:underline font-medium">
                  Sign in
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