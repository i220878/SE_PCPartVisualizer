'use client'

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 text-center px-4">
      <h2 className="text-3xl font-bold">Something went wrong!</h2>
      <p className="text-muted-foreground max-w-md">
        There was an error loading community builds. Please try again.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  )
}