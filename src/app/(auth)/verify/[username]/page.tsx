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
import { signIn } from 'next-auth/react'

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
      // Verify the code
      await axios.post(`/api/verify-code`, { username: params.username, code: data.code })
      
      // Auto-login user after successful verification
      const result = await signIn('credentials', {
        identifier: params.username,
        password: '', // Empty password for auto-login
        isAutoLogin: 'true',
        redirect: false
      })

      if (result?.ok) {
        toast.success("Email verified! Logging you in...")
        // Redirect to dashboard after successful login
        router.replace('/dashboard')
      } else {
        toast.error("Auto-login failed. Please sign in manually.")
        router.replace('/sign-in')
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      console.log(axiosError.response?.data.message)
      toast.error("Verification failed! Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#090909] text-[#FAFAFA] flex items-center justify-center px-4 relative">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.15] pointer-events-none" />

      <div className="w-full max-w-lg rounded-2xl border border-[#232323] bg-[#111111] p-8 shadow-2xl relative z-10">
        <h1 className="text-3xl font-semibold tracking-tight text-center text-white mb-2">
          Verify your email
        </h1>
        <p className="text-gray-400 text-center text-sm mb-6">
          Enter the 6-digit code we sent to your inbox to activate your link.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Verification code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000000"
                      {...field}
                      className="bg-[#090909] border border-[#232323] text-white placeholder-gray-500 focus:border-white/40 focus:ring-0 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
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
                  Verifying...
                </>
              ) : (
                'Confirm code'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Page
