import type React from 'react';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import ThemeProvider from '@/context/theme-provider';
import ThemeMeta from '@/components/ThemeMeta';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const APP_DEFAULT_TITLE = 'Blend • Multitasking made easy';

export const metadata: Metadata = {
  title: APP_DEFAULT_TITLE,
  description: 'Blend is an app that provides you with tools used for multitasking.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: APP_DEFAULT_TITLE,
    description: 'Blend is an app that provides you with tools used for multitasking.',
    siteName: 'Blend',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_DEFAULT_TITLE,
    description: 'Blend is an app that provides you with tools used for multitasking.',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dur="ltr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <ThemeMeta />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
