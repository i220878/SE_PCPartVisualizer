import type { Component } from "@/lib/types"

export async function copyShareableLink(build: {
  id?: string
  name: string
  date: string
  components: Component[]
}): Promise<boolean> {
  try {
    // Get the build ID or use 'current' as default
    const buildId = build.id || 'current'
    
    // If buildId is 'current', we'll need to include the build data in the request
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: buildId === 'current' ? JSON.stringify({
        name: build.name || 'Untitled Build',
        components: build.components,
        description: 'A PC build created with PC Part Visualizer'
      }) : undefined
    }
    
    // Call the API to share the build
    const response = await fetch(`/api/builds/${buildId}/share`, requestOptions)
    
    if (!response.ok) {
      throw new Error('Failed to share build')
    }
    
    const data = await response.json()
    
    // Generate shareable URL from the response
    const baseUrl = window.location.origin
    const shareUrl = `${baseUrl}${data.shareableUrl}`
    
    // Copy to clipboard
    await navigator.clipboard.writeText(shareUrl)
    return true
  } catch (error) {
    console.error("Failed to generate shareable link:", error)
    return false
  }
}

export function parseSharedBuild(compressedData: string): {
  name: string
  date: string
  components: Component[]
} | null {
  try {
    // Decompress the data
    const buildData = JSON.parse(atob(compressedData))
    
    // Reconstruct the build object
    return {
      name: buildData.n,
      date: buildData.d,
      components: buildData.c.map((c: any) => ({
        id: c.i,
        name: c.n,
        brand: c.b,
        price: c.p,
        category: c.t
      }))
    }
  } catch (error) {
    console.error("Failed to parse shared build:", error)
    return null
  }
}