'use client'

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
          <h2 className="text-3xl font-bold">Something went wrong!</h2>
          <p className="max-w-md">
            We encountered an error while loading the application. 
          </p>
          <Button onClick={reset}>Try Again</Button>
        </div>
      </body>
    </html>
  )
}