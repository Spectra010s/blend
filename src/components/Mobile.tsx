'use client'

import { navItems } from '@/data/navigation'
import { Footer } from '@/components/Footer'
import { useState, useEffect, useRef } from 'react'

export default function Mobile() {
  const [active, setActive] = useState('dashboard')
  const scrollContainerRef = useRef(null)

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const options = {
      root: container,
      rootMargin: '0px',
      threshold: 0.75,
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id)
        }
      })
    }, options)

    navItems.forEach(item => {
      const section = document.getElementById(item.id)
      if (section) {
        observer.observe(section)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <main className="h-screen w-screen overflow-hidden">
      <div
        ref={scrollContainerRef}
        className="
          flex
          overflow-x-auto
          snap-x snap-mandatory
          h-full w-full
          scroll-smooth
          scrollbar-hidden
          md:hidden
        "
      >
        {navItems.map(item => {
          const CurrentPage = item.component
          return (
            <section
              key={item.id}
              id={item.id}
              className="
                snap-start
                flex-shrink-0
                w-screen h-screen
                flex items-center justify-center
                overflow-y-auto
                relative
              "
            >
              <CurrentPage active={active === item.id} />
            </section>
          )
        })}
      </div>
      <Footer active={active} onNavClick={scrollToSection} />
    </main>
  )
}
