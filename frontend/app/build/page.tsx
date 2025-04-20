"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ComponentSearch from "@/components/component-search"
import BuildList from "@/components/build-list"
import PcVisualizer from "@/components/pc-visualizer"
import SavedBuilds from "@/components/saved-builds"
import PsuCalculator from "@/components/psu-calculator"
import { ShippingEstimates } from "@/components/shipping-estimates"
import { PdfExport } from "@/components/pdf-export"
import { CasePanelToggle } from "@/components/case-panel-toggle"
import { LightingControls } from "@/components/lighting-controls"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useBuildStore } from "@/lib/store"

export default function BuildPage() {
  const [activeTab, setActiveTab] = useState("components")
  const { currentBuild } = useBuildStore()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">PC Build Visualizer</h1>
        <div className="flex gap-2">
          <PdfExport />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="saved">Saved Builds</TabsTrigger>
            </TabsList>
            <TabsContent value="components">
              <ComponentSearch />
            </TabsContent>
            <TabsContent value="saved">
              <SavedBuilds />
            </TabsContent>
          </Tabs>

          <BuildList />
        </div>

        <div className="space-y-6">
          <PcVisualizer />
          
          <Card>
            <CardHeader>
              <CardTitle>Controls</CardTitle>
              <CardDescription>Adjust the 3D visualization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CasePanelToggle />
              <LightingControls />
            </CardContent>
          </Card>

          <PsuCalculator />
          <ShippingEstimates />
        </div>
      </div>
    </div>
  )
}
