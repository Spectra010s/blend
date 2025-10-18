import { Badge } from '@/components/ui/badge'
import { ClockIcon } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login | Blend',
  description: 'Login into your Account to save your work across all devices',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Blend • Multitasking made easy',
    description: 'Blend is an app that provides you with tools used for multitasking.',
    siteName: 'Blend',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blend • Multitasking made easy',
    description: 'Blend is an app that provides  you with tools used for multitasking.',
  },
}

export default function Login() {
  return (
    <main className="min-h-screen w-full overflow-hidden flex flex-col">
      <div className="absolute top-4 left-4 text-2xl font-bold">
        <h1>Login — Blend</h1>
        <p className="text-sm">save your notes across all devices</p>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <Link href="/">
          <Badge variant="secondary" className="flex items-center gap-2 px-3 py-1 cursor-pointer">
            <ClockIcon />
            Coming Soon
          </Badge>
        </Link>
      </div>
    </main>
  )
}
