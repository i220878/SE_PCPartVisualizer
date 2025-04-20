"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useBuildStore } from "@/lib/store"
import { calculatePowerConsumption, recommendPSU } from "@/lib/psu-calculator"
import { AlertCircle, Zap, Check } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PSUCalculator() {
  const { currentBuild } = useBuildStore()
  const [powerConsumption, setPowerConsumption] = useState(0)
  const [recommendation, setRecommendation] = useState<{
    wattage: number
    efficiency: string
    headroom: number
  } | null>(null)

  useEffect(() => {
    const consumption = calculatePowerConsumption(currentBuild.components)
    setPowerConsumption(consumption)
    setRecommendation(recommendPSU(consumption))
  }, [currentBuild.components])

  // Check if the current PSU is adequate
  const currentPSU = currentBuild.components.find((c) => c.category === "psu")
  const currentPSUWattage = currentPSU
    ? Number.parseInt(currentPSU.specs.find((spec) => spec.name === "Wattage")?.value || "0")
    : 0

  const isPSUAdequate = currentPSU && currentPSUWattage >= powerConsumption * 1.2

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="h-5 w-5 mr-2" />
          Power Supply Calculator
        </CardTitle>
        <CardDescription>Calculate the recommended PSU wattage for your build</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentBuild.components.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            Add components to your build to calculate power requirements
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Estimated Power Consumption</span>
                <Badge variant="outline">{powerConsumption} W</Badge>
              </div>
              <Progress value={(powerConsumption / 750) * 100} className="h-2" />
              <div className="grid grid-cols-5 text-xs text-muted-foreground">
                <div>0W</div>
                <div className="text-center">250W</div>
                <div className="text-center">500W</div>
                <div className="text-center">750W</div>
                <div className="text-right">1000W+</div>
              </div>
            </div>

            {currentPSU && (
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Current PSU</span>
                  <Badge variant={isPSUAdequate ? "outline" : "destructive"}>{currentPSUWattage} W</Badge>
                </div>

                {isPSUAdequate ? (
                  <Alert variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
                    <Check className="h-4 w-4" />
                    <AlertTitle>Adequate Power Supply</AlertTitle>
                    <AlertDescription>
                      Your current PSU provides sufficient power for this build with{" "}
                      {Math.round((currentPSUWattage / powerConsumption - 1) * 100)}% headroom.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Insufficient Power Supply</AlertTitle>
                    <AlertDescription>
                      Your current PSU may not provide enough power for this build. We recommend at least{" "}
                      {recommendation?.wattage}W.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {recommendation && (
              <div className="pt-2 space-y-2">
                <h4 className="text-sm font-medium">Recommended PSU</h4>
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{recommendation.wattage}W</span>
                    <Badge>{recommendation.efficiency}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We recommend a {recommendation.wattage}W power supply with {recommendation.efficiency} efficiency
                    rating. This provides {recommendation.headroom}% headroom for power spikes and future upgrades.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2 pt-2">
              <h4 className="text-sm font-medium">Component Power Breakdown</h4>
              <div className="space-y-1 text-sm">
                {currentBuild.components.map((component) => {
                  let componentPower = 0

                  if (component.category === "cpu" || component.category === "gpu") {
                    const tdpSpec = component.specs.find((spec) => spec.name === "TDP")
                    if (tdpSpec) {
                      componentPower = Number.parseInt(tdpSpec.value)
                    } else {
                      // Estimate based on component type
                      componentPower = component.category === "cpu" ? 95 : 200
                    }
                  } else if (component.category === "ram") {
                    componentPower = 10
                  } else if (component.category === "storage") {
                    componentPower = component.name.includes("HDD") ? 10 : 5
                  }

                  return componentPower > 0 ? (
                    <div key={component.id} className="flex justify-between">
                      <span className="text-muted-foreground">{component.name}</span>
                      <span>{componentPower} W</span>
                    </div>
                  ) : null
                })}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Other components & overhead</span>
                  <span>~50 W</span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <a href="/parts?category=psu">Browse Power Supplies</a>
        </Button>
      </CardFooter>
    </Card>
  )
}
