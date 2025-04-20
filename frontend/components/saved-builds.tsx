"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Edit, Copy } from "lucide-react"
import { useBuildStore } from "@/lib/store"
import { formatDate } from "@/lib/utils"

export default function SavedBuilds() {
  const { savedBuilds, loadBuild, deleteBuild, duplicateBuild } = useBuildStore()
  const [expandedBuild, setExpandedBuild] = useState<string | null>(null)

  const toggleExpandBuild = (buildId: string) => {
    setExpandedBuild(expandedBuild === buildId ? null : buildId)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Saved Builds</CardTitle>
        <CardDescription>
          {savedBuilds.length === 0
            ? "You haven't saved any builds yet"
            : `You have ${savedBuilds.length} saved build${savedBuilds.length !== 1 ? "s" : ""}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {savedBuilds.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">Save your current build to see it here</div>
        ) : (
          <div className="space-y-3">
            {savedBuilds.map((build) => (
              <div key={build.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{build.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(build.date)} • {build.components.length} components
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => duplicateBuild(build.id)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteBuild(build.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-2 flex justify-between items-center">
                  <div className="text-sm">
                    Total: ${build.components.reduce((sum, c) => sum + c.price, 0).toFixed(2)}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toggleExpandBuild(build.id)}>
                    {expandedBuild === build.id ? "Hide Details" : "Show Details"}
                  </Button>
                </div>

                {expandedBuild === build.id && (
                  <div className="mt-3 space-y-2 border-t pt-2">
                    {build.components.map((component) => (
                      <div key={component.id} className="flex justify-between text-sm">
                        <span>
                          {component.category}: {component.name}
                        </span>
                        <span>${component.price.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="pt-2">
                      <Button size="sm" onClick={() => loadBuild(build.id)}>
                        <Edit className="h-4 w-4 mr-1" /> Load Build
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
