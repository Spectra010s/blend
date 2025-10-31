import { CircularProgressProps } from '@/types'

export default function CircularProgress({ progress, text }: CircularProgressProps) {
  const radius = 100
  const strokeWidth = 5
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  const trackStrokeColor = 'text-gray-200 dark:text-gray-700'
  const progressStrokeColor = 'text-black dark:text-white'

  return (
    <div className="relative w-64 h-64">
      <svg className="w-full h-full transform -rotate-90" width="256" height="256">
        <circle
          cx="128"
          cy="128"
          r={radius}
          className={trackStrokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          stroke="currentColor"
        />

        <circle
          cx="128"
          cy="128"
          r={radius}
          className={`transition-all duration-300 ease-in-out ${progressStrokeColor}`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          stroke="currentColor"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-3xl font-semibold text-black dark:text-white">
        {text}
      </div>
    </div>
  )
}
