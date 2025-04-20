"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useBuildStore } from "@/lib/store"
import { Sun, Moon, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function LightingControls() {
  const { currentBuild, updateLighting } = useBuildStore()
  const { toast } = useToast()

  // Provide a fallback lighting object if missing
  const lighting = currentBuild.lighting ?? { intensity: 0.5, color: "#ffffff" }

  const handleIntensityChange = (value: number[]) => {
    if (currentBuild.components.length === 0) {
      toast({
        title: "No components selected",
        description: "Add components to your build before adjusting lighting",
        variant: "destructive",
      })
      return
    }

    updateLighting({ intensity: value[0] })
  }

  const handlePreset = (preset: "day" | "night" | "studio") => {
    if (currentBuild.components.length === 0) {
      toast({
        title: "No components selected",
        description: "Add components to your build before adjusting lighting",
        variant: "destructive",
      })
      return
    }

    const presets = {
      day: { intensity: 1.0, color: "#ffffff" },
      night: { intensity: 0.3, color: "#1a1a1a" },
      studio: { intensity: 0.7, color: "#f5f5f5" }
    }

    updateLighting(presets[preset])
    toast({
      title: "Lighting Updated",
      description: `Applied ${preset} lighting preset`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Lighting Intensity</span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePreset("day")}
            disabled={currentBuild.components.length === 0}
          >
            <Sun className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePreset("night")}
            disabled={currentBuild.components.length === 0}
          >
            <Moon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePreset("studio")}
            disabled={currentBuild.components.length === 0}
          >
            <Zap className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Slider
        defaultValue={[lighting.intensity]}
        min={0}
        max={1}
        step={0.1}
        onValueChange={handleIntensityChange}
        disabled={currentBuild.components.length === 0}
      />
    </div>
  )
}
