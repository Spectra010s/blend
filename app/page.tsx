import Desktop from '@/components/Desktop'
import Mobile from '@/components/Mobile'
import ThemeToggler from '@/components/ThemeToggler'
import { Toaster } from '@/components/ui/sonner'

export default function Home() {
  return (
    <>
      <ThemeToggler />
      <Toaster position="top-center" />
      <div className="block md:hidden">
        <Mobile />
      </div>
      <div className="md:block hidden">
        <Desktop />
      </div>
    </>
  )
}
