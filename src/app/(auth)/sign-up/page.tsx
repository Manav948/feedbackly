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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-800 bg-white/10 backdrop-blur-xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-5xl mb-2">
            Join with Feedbackly
          </h1>
          <p className="mb-6 text-gray-400">Sign up to start your anonymous adventure</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Username</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      setUsername(e.target.value)
                    }}
                    className="bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                  />
                  {userMessage && (
                    <p className={`text-sm ${userMessage.includes('available') ? 'text-green-400' : 'text-red-400'}`}>
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
                  <FormLabel className="text-white">Email</FormLabel>
                  <Input
                    {...field}
                    type="email"
                    className="bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                  />
                  <p className="text-gray-400 text-sm">We will send you a verification code</p>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
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
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-2 rounded-lg transition-all duration-300 shadow-lg shadow-purple-900/50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already a member?{' '}
            <Link href="/sign-in" className="text-purple-400 hover:text-purple-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
