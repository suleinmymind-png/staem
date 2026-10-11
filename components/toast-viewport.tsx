'use client'

import { CheckCircle2, Info, XCircle } from 'lucide-react'
import { useStore } from '@/components/store-provider'
import { cn } from '@/lib/utils'

export function ToastViewport() {
  const { toast } = useStore()

  return (
    <div aria-live="polite" role="status" className="pointer-events-none fixed bottom-4 right-4 z-50">
      {toast && (
        <div
          key={toast.id}
          className={cn(
            'flex max-w-sm items-start gap-3 rounded-sm border-l-4 bg-popover px-4 py-3 text-sm text-white shadow-2xl animate-in slide-in-from-bottom-4 fade-in',
            toast.tone === 'success' && 'border-buy',
            toast.tone === 'error' && 'border-destructive',
            toast.tone === 'info' && 'border-primary',
          )}
        >
          {toast.tone === 'success' && <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-buy" aria-hidden />}
          {toast.tone === 'error' && <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />}
          {toast.tone === 'info' && <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />}
          <p>{toast.message}</p>
        </div>
      )}
    </div>
  )
}
