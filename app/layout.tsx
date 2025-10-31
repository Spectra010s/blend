import type React from 'react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import ThemeProvider from '@/context/theme-provider'
import ThemeMeta from '@/components/ThemeMeta'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Blend • Multitasking made easy',
  description: 'Blend is an app that provides you with tools used for multitasking.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Blend • Multitasking made easy',
    description: 'Blend is an app that provides you with tools used for multitasking.',
    siteName: 'Blend',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blend • Multitasking made easy',
    description: 'Blend is an app that provides you with tools used for multitasking.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <ThemeMeta />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
