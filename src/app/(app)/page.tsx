'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';

export default function Home() {
  return (
    <>
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-lg">
            Welcome to Feedbackly
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Share your thoughts, completely anonymous — because honest feedback creates better connections.
          </p>
        </section>

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 2500 })]}
          className="w-full max-w-lg md:max-w-2xl"
        >
          <CarouselContent>
            {messages.map(
              (
                message: {
                  title: ReactNode;
                  content: ReactNode;
                  received: ReactNode;
                },
                index: Key
              ) => (
                <CarouselItem key={index} className="p-4">
                  <Card className="bg-gradient-to-br from-black/60 via-white/10 to-gray-900/80 
                 backdrop-blur-lg border border-white/15 shadow-lg rounded-2xl 
                 transition-transform hover:scale-[1.02] hover:shadow-[0_0_20px_#9333ea]/40">
                    <CardHeader>
                      <CardTitle className="text-purple-300">{message.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                      <Mail className="flex-shrink-0 text-purple-400" />
                      <div>
                        <p className="text-gray-200">{message.content}</p>
                        <p className="text-xs text-gray-500">{message.received}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )
            )}
          </CarouselContent>
        </Carousel>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 md:p-6 bg-gradient-to-r from-gray-950 via-black to-gray-950 text-white text-sm">
        © {new Date().getFullYear()} Feedbackly. All rights reserved.
      </footer>
    </>
  );
}
