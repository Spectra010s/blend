'use client'
import React from "react";
import Script from "next/script";
import { useMobile } from "@/hooks/use-mobile"

export default function DigitalClock() {
  const isMobile = useMobile()
  return
  <div className="">
            <Script src="https://cdn.logwork.com/widget/text.js" />
            <a 
                href="https://logwork.com/current-time-in-lagos-nigeria" 
                className="clock-widget-text" 
                data-timezone="Africa/Lagos" 
                data-size={isMobile ? "150" : "278"}
                data-language="en"
            >
            Current time in Nigeria
            </a>
      </div>