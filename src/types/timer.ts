export interface TimerKey {
  timeLeft: number | null
  initialTime: number | null
}

export interface CircularProgressProps {
  progress: number
  text: string
}

export interface NumberPickerProps {
  numbers: number[]
  value: number
  setValue: (n: number) => void
  label: string
  disabled?: boolean
}
