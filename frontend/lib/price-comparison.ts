import type { RetailerPrice } from "./types"

// Mock function to simulate fetching price comparisons from different retailers
export function getPriceComparisons(componentId: string): RetailerPrice[] {
  // In a real app, this would fetch from an API
  // For now, we'll generate some random prices

  const basePrice = getBasePrice(componentId)

  if (!basePrice) return []

  // Generate random prices for different retailers
  return [
    {
      retailer: "Amazon",
      price: Math.round(basePrice * (0.95 + Math.random() * 0.15) * 100) / 100,
      url: "#",
    },
    {
      retailer: "Newegg",
      price: Math.round(basePrice * (0.93 + Math.random() * 0.12) * 100) / 100,
      url: "#",
    },
    {
      retailer: "Best Buy",
      price: Math.round(basePrice * (0.97 + Math.random() * 0.18) * 100) / 100,
      url: "#",
    },
    {
      retailer: "Micro Center",
      price: Math.round(basePrice * (0.92 + Math.random() * 0.1) * 100) / 100,
      url: "#",
    },
  ]
}

// Helper function to get base price for a component
function getBasePrice(componentId: string): number | null {
  // This would normally look up the price from the database
  // For now, we'll use a simple mapping
  const priceMap: Record<string, number> = {
    "cpu-1": 299.99,
    "cpu-2": 379.99,
    "cpu-3": 199.99,
    "cpu-4": 279.99,
    "mb-1": 169.99,
    "mb-2": 249.99,
    "mb-3": 159.99,
    "mb-4": 149.99,
    "ram-1": 129.99,
    "ram-2": 89.99,
    "ram-3": 169.99,
    "ram-4": 219.99,
    "gpu-1": 599.99,
    "gpu-2": 649.99,
    "gpu-3": 699.99,
    "gpu-4": 479.99,
    "storage-1": 119.99,
    "storage-2": 54.99,
    "storage-3": 249.99,
    "storage-4": 89.99,
    "psu-1": 129.99,
    "psu-2": 149.99,
    "psu-3": 109.99,
    "psu-4": 119.99,
    "case-1": 94.99,
    "case-2": 69.99,
    "case-3": 89.99,
    "case-4": 109.99,
  }

  return priceMap[componentId] || null
}
