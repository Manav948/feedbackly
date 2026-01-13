'use client'

import { Message } from '@/model/User'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { accpectMessageSchema } from '@/schemas/accpectMessage'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/apiResponse'
import { toast } from 'react-hot-toast'
import { MessageCard } from '@/components/MessageCard'
import { Button } from '@/components/ui/button'
import { Loader2, RefreshCcw } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import gsap from 'gsap'

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  const { data: session, status } = useSession()
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  // GSAP entrance animations
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }
      )
    }
  }, [])

  const form = useForm({
    resolver: zodResolver(accpectMessageSchema),
  })
  const { register, watch, setValue } = form
  const accpectMessage = watch('accpectMessage')

  const handleDelete = (messageId: string) => {
    setMessages((prev) => prev.filter((message) => message._id !== messageId))
  }

  const fetchAccpectMessage = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse>('/api/accpect-message')
      setValue('accpectMessage', response.data.isActive || false)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      console.error(axiosError)
      toast.error('Cannot fetch messages')
    } finally {
      setIsSwitchLoading(false)
    }
  }, [setValue])

  const fetchMessage = useCallback(async (refresh: boolean = false) => {
    setLoading(true)
    setIsSwitchLoading(false)
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages')
      setMessages(response.data.messages || [])
      if (refresh) {
        toast.success('Messages refreshed')
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      console.error(axiosError)
      toast.error('Cannot fetch messages')
    } finally {
      setLoading(false)
      setIsSwitchLoading(false)
    }
  }, [])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchMessage()
      fetchAccpectMessage()
    }
    if (status === 'unauthenticated') {
      router.replace('/sign-in')
    }
  }, [status, fetchAccpectMessage, fetchMessage, router])

  const handleSwitching = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accpect-message', {
        accpectMessage: !accpectMessage,
      })
      setValue('accpectMessage', !accpectMessage)
      toast.success(response.data.message)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      console.error(axiosError)
      toast.error('Cannot change message status')
    }
  }

  if (status === 'loading') {
    return <div className="text-center py-10 text-white">Loading...</div>
  }

  if (status === 'unauthenticated') {
    return null // Redirect is handled in useEffect
  }

  const { username } = session?.user || {}
  const baseUrl = `${window.location.protocol}//${window.location.host}`
  const profileUrl = `${baseUrl}/u/${username}`
  const messageCount = messages.length

  const copyClipBoard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast.success('Copied Successfully')
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-slate-950 to-[#05060a] text-white px-4 lg:px-8 py-10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-6 top-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute right-10 bottom-12 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-[140px]" />
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-200/80">Dashboard</p>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Hey {username}, your feedback HQ is ready.
          </h1>
          <p className="text-gray-300 max-w-3xl">
            Share your link, manage incoming notes, and stay fully in control of what reaches you.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg text-gray-100">Your public link</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <input
                type="text"
                value={profileUrl}
                disabled
                className="w-full rounded-lg border border-white/15 bg-black/40 backdrop-blur px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <Button
                onClick={copyClipBoard}
                variant="secondary"
                className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-black font-semibold hover:shadow-[0_0_16px_rgba(16,185,129,0.35)]"
              >
                Copy link
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl">
            <CardContent className="flex items-center justify-between py-6">
              <div>
                <Label className="text-lg font-semibold text-gray-100">Accept messages</Label>
                <p className="text-sm text-gray-400">
                  Toggle to allow or block incoming anonymous messages.
                </p>
              </div>
              <Switch
                {...register('accpectMessage')}
                checked={accpectMessage}
                onCheckedChange={handleSwitching}
                disabled={isSwitchLoading}
              />
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl">
            <CardContent className="grid grid-cols-2 gap-3 py-6">
              <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-400">Messages</p>
                <p className="text-2xl font-bold text-white">{messageCount}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-400">Status</p>
                <p className="text-lg font-semibold text-emerald-300">
                  {accpectMessage ? 'Accepting' : 'Paused'}
                </p>
              </div>
              <Button
                className="col-span-2 bg-gradient-to-r from-emerald-400 to-cyan-500 text-black font-semibold hover:shadow-[0_0_16px_rgba(16,185,129,0.35)]"
                onClick={(e) => {
                  e.preventDefault()
                  fetchMessage(true)
                }}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Refresh inbox
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Separator className="bg-white/10" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Recent messages</h2>
              <p className="text-sm text-gray-400">
                {messageCount > 0
                  ? 'Delete what you do not need and keep the rest.'
                  : 'Share your link to start receiving messages.'}
              </p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-black border-white/15 text-white hover:shadow-[0_0_14px_rgba(16,185,129,0.35)] rounded-full"
                    onClick={(e) => {
                      e.preventDefault()
                      fetchMessage(true)
                    }}
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <RefreshCcw className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Refresh messages</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {messages.length > 0 ? (
              messages.map((message) => (
                <MessageCard
                  key={message._id as string}
                  message={message}
                  onMessageDelete={handleDelete}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-400 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
                No messages yet — share your link to invite feedback.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
