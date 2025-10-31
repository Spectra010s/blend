export interface Alarm {
  id: string
  time: string
  label?: string
  isRinging: boolean
}

export interface AlarmCardProps {
  alarm: Alarm
  onClick: () => void
  onDelete: (id: string) => void
}

export interface AlarmEditorProps {
  onSave: (time: string) => void
  onClose: () => void
  alarmTime?: string
}
