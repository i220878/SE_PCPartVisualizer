import type { Component } from "@/lib/types"

export async function copyShareableLink(build: {
  name: string
  date: string
  components: Component[]
}): Promise<boolean> {
  try {
    // Convert build data to a compressed string
    const buildData = {
      n: build.name,
      d: build.date,
      c: build.components.map(c => ({
        i: c.id,
        n: c.name,
        b: c.brand,
        p: c.price,
        t: c.category
      }))
    }

    // Compress the data
    const compressedData = btoa(JSON.stringify(buildData))
    
    // Generate the shareable URL
    const baseUrl = window.location.origin
    const shareUrl = `${baseUrl}/share?build=${compressedData}`

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