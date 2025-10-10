'use client'
import React from "react";
import Script from "next/script";
import { useMobile } from "@/hooks/use-mobile"

export default function AnalogClock() {
  const isMobile = useMobile()
  return (
    <>
      <div className="">
        <Script 
            src="https://cdn.logwork.com/widget/clock.js" 
            strategy="lazyOnload"
        />
        <a 
            href="https://logwork.com/current-time-in-lagos-nigeria" 
            className="clock-time" 
            data-style="default-numeral" 
            data-size={isMobile ? "150" : "278"} 
            data-timezone="Africa/Lagos"
        >
            Current time in Nigeria
        </a>
      </div>
    </>
  );
}