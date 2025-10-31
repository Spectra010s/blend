'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ConfirmToastOptions } from '@/types'

export function ConfirmToast({
  message,
  confirmText,
  cancelText = 'cancel',
  onConfirm,
}: ConfirmToastOptions) {
  const blend = 'toastid'
  toast(
    () => (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-foreground">{message}</p>
        <div className="flex gap-2 text-red-500 mt-1">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              onConfirm()
              toast.dismiss(blend)
              toast.success('Deleted Successfully')
            }}
          >
            {confirmText}
          </Button>

          <Button variant="outline" size="sm" onClick={() => toast.dismiss(blend)}>
            {cancelText}
          </Button>
        </div>
      </div>
    ),
    {
      duration: Infinity,
      id: blend,
    }
  )
}
