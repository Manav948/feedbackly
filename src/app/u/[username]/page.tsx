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
import gsap from 'gsap';

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

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.7 }
    );
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-slate-950 to-[#05060a] text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-4 top-10 h-60 w-60 rounded-full bg-emerald-500/20 blur-[100px]" />
        <div className="absolute right-4 bottom-10 h-60 w-60 rounded-full bg-fuchsia-500/15 blur-[100px]" />
      </div>

      <div
        ref={containerRef}
        className="max-w-xl mx-auto px-4 sm:px-6 py-10 space-y-6"
      >
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-200/80">
            Send feedback
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-cyan-300 to-fuchsia-300">
            Drop a note for @{username}
          </h1>

          <p className="text-sm text-gray-400">
            Your message is anonymous. Be kind and helpful.
          </p>
        </div>

        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-emerald-200">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your anonymous feedback..."
                          className="min-h-[120px] rounded-xl bg-black/40 border border-white/15 text-white"
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
                  className="w-full bg-gradient-to-r from-emerald-400 to-fuchsia-500 text-black font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send message'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
          <CardHeader>
            <h3 className="text-lg text-center">Quick suggestions</h3>
          </CardHeader>

          <CardContent>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {suggestedMessages.map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="whitespace-nowrap"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator className="bg-white/10" />
        <div className="text-center space-y-3">
          <p className="text-gray-400">Want your own anonymous inbox?</p>
          <Link href="/sign-up">
            <Button className="bg-gradient-to-r from-emerald-400 to-fuchsia-500 text-black font-semibold">
              Create your account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}