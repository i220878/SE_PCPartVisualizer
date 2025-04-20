"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Save, Trash2, Download, Share2, Zap } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useBuildStore } from "@/lib/store"
import { checkCompatibility } from "@/lib/compatibility"
import { getPriceComparisons } from "@/lib/price-comparison"
import { calculatePowerConsumption, recommendPSU } from "@/lib/psu-calculator"
import { exportBuildToPDF } from "@/lib/export-pdf"
import { copyShareableLink } from "@/lib/share-build"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

export default function BuildList() {
  const { currentBuild, removeComponent, saveBuild, clearBuild } = useBuildStore()
  const [showPriceComparison, setShowPriceComparison] = useState<string | null>(null)
  const { toast } = useToast()

  const compatibilityIssues = checkCompatibility(currentBuild.components)
  const totalPrice = currentBuild.components.reduce((sum, component) => sum + component.price, 0)

  // Calculate power consumption
  const powerConsumption = calculatePowerConsumption(currentBuild.components)
  const psuRecommendation = recommendPSU(powerConsumption)

  // Check if current PSU is adequate
  const currentPSU = currentBuild.components.find((c) => c.category === "psu")
  let psuAdequate = true
  let currentPSUWattage = 0

  if (currentPSU) {
    const wattageSpec = currentPSU.specs.find((spec) => spec.name === "Wattage")
    if (wattageSpec) {
      currentPSUWattage = Number.parseInt(wattageSpec.value)
      psuAdequate = currentPSUWattage >= powerConsumption * 1.2
    }
  }

  const handleSaveBuild = () => {
    if (currentBuild.components.length > 0) {
      saveBuild({
        ...currentBuild,
        id: Date.now().toString(),
        name: `Build #${Math.floor(Math.random() * 1000)}`,
        date: new Date().toISOString(),
      })

      toast({
        title: "Build Saved",
        description: "Your build has been saved successfully",
      })
    }
  }

  const togglePriceComparison = (componentId: string) => {
    setShowPriceComparison(showPriceComparison === componentId ? null : componentId)
  }

  const handleExportPDF = () => {
    if (currentBuild.components.length === 0) {
      toast({
        title: "No components selected",
        description: "Add components to your build before exporting",
        variant: "destructive",
      })
      return
    }

    exportBuildToPDF(currentBuild)
    toast({
      title: "PDF Exported",
      description: "Your build has been exported as a PDF",
    })
  }

  const handleShareBuild = async () => {
    if (currentBuild.components.length === 0) {
      toast({
        title: "No components selected",
        description: "Add components to your build before sharing",
        variant: "destructive",
      })
      return
    }

    const success = await copyShareableLink(currentBuild)
    if (success) {
      toast({
        title: "Link Copied",
        description: "Shareable link copied to clipboard",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to copy link to clipboard",
        variant: "destructive",
      })
    }
  }

  // Calculate estimated shipping time
  const getEstimatedShipping = () => {
    // In a real app, this would be based on retailer data
    // For now, we'll return a random date between 3-10 days from now
    const today = new Date()
    const daysToAdd = Math.floor(Math.random() * 7) + 3
    const deliveryDate = new Date(today)
    deliveryDate.setDate(today.getDate() + daysToAdd)

    return deliveryDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
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

        {currentBuild.components.length > 0 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full" size="sm">
                <Zap className="mr-2 h-4 w-4" />
                Power Consumption: {powerConsumption}W
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Power Consumption Analysis</DialogTitle>
                <DialogDescription>Estimated power requirements and PSU recommendations</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Estimated Power Draw:</span>
                    <span className="font-medium">{powerConsumption}W</span>
                  </div>
                  <Progress value={(powerConsumption / 1000) * 100} className="h-2" />
                </div>

                {currentPSU && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Current PSU:</span>
                      <span className="font-medium">
                        {currentPSU.name} ({currentPSUWattage}W)
                      </span>
                    </div>
                    <Alert variant={psuAdequate ? "default" : "destructive"}>
                      <AlertTitle>{psuAdequate ? "Adequate Power Supply" : "Insufficient Power Supply"}</AlertTitle>
                      <AlertDescription>
                        {psuAdequate
                          ? `Your PSU has ${Math.round((currentPSUWattage / powerConsumption - 1) * 100)}% headroom, which is sufficient.`
                          : `Your PSU may not provide enough power. We recommend at least ${psuRecommendation.wattage}W.`}
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium">Recommendation</h4>
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between mb-1">
                      <span>Recommended Wattage:</span>
                      <span className="font-medium">{psuRecommendation.wattage}W</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Recommended Efficiency:</span>
                      <span className="font-medium">{psuRecommendation.efficiency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Headroom for Future Upgrades:</span>
                      <span className="font-medium">{psuRecommendation.headroom}%</span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Note: Power consumption is estimated based on component specifications. Actual power draw may vary
                  depending on usage and overclocking.
                </div>
              </div>
            </DialogContent>
          </Dialog>
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

            {currentBuild.components.length >= 3 && (
              <div className="text-sm text-muted-foreground">
                Estimated delivery: {getEstimatedShipping()} if ordered today
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={clearBuild} disabled={currentBuild.components.length === 0}>
          Clear Build
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportPDF} disabled={currentBuild.components.length === 0}>
            <Download className="h-4 w-4 mr-1" /> Export
          </Button>
          <Button variant="outline" onClick={handleShareBuild} disabled={currentBuild.components.length === 0}>
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
