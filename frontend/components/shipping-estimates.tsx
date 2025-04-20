"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useBuildStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Truck } from "lucide-react"

export function ShippingEstimates() {
  const { currentBuild } = useBuildStore()

  // Mock shipping data - in a real app this would come from an API
  const getShippingEstimate = () => {
    if (currentBuild.components.length === 0) return null

    // Simulate different shipping times based on component count
    const baseDays = 3
    const additionalDays = Math.min(Math.floor(currentBuild.components.length / 2), 4)
    const totalDays = baseDays + additionalDays

    // Simulate shipping cost based on component count and total price
    const baseCost = 10
    const componentCost = currentBuild.components.length * 2
    const priceBasedCost = Math.min(currentBuild.components.reduce((sum, c) => sum + c.price, 0) * 0.02, 50)
    const totalCost = baseCost + componentCost + priceBasedCost

    return {
      days: totalDays,
      cost: totalCost,
      expressAvailable: currentBuild.components.length > 0,
      expressCost: totalCost * 1.5,
      expressDays: Math.max(1, totalDays - 2)
    }
  }

  const shipping = getShippingEstimate()

  if (!shipping) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Shipping Estimates
        </CardTitle>
        <CardDescription>
          Estimated delivery times and costs for your build
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Standard Shipping</span>
            <Badge variant="outline">{shipping.days} days</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Shipping Cost</span>
            <span className="font-medium">${shipping.cost.toFixed(2)}</span>
          </div>
        </div>

        {shipping.expressAvailable && (
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Express Shipping</span>
              <Badge variant="outline">{shipping.expressDays} days</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Express Cost</span>
              <span className="font-medium">${shipping.expressCost.toFixed(2)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 