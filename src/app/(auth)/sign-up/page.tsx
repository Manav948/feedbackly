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
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-[#0b0d11] text-white flex items-center justify-center px-4">

      <div className="absolute inset-0 -z-10">
        <div className="absolute right-10 top-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute left-8 bottom-10 h-64 w-64 rounded-full bg-cyan-500/15 blur-[120px]" />
      </div>

      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-10 items-center">

        <div className="space-y-6 hidden lg:block">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
            Create your link
          </span>

          <h1 className="text-4xl font-extrabold leading-tight">
            Join Feedbackly and get an anonymous inbox.
          </h1>

          <p className="text-gray-300">
            Choose a username, share your link, and start collecting honest feedback.
          </p>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <h3 className="text-lg font-semibold mb-3">You'll be able to:</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Toggle new messages on/off anytime.</li>
              <li>• Delete messages instantly.</li>
              <li>• Share your unique link.</li>
            </ul>
          </div>
        </div>
        <div className="w-full max-w-md mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-2xl backdrop-blur-xl">
            
            <div className="mb-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold">Create account</h2>
              <p className="text-gray-400 text-sm">
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
                      <FormLabel>Username</FormLabel>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          setUsername(e.target.value)
                        }}
                        className="bg-black/40 border border-white/15 text-white"
                      />
                      {userMessage && (
                        <p className={`text-xs ${userMessage.includes('available') ? 'text-emerald-300' : 'text-red-400'}`}>
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
                      <FormLabel>Email</FormLabel>
                      <Input
                        {...field}
                        type="email"
                        className="bg-black/40 border border-white/15 text-white"
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
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        {...field}
                        className="bg-black/40 border border-white/15 text-white"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-cyan-500/20 text-white font-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
                <Link href="/sign-in" className="text-violet-500 hover:text-violet-600 font-medium">
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