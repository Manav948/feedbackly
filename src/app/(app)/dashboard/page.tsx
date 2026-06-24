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
import { Loader2, RefreshCcw, Link as LinkIcon, Inbox, BarChart3, Settings, ShieldAlert } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

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
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      )
    }
  }, [status])

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
      toast.error('Cannot fetch message acceptance settings')
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
      await axios.post<ApiResponse>('/api/accpect-message', {
        accpectMessage: !accpectMessage,
      })
      setValue('accpectMessage', !accpectMessage)
      toast.success(accpectMessage ? 'Message collection paused' : 'Message collection active')
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      console.error(axiosError)
      toast.error('Cannot change message status')
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen w-full bg-[#090909] text-[#FAFAFA] flex items-center justify-center font-mono">
        <Loader2 className="h-6 w-6 animate-spin text-white mr-2" />
        LOADING VIEWPORT...
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  const { username } = session?.user || {}
  const baseUrl = `${window.location.protocol}//${window.location.host}`
  const profileUrl = `${baseUrl}/u/${username}`
  const messageCount = messages.length

  const copyClipBoard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast.success('Link copied successfully')
  }

  return (
    <div className="min-h-screen w-full bg-[#090909] text-[#FAFAFA] px-4 lg:px-8 py-10 pt-28 relative">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.12] pointer-events-none" />

      <div ref={containerRef} className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Dashboard Header */}
        <div className="flex flex-col gap-2.5">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-mono">Feedback HQ</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Overview
          </h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            At-a-glance inbox statistics, quick sharing widgets, and real-time incoming cards.
          </p>
        </div>

        {/* Top Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Feedback */}
          <Card className="border border-[#232323] bg-[#111111] rounded-2xl shadow-sm p-5 flex flex-col justify-between min-h-[130px]">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-mono flex items-center gap-1.5">
              <Inbox className="h-3.5 w-3.5" />
              Total Feedback
            </span>
            <div className="flex items-baseline justify-between mt-auto">
              <span className="text-3xl font-semibold text-white tracking-tight">{messageCount}</span>
              <span className="text-xs font-mono text-gray-500">CARDS</span>
            </div>
          </Card>

          {/* Card 2: Status */}
          <Card className="border border-[#232323] bg-[#111111] rounded-2xl shadow-sm p-5 flex flex-col justify-between min-h-[130px]">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-mono">
              Collection Status
            </span>
            <div className="flex items-center gap-2 mt-auto">
              <span className={cn(
                "h-2 w-2 rounded-full",
                accpectMessage ? "bg-white animate-pulse" : "bg-gray-600"
              )} />
              <span className="text-lg font-medium text-white tracking-tight">
                {accpectMessage ? 'Active' : 'Paused'}
              </span>
            </div>
          </Card>

          {/* Card 3: Link Share */}
          <Card className="border border-[#232323] bg-[#111111] rounded-2xl shadow-sm p-5 flex flex-col justify-between min-h-[130px]">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-mono flex items-center gap-1.5">
              <LinkIcon className="h-3.5 w-3.5" />
              Share Link
            </span>
            <div className="flex gap-2 items-center mt-auto w-full">
              <input
                type="text"
                value={profileUrl}
                disabled
                className="flex-1 min-w-0 rounded-lg border border-[#232323] bg-[#090909] px-2 py-1.5 text-[10px] text-gray-400 select-all cursor-not-allowed font-mono truncate"
              />
              <Button
                onClick={copyClipBoard}
                size="sm"
                className="bg-white text-black hover:bg-white/90 font-medium transition-colors rounded-lg text-[10px] px-2.5 py-1.5 h-auto shrink-0"
              >
                Copy
              </Button>
            </div>
          </Card>

          {/* Card 4: Action Toggle */}
          <Card className="border border-[#232323] bg-[#111111] rounded-2xl shadow-sm p-5 flex flex-col justify-between min-h-[130px]">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-mono flex items-center gap-1.5">
              <Settings className="h-3.5 w-3.5" />
              Quick Toggle
            </span>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-xs text-gray-400 font-mono">Accepting</span>
              <Switch
                {...register('accpectMessage')}
                checked={accpectMessage}
                onCheckedChange={handleSwitching}
                disabled={isSwitchLoading}
              />
            </div>
          </Card>
        </div>

        {/* Dashboard Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Main column - Inbox cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-[#232323] pb-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <Inbox className="h-5 w-5 text-gray-400" />
                  Real-time Feed
                </h2>
                <p className="text-xs text-gray-400">
                  {messageCount > 0 ? `${messageCount} feedback messages received` : 'Waiting for incoming feedback...'}
                </p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-[#111111] border border-[#232323] text-white hover:bg-white/[0.04] rounded-xl"
                      onClick={(e) => {
                        e.preventDefault()
                        fetchMessage(true)
                      }}
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                      ) : (
                        <RefreshCcw className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#111111] border border-[#232323] text-white font-mono text-xs">REFRESH FEED</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <MessageCard
                    key={message._id as string}
                    message={message}
                    onMessageDelete={handleDelete}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-gray-500 bg-[#111111] border border-[#232323] rounded-2xl flex flex-col items-center justify-center gap-2.5">
                  <Inbox className="h-8 w-8 text-gray-600" />
                  <p className="font-medium text-gray-300">No cards in feed yet</p>
                  <p className="text-xs text-gray-500 max-w-sm leading-relaxed px-4">
                    Your anonymous inbox is ready to receive feedback. Share your public link on your social profiles to start collecting insights.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar column - Insights */}
          <div className="space-y-6">
            <Card className="border border-[#232323] bg-[#111111] rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4" />
                  Sentiment Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-2">
                <div>
                  <div className="flex justify-between items-end mb-2 text-xs">
                    <span className="text-gray-400">Main Tag: UI/UX</span>
                    <span className="font-mono text-white">45%</span>
                  </div>
                  <div className="h-1 w-full bg-[#090909] border border-[#232323] rounded-full overflow-hidden">
                    <div className="h-full bg-white w-[45%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-2 text-xs">
                    <span className="text-gray-400">Main Tag: Performance</span>
                    <span className="font-mono text-white">30%</span>
                  </div>
                  <div className="h-1 w-full bg-[#090909] border border-[#232323] rounded-full overflow-hidden">
                    <div className="h-full bg-white/50 w-[30%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-2 text-xs">
                    <span className="text-gray-400">Main Tag: Suggestions</span>
                    <span className="font-mono text-white">25%</span>
                  </div>
                  <div className="h-1 w-full bg-[#090909] border border-[#232323] rounded-full overflow-hidden">
                    <div className="h-full bg-white/20 w-[25%]" />
                  </div>
                </div>

                <div className="border-t border-[#232323] pt-4">
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-3">
                    <span>WEEKLY SENTIMENT TREND</span>
                    <span className="text-white font-medium">96% POSITIVE</span>
                  </div>
                  <div className="h-20 w-full flex items-end gap-1.5 justify-between px-2 pt-2">
                    <div className="w-1/6 bg-[#232323] h-[35%] rounded hover:bg-white/20 transition-colors" title="Monday" />
                    <div className="w-1/6 bg-[#232323] h-[55%] rounded hover:bg-white/20 transition-colors" title="Tuesday" />
                    <div className="w-1/6 bg-[#232323] h-[30%] rounded hover:bg-white/20 transition-colors" title="Wednesday" />
                    <div className="w-1/6 bg-[#232323] h-[65%] rounded hover:bg-white/20 transition-colors" title="Thursday" />
                    <div className="w-1/6 bg-[#232323] h-[80%] rounded hover:bg-white/20 transition-colors" title="Friday" />
                    <div className="w-1/6 bg-white h-[95%] rounded" title="Saturday" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Page
