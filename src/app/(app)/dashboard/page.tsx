'use client'

import { Message } from '@/model/User'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
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

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  const { data: session, status } = useSession()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(accpectMessageSchema)
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
      const response = await axios.get<ApiResponse>('/api/get-mesages')
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
        accpectMessage: !accpectMessage
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
    return <div>Loading...</div>
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
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyClipBoard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register('accpectMessage')}
          checked={accpectMessage}
          onCheckedChange={handleSwitching}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages: {accpectMessage ? 'On' : 'Off'}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault()
          fetchMessage(true)
        }}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message._id as string}
              message={message}
              onMessageDelete={handleDelete}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  )
}

export default Page
