import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function GuidesNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 text-center px-4">
      <h2 className="text-3xl font-bold">Guide Not Found</h2>
      <p className="text-muted-foreground max-w-md">
        The build guide you are looking for doesn't exist or has been removed.
      </p>
      <div className="flex gap-4 mt-4">
        <Button asChild>
          <Link href="/guides">All Guides</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}