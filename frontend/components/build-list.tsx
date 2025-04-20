"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Save, Trash2, Download, Share2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useBuildStore } from "@/lib/store"
import { checkCompatibility } from "@/lib/compatibility"
import { getPriceComparisons } from "@/lib/price-comparison"

export default function BuildList() {
  const { currentBuild, removeComponent, saveBuild, clearBuild } = useBuildStore()
  const [showPriceComparison, setShowPriceComparison] = useState<string | null>(null)

  const compatibilityIssues = checkCompatibility(currentBuild.components)
  const totalPrice = currentBuild.components.reduce((sum, component) => sum + component.price, 0)

  const handleSaveBuild = () => {
    if (currentBuild.components.length > 0) {
      saveBuild({
        ...currentBuild,
        id: Date.now().toString(),
        name: `Build #${Math.floor(Math.random() * 1000)}`,
        date: new Date().toISOString(),
      })
    }
  }

  const togglePriceComparison = (componentId: string) => {
    setShowPriceComparison(showPriceComparison === componentId ? null : componentId)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Current Build</CardTitle>
        <CardDescription>
          {currentBuild.components.length === 0
            ? "Add components to start your build"
            : `${currentBuild.components.length} components selected`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {compatibilityIssues.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Compatibility Issues</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 text-sm">
                {compatibilityIssues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {currentBuild.components.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Your build is empty. Start by adding components from the search panel.
          </div>
        ) : (
          <div className="space-y-3">
            {currentBuild.components.map((component) => {
              const priceComparisons = getPriceComparisons(component.id)

              return (
                <div key={component.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{component.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{component.brand}</Badge>
                        <Badge variant="secondary">{component.category}</Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeComponent(component.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-2 flex justify-between items-center">
                    <div className="font-medium">${component.price.toFixed(2)}</div>
                    <Button variant="outline" size="sm" onClick={() => togglePriceComparison(component.id)}>
                      Compare Prices
                    </Button>
                  </div>

                  {showPriceComparison === component.id && (
                    <div className="mt-3 space-y-2 border-t pt-2">
                      <div className="text-sm font-medium">Price Comparison</div>
                      {priceComparisons.map((price, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{price.retailer}</span>
                          <span className={price.price < component.price ? "text-green-600 font-medium" : ""}>
                            ${price.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            <div className="flex justify-between items-center pt-2 border-t">
              <div className="font-bold">Total</div>
              <div className="font-bold">${totalPrice.toFixed(2)}</div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={clearBuild} disabled={currentBuild.components.length === 0}>
          Clear Build
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" disabled={currentBuild.components.length === 0}>
            <Download className="h-4 w-4 mr-1" /> Export
          </Button>
          <Button variant="outline" disabled={currentBuild.components.length === 0}>
            <Share2 className="h-4 w-4 mr-1" /> Share
          </Button>
          <Button onClick={handleSaveBuild} disabled={currentBuild.components.length === 0}>
            <Save className="h-4 w-4 mr-1" /> Save Build
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
