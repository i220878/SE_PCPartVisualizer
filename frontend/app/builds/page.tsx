'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Share2, Eye, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Component {
  id: string
  name: string
  brand: string
  category: string
  price: number
}

interface User {
  id: string
  name?: string | null
  image?: string | null
}

interface Build {
  id: string
  name: string
  description?: string | null
  components: Component[]
  isShared: boolean
  createdAt: string
  updatedAt: string
  views: number
  likes: number
  userId?: string | null
  user?: User | null
}

export default function SharedBuildsPage() {
  const [builds, setBuilds] = useState<Build[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSharedBuilds() {
      try {
        const response = await fetch('/api/builds/shared')
        if (!response.ok) {
          throw new Error('Failed to fetch shared builds')
        }
        const data = await response.json()
        setBuilds(data)
      } catch (error) {
        setError('Error loading shared builds. Please try again later.')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchSharedBuilds()
  }, [])

  // Calculate total price of a build
  const calculateTotalPrice = (components: Component[]) => {
    return components.reduce((total, component) => total + component.price, 0)
  }

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Shared Builds</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="bg-muted h-24"></CardHeader>
              <CardContent className="pt-4">
                <div className="h-6 bg-muted rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-muted rounded mb-4 w-1/2"></div>
                <div className="h-4 bg-muted rounded mb-2 w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Shared Builds</h1>
        <div className="p-4 bg-destructive/10 text-destructive rounded-md max-w-lg mx-auto">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Shared Builds</h1>
      
      {builds.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No shared builds found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {builds.map((build) => (
            <Card key={build.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{build.name}</CardTitle>
                    <CardDescription>
                      {formatDate(build.createdAt)}
                    </CardDescription>
                  </div>
                  {build.user && (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={build.user.image || ''} alt={build.user.name || ''} />
                      <AvatarFallback>{build.user.name?.charAt(0) || '?'}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-muted-foreground line-clamp-2">{build.description || 'No description provided.'}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {build.components.slice(0, 3).map((component) => (
                    <Badge key={component.id} variant="outline" className="text-xs">
                      {component.category}: {component.name}
                    </Badge>
                  ))}
                  {build.components.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{build.components.length - 3} more
                    </Badge>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-semibold">${calculateTotalPrice(build.components).toFixed(2)}</p>
                  <div className="flex gap-3 text-muted-foreground text-sm">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" /> {build.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" /> {build.likes}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/builds/${build.id}`}>View Build</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}