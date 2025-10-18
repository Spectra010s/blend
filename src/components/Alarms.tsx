import { Badge } from '@/components/ui/badge'
import { ClockIcon } from 'lucide-react'

export default function Alarms() {
  const home = () => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <main className="h-screen w-full overflow-hidden flex border-x border-x-bg-black dark:border-x-bg-white flex-col">
      <div className="h-16 flex items-center px-4 bg-background text-foreground flex-shrink-0">
        <h1 className="text-2xl font-bold">Alarms</h1>
      </div>

      <div className="flex flex-1 justify-center items-center">
        <Badge
          variant="secondary"
          className="flex items-center gap-2 px-3 py-1 cursor-pointer"
          onClick={home}
        >
          <ClockIcon />
          Coming Soon
        </Badge>
      </div>
    </main>
  )
}
