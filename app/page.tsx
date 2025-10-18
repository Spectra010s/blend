import Desktop from '@/components/Desktop'
import Mobile from '@/components/Mobile'
import ThemeToggler from '@/components/ThemeToggler'

export default function Home() {
  return (
    <>
      <ThemeToggler />
      <div className="block md:hidden">
        <Mobile />
      </div>
      <div className="md:block hidden">
        <Desktop />
      </div>
    </>
  )
}
