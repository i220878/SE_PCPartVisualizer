"use client"

import { Button } from "@/components/ui/button"
import { useBuildStore } from "@/lib/store"
import { Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CasePanelToggle() {
  const { currentBuild, toggleCaseVisibility } = useBuildStore()
  const { toast } = useToast()

  const handleToggleCase = () => {
    if (currentBuild.components.length === 0) {
      toast({
        title: "No components selected",
        description: "Add components to your build before toggling case visibility",
        variant: "destructive",
      })
      return
    }

    toggleCaseVisibility()
    toast({
      title: "Case Visibility Updated",
      description: `Case panel is now ${currentBuild.showCase ? "visible" : "hidden"}`,
    })
  }

  return (
    <Button
      variant="outline"
      onClick={handleToggleCase}
      disabled={currentBuild.components.length === 0}
      className="w-full"
    >
      {currentBuild.showCase ? (
        <>
          <Eye className="h-4 w-4 mr-2" />
          Show Case Panel
        </>
      ) : (
        <>
          <EyeOff className="h-4 w-4 mr-2" />
          Hide Case Panel
        </>
      )}
    </Button>
  )
} 