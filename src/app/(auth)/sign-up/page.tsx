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
      const axiosError = error as AxiosError<ApiResponse>
      console.log(axiosError.response?.data.message)
      toast.error("Sign-up failed, please try again")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-[#0b0d11] text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-10 top-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute left-8 bottom-10 h-64 w-64 rounded-full bg-cyan-500/15 blur-[120px]" />
      </div>

      <div className="container mx-auto flex min-h-screen items-center px-4 py-10">
        <div className="grid w-full gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
              Create your link
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Join Feedbackly and get an anonymous inbox in seconds.
            </h1>
            <p className="text-lg text-gray-300">
              Choose a username, share your link, and start collecting honest feedback from friends,
              customers, or teammates.
            </p>
            <div className="hidden lg:block rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <h3 className="text-lg font-semibold mb-3">You&apos;ll be able to:</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Toggle new messages on/off anytime.</li>
                <li>• Delete messages instantly from your dashboard.</li>
                <li>• Share your unique link wherever you want.</li>
              </ul>
            </div>
          </div>

          <div className="w-full max-w-xl justify-self-end">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
              <div className="mb-6">
                <h2 className="text-3xl font-bold">Create your account</h2>
                <p className="text-gray-400 text-sm">
                  We&apos;ll email a verification code to keep your inbox secure.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Username</FormLabel>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            setUsername(e.target.value)
                          }}
                          className="bg-black/40 border border-white/15 text-white placeholder-gray-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40"
                        />
                        {userMessage && (
                          <p className={`text-sm ${userMessage.includes('available') ? 'text-emerald-300' : 'text-red-400'}`}>
                            {userMessage}
                          </p>
                        )}
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Email</FormLabel>
                        <Input
                          {...field}
                          type="email"
                          className="bg-black/40 border border-white/15 text-white placeholder-gray-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40"
                        />
                        <p className="text-gray-400 text-sm">We&apos;ll send your verification code here.</p>
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
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-black font-semibold hover:shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      'Create account'
                    )}
                  </Button>
                </form>
              </Form>

              <div className="text-center mt-6">
                <p className="text-gray-400 text-sm">
                  Already with us?{' '}
                  <Link href="/sign-in" className="text-emerald-300 hover:text-emerald-200 font-medium">
                    Sign in
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
