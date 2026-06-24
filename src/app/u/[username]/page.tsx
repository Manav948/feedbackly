'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, MessageSquare, Lightbulb } from 'lucide-react';
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
import gsap from 'gsap';

const suggestedMessages = [
  "What is your favorite dev tool or library right now?",
  "What's one feature you think is missing from this app?",
  "Do you have any advice or feedback on my recent projects?",
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

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current.children,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#090909] text-[#FAFAFA] flex items-center justify-center relative py-12 px-4">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.15] pointer-events-none" />

      <div
        ref={containerRef}
        className="max-w-xl w-full mx-auto space-y-6 relative z-10"
      >
        <div className="text-center space-y-2.5">
          <div className="inline-flex h-10 w-10 rounded-xl bg-[#111111] border border-[#232323] items-center justify-center text-white mb-2">
            <MessageSquare className="h-5 w-5" />
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-mono">
            Send Anonymous Feedback
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Drop a note for @{username}
          </h1>

          <p className="text-sm text-gray-400 max-w-sm mx-auto">
            Your message is entirely anonymous. Be kind, honest, and constructive.
          </p>
        </div>

        <Card className="bg-[#111111] border border-[#232323] rounded-2xl shadow-lg">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-300 font-medium">
                        Your message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your anonymous feedback here..."
                          className="min-h-[130px] rounded-xl bg-[#090909] border border-[#232323] text-white focus:border-white/40 focus:ring-0 resize-none leading-relaxed"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading || !messageContent}
                  className="w-full bg-white text-black hover:bg-white/90 font-semibold transition-colors mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin text-black" />
                      Sending...
                    </>
                  ) : (
                    'Send feedback'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border border-[#232323] rounded-2xl shadow-sm">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <Lightbulb className="h-4 w-4 text-gray-400" />
            <h3 className="text-sm font-medium text-white">Quick suggestions</h3>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-2">
              {suggestedMessages.map((message, index) => (
                <button
                  key={index}
                  className="w-full text-left text-xs bg-[#090909] border border-[#232323] hover:border-white/20 p-3 rounded-xl text-gray-400 hover:text-white transition-all duration-200"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator className="bg-[#232323]" />
        
        <div className="text-center space-y-3 pt-2">
          <p className="text-gray-400 text-sm">Want your own anonymous feedback inbox?</p>
          <Link href="/sign-up" className="inline-block">
            <Button className="bg-[#111111] hover:bg-white/[0.04] text-white border border-[#232323] font-medium transition-colors">
              Create your account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}