import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 text-center px-4">
      <h2 className="text-3xl font-bold">404 - Page Not Found</h2>
      <p className="text-muted-foreground max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4 mt-4">
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/community">View Community Builds</Link>
        </Button>
      </div>
    </div>
  )
}