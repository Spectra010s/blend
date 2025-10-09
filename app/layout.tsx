import type React from "react"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blend • Multitasking made easy",
  description: "Blend is an app that provides  you with tools used for multitasking.",
  icons:{
    icon: "/favicon.ico"
  },
 openGraph: {
  title: "Blend • Multitasking made easy",
  description: "Blend is an app that provides  you with tools used for multitasking.",
  siteName: "Blend"
},
twitter: {
  card: "summary_large_image",
  title: "Blend • Multitasking made easy",
  description: "Blend is an app that provides  you with tools used for multitasking."
},

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
