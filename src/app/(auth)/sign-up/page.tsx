'use client'
import React from 'react'
import { ApiResponse } from '@/types/apiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { signUp } from '@/schemas/signUp'
import Link from 'next/link'
import * as z from 'zod';
import { useDebounceCallback } from 'usehooks-ts'
import toast, { Toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input"
const page = () => {
  const [username, setUsername] = useState('');
  const [userMessage, setUserMessage] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [loading, setLoading] = useState(false)
  const debounced = useDebounceCallback(setUsername, 500)
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(signUp),  // signUp is a signgnUp schema from schemas folder
    defaultValues: {
      username: '',
      email: '',
      password:''
    }
  })

  useEffect(() => {
    const checkUser = async () => {
      if (debounced) {
        setLoading(true)
        setUserMessage('')
        try {
          const response = await axios.get(`/api/check-username?username=${debounced}`)
          setUserMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUserMessage(axiosError.response?.data.message ?? "Error checking message")
        } finally {
          setLoading(false);
        }
      }
    }
    checkUser()
  }, [debounced])

  const onSubmit = async (data: z.infer<typeof signUp>) => {
    setLoading(true)
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up',data)
      toast.success('Sign-Up successfully please sign-In')
      router.replace(`/verify/${username}`)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message
      toast.error("Sign-up failed please try again")
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Feedback
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <Input
                    {...field}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(e);
                  setUsername(e.target.value);
                    }}
                  />
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
                  <Input {...field} name="email" />
                  <p className='text-gray-400 text-sm'>We will send you a verification code</p>
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
                  <Input type="password" {...field} name="password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-full' disabled={loading}>
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
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page
