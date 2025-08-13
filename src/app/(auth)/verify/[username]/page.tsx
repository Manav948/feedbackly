'use client'
import { ApiResponse } from '@/types/apiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { verifySchema } from '@/schemas/verify'
import * as z from 'zod'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

const Page = () => {
  const router = useRouter()
  const params = useParams<{ username: string }>()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema)
  })

  const onsubmit = async (data: z.infer<typeof verifySchema>) => {
    setLoading(true)
    try {
      await axios.post(`/api/verify-code`, { username: params.username, code: data.code })
      toast.success("OTP verified successfully! Please sign in.")
      router.replace('/sign-in')
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      console.log(axiosError.response?.data.message)
      toast.error("OTP verification failed! Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-800 bg-white/10 backdrop-blur-xl">
        <h1 className="text-3xl font-extrabold text-center text-white mb-2">
          Verify Your OTP
        </h1>
        <p className="text-gray-400 text-center mb-6">Enter the code we sent to your email</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">OTP Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your OTP"
                      {...field}
                      className="bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                    />
                  </FormControl>
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
                  Verifying...
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Page
