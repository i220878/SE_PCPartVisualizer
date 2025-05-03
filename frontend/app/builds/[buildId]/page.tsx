'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Share2, Eye, ThumbsUp, ChevronLeft, Share, Download } from "lucide-react"
import Link from "next/link"
import { useParams } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

interface Component {
  id: string
  name: string
  brand: string
  category: string
  price: number
  specs?: any
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

export default function BuildPage() {
  const params = useParams()
  const buildId = params.buildId as string
  
  const [build, setBuild] = useState<Build | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBuild() {
      try {
        const response = await fetch(`/api/builds/${buildId}`)
        if (!response.ok) {
          if (response.status === 404) {
            setError('Build not found. It may have been deleted or the link is invalid.')
          } else {
            throw new Error('Failed to fetch build')
          }
        } else {
          const data = await response.json()
          setBuild(data)
        }
      } catch (error) {
        setError('Error loading build. Please try again later.')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (buildId) {
      fetchBuild()
    }
  }, [buildId])

  const handleShareBuild = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Shareable link copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link to clipboard",
        variant: "destructive",
      })
    }
  }

  const handleLikeBuild = async () => {
    try {
      const response = await fetch(`/api/builds/${buildId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          likes: (build?.likes || 0) + 1
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to like build')
      }
      
      const updatedBuild = await response.json()
      setBuild(updatedBuild)
      
      toast({
        title: "Build Liked",
        description: "Thanks for your feedback!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to like this build",
        variant: "destructive",
      })
    }
  }

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
        <div className="animate-pulse">
          <div className="h-10 bg-muted rounded w-1/4 mb-6"></div>
          <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-24 bg-muted rounded mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="h-6 bg-muted rounded mb-4 w-1/2"></div>
                <div className="h-4 bg-muted rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-muted rounded mb-2 w-full"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !build) {
    return (
      <div className="container mx-auto py-8">
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/builds">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Builds
          </Link>
        </Button>
        
        <div className="p-8 text-center border rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="mb-6 text-muted-foreground">{error || 'Failed to load build'}</p>
          <Button asChild>
            <Link href="/builds">Browse Other Builds</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/builds">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Builds
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{build.name}</CardTitle>
                  <CardDescription className="text-sm mt-2">
                    Created on {formatDate(build.createdAt)} • {build.views} views
                  </CardDescription>
                </div>
                {build.user && (
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-2">
                      <AvatarImage src={build.user.image || ''} alt={build.user.name || ''} />
                      <AvatarFallback>{build.user.name?.charAt(0) || '?'}</AvatarFallback>
                    </Avatar>
                    <span>{build.user.name || 'Anonymous'}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-6">{build.description || 'No description provided.'}</p>
              
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div className="text-xl font-bold">
                  Total: ${calculateTotalPrice(build.components).toFixed(2)}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleShareBuild}>
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLikeBuild}>
                    <ThumbsUp className="mr-2 h-4 w-4" /> Like ({build.likes})
                  </Button>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-4">Components</h3>
              <div className="space-y-4">
                {build.components.map((component) => (
                  <div key={component.id} className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{component.name}</h4>
                        <p className="text-sm text-muted-foreground">{component.brand}</p>
                      </div>
                      <Badge>{component.category}</Badge>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="text-sm">
                        {component.specs && Object.entries(component.specs).slice(0, 3).map(([key, value]) => (
                          <div key={key} className="text-muted-foreground">
                            {key}: {String(value)}
                          </div>
                        ))}
                      </div>
                      <div className="font-medium">
                        ${component.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Build Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Components</span>
                <span className="font-medium">{build.components.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Price</span>
                <span className="font-medium">${calculateTotalPrice(build.components).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Views</span>
                <span className="font-medium">{build.views}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Likes</span>
                <span className="font-medium">{build.likes}</span>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Component Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(build.components.map(comp => comp.category))).map(category => (
                    <Badge key={category} variant="outline">{category}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full" variant="outline" onClick={handleShareBuild}>
                <Share className="mr-2 h-4 w-4" /> Share This Build
              </Button>
              <Button className="w-full" variant="outline" onClick={handleLikeBuild}>
                <ThumbsUp className="mr-2 h-4 w-4" /> Like This Build
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}