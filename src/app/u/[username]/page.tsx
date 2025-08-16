'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-hot-toast';
import * as z from 'zod';
import { ApiResponse } from '@/types/apiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/message';
import { motion } from 'framer-motion';
import gsap from 'gsap';

// Example suggestions
const suggestedMessages = [
  "What's your favorite movie?",
  'Do you have any pets?',
  "What's your dream job?",
];

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');
  const [isLoading, setIsLoading] = useState(false);

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      });

      toast.success(response.data.message);
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  // GSAP enter animations
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('.glass-card, .glass-block');
    gsap.fromTo(
      items,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      }
    );
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white">
      <div
        ref={containerRef}
        className="container mx-auto max-w-4xl px-6 py-12 space-y-10"
      >
        <h1 className="glass-block text-4xl md:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-violet-500 drop-shadow-lg">
          Public Profile Link
        </h1>

        {/* Form Card */}
        <Card
          className="glass-card bg-white/5 backdrop-blur-xl border border-cyan-400/20 
                     shadow-lg hover:shadow-cyan-400/40 hover:scale-[1.02] 
                     transition-all duration-300 rounded-3xl"
        >
          <CardContent className="pt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="absolute -top-3 left-3 px-2 text-sm text-cyan-300 bg-gray-900/80 rounded">
                        Message for @{username}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your anonymous message here..."
                          className="resize-none min-h-[130px] rounded-xl bg-black/40 border border-white/15 text-white p-4 
                                     focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:border-cyan-400/60"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center">
                  {isLoading ? (
                    <Button
                      disabled
                      className="bg-gradient-to-r from-cyan-400 to-teal-400 text-black font-semibold 
                                 hover:shadow-[0_0_18px_rgba(34,211,238,0.7)]"
                    >
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isLoading || !messageContent}
                      className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black font-semibold 
                                 hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] hover:scale-[1.03] transition-transform"
                    >
                      Send It
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Suggestions (horizontal pills) */}
        <Card
          className="glass-card bg-white/5 backdrop-blur-xl border border-violet-400/20 
                     shadow-lg hover:shadow-violet-400/40 hover:scale-[1.02] 
                     transition-all duration-300 rounded-3xl"
        >
          <CardHeader>
            <h3 className="text-xl font-semibold text-center text-cyan-200">
              Suggestions
            </h3>
            <p className="text-center text-sm text-gray-400">
              Tap a suggestion to auto-fill the message box
            </p>
          </CardHeader>

          <CardContent>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar justify-center">
              {suggestedMessages.map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="flex-shrink-0 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white 
                             hover:bg-white hover:shadow-[0_0_14px_rgba(139,92,246,0.5)] hover:scale-105 transition"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator className="glass-block bg-white/10" />

        {/* CTA */}
        <div className="glass-block text-center">
          <div className="mb-4 text-gray-300">Get Your Own Message Board</div>
          <Link href="/sign-up">
            <Button
              className="bg-gradient-to-r from-teal-400 to-violet-500 text-black font-semibold 
                         hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:scale-[1.03] transition"
            >
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}