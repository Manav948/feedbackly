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

  const copyClipBoard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast.success('Copied Successfully')
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white px-4 lg:px-8 py-10">
      <div ref={containerRef} className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 drop-shadow-lg tracking-tight">
          User Dashboard
        </h1>

        {/* Copy Link Section */}
        <Card className="bg-gradient-to-bl from-gray-900 via-gray-950 to-black backdrop-blur-xl border border-purple-500/30 shadow-2xl hover:shadow-purple-500/40 transition rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-gray-100">Your Unique Profile Link</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-2">
            <input
              type="text"
              value={profileUrl}
              disabled
              className="w-full rounded-lg border border-white/20 bg-black/40 backdrop-blur px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <Button
              onClick={copyClipBoard}
              variant="secondary"
              className="hover:shadow-[0_0_15px_#a855f7] transition bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
            >
              Copy
            </Button>
          </CardContent>
        </Card>

        {/* Accept Messages Switch */}
        <Card className="bg-gradient-to-bl from-gray-900 via-gray-950 to-black backdrop-blur-xl border border-cyan-400/30 shadow-xl hover:shadow-cyan-400/30 transition rounded-2xl">
          <CardContent className="flex items-center justify-between py-6">
            <div>
              <Label className="text-lg font-semibold text-gray-100">Accept Messages</Label>
              <p className="text-sm text-gray-400">
                Toggle to allow or block incoming anonymous messages
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

        <Separator className="bg-white/10" />

        {/* Refresh Button */}
        <div className="flex justify-end my-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className=" bg-black hover:shadow-[0_0_20px_#22d3ee] transition rounded-full"
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
              <TooltipContent>Refresh Messages</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Messages Section */}
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
            <div className="col-span-full text-center py-12 text-gray-400 bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-md border border-white/10 rounded-xl">
              No messages to display yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
