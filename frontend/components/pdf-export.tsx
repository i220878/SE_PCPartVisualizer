"use client"

import { Button } from "@/components/ui/button"
import { useBuildStore } from "@/lib/store"
import { Download } from "lucide-react"
import { generateBuildPDF } from "@/lib/pdf-generator"
import { useToast } from "@/hooks/use-toast"

export function PdfExport() {
  const { currentBuild } = useBuildStore()
  const { toast } = useToast()

  const handleExportPDF = () => {
    if (currentBuild.components.length === 0) {
      toast({
        title: "No components selected",
        description: "Add components to your build before exporting",
        variant: "destructive",
      })
      return
    }

    const doc = generateBuildPDF(currentBuild)
    doc.save(`${currentBuild.name.replace(/\s+/g, "-").toLowerCase()}.pdf`)

    toast({
      title: "PDF Exported",
      description: "Your build has been exported as a PDF",
    })
  }

  return (
    <Button
      variant="outline"
      onClick={handleExportPDF}
      disabled={currentBuild.components.length === 0}
      className="w-full"
    >
      <Download className="h-4 w-4 mr-2" />
      Export Build as PDF
    </Button>
  )
} 