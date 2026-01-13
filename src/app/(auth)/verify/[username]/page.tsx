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
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-[#0b0d11] text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-10 top-16 h-60 w-60 rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute left-8 bottom-10 h-60 w-60 rounded-full bg-fuchsia-500/15 blur-[120px]" />
      </div>

      <div className="flex items-center justify-center px-4 py-14">
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-extrabold text-center text-white mb-2">
            Verify your email
          </h1>
          <p className="text-gray-400 text-center mb-6">
            Enter the 6-digit code we sent to your inbox to activate your link.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Verification code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="000000"
                        {...field}
                        className="bg-black/40 border border-white/15 text-white placeholder-gray-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40"
                      />
                    </FormControl>
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
    </div>
  )
}

export default Page
