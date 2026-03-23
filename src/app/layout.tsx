import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import AuthProvider from '../context/AuthProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Feedbackly — Collect Anonymous Feedback',
  description: 'Premium anonymous feedback platform. Share your link, collect honest insights, stay in control.',
  keywords: ['feedback', 'anonymous', 'survey', 'SaaS'],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${poppins.variable} `}> 
      <AuthProvider>
        <body suppressHydrationWarning className="bg-black text-[#E5E7EB] antialiased">
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'rgba(17, 24, 39, 0.95)',
                color: '#E5E7EB',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                backdropFilter: 'blur(20px)',
                borderRadius: '12px',
                fontSize: '14px',
              },
              success: {
                iconTheme: { primary: '#7C3AED', secondary: '#fff' },
              },
              error: {
                iconTheme: { primary: '#EF4444', secondary: '#fff' },
              },
            }}
          />
        </body>
      </AuthProvider>
    </html>
  );
}