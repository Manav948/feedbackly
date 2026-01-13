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
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-slate-950 to-[#05060a] text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-8 top-12 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-[120px]" />
      </div>

      <div
        ref={containerRef}
        className="container mx-auto max-w-4xl px-6 py-12 space-y-10"
      >
        <div className="text-center space-y-3 glass-block">
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-200/80">Send feedback</p>
          <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-cyan-300 to-fuchsia-300 drop-shadow-lg">
            Drop a note for @{username}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Your message is anonymous. Be kind, be specific, and help them grow.
          </p>
        </div>

        <Card className="glass-card bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg rounded-3xl">
          <CardContent className="pt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="absolute -top-3 left-3 px-2 text-sm text-emerald-200 bg-gray-900/80 rounded">
                        Message for @{username}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your feedback or encouragement..."
                          className="resize-none min-h-[150px] rounded-xl bg-black/40 border border-white/15 text-white p-4 
                                     focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:border-emerald-400/60"
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
                      className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-black font-semibold 
                                 hover:shadow-[0_0_18px_rgba(16,185,129,0.35)]"
                    >
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isLoading || !messageContent}
                      className="bg-gradient-to-r from-emerald-400 to-fuchsia-500 text-black font-semibold 
                                 hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:scale-[1.02] transition-transform"
                    >
                      Send it
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="glass-card bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg rounded-3xl">
          <CardHeader>
            <h3 className="text-xl font-semibold text-center text-emerald-200">
              Quick suggestions
            </h3>
            <p className="text-center text-sm text-gray-400">
              Tap a suggestion to auto-fill the message box.
            </p>
          </CardHeader>

          <CardContent>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar justify-center">
              {suggestedMessages.map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="flex-shrink-0 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white 
                             hover:bg-white hover:text-black hover:shadow-[0_0_14px_rgba(16,185,129,0.35)] hover:scale-105 transition"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator className="glass-block bg-white/10" />

        <div className="glass-block text-center">
          <div className="mb-4 text-gray-300">Want your own anonymous inbox?</div>
          <Link href="/sign-up">
            <Button
              className="bg-gradient-to-r from-emerald-400 to-fuchsia-500 text-black font-semibold 
                         hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:scale-[1.02] transition"
            >
              Create your account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}