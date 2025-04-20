"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star, StarHalf, Plus } from "lucide-react"
import { mockComponents } from "@/lib/mock-data"
import type { ComponentCategory } from "@/lib/types"

export default function PartsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | "all">("all")

  const filteredComponents = mockComponents.filter((component) => {
    const matchesCategory = selectedCategory === "all" || component.category === selectedCategory
    const matchesSearch =
      searchTerm === "" ||
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.specs.some(
        (spec) =>
          spec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          spec.value.toLowerCase().includes(searchTerm.toLowerCase()),
      )

    return matchesCategory && matchesSearch
  })

  // Group components by category for counting
  const categoryCounts = mockComponents.reduce(
    (acc, component) => {
      acc[component.category] = (acc[component.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <main className="container mx-auto p-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Parts Database</h1>
          <p className="text-muted-foreground">Browse our comprehensive database of PC components</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search parts by name, brand, or specifications..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs
        defaultValue="all"
        value={selectedCategory}
        onValueChange={(value) => setSelectedCategory(value as ComponentCategory | "all")}
        className="mb-6"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-8">
          <TabsTrigger value="all">All ({mockComponents.length})</TabsTrigger>
          <TabsTrigger value="cpu">CPU ({categoryCounts["cpu"] || 0})</TabsTrigger>
          <TabsTrigger value="motherboard">Motherboard ({categoryCounts["motherboard"] || 0})</TabsTrigger>
          <TabsTrigger value="ram">RAM ({categoryCounts["ram"] || 0})</TabsTrigger>
          <TabsTrigger value="gpu">GPU ({categoryCounts["gpu"] || 0})</TabsTrigger>
          <TabsTrigger value="storage">Storage ({categoryCounts["storage"] || 0})</TabsTrigger>
          <TabsTrigger value="psu">PSU ({categoryCounts["psu"] || 0})</TabsTrigger>
          <TabsTrigger value="case">Case ({categoryCounts["case"] || 0})</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.map((component) => (
          <Card key={component.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{component.name}</CardTitle>
                <Badge>{component.category}</Badge>
              </div>
              <CardDescription>{component.brand}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-1 text-sm">
                {component.specs.slice(0, 4).map((spec, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">{spec.name}:</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
                {component.specs.length > 4 && (
                  <div className="text-center text-muted-foreground text-xs mt-2">
                    +{component.specs.length - 4} more specifications
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center">
                <div className="flex text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <StarHalf className="h-4 w-4 fill-current" />
                </div>
                <span className="text-sm ml-2">4.5 (128 reviews)</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="font-medium">${component.price.toFixed(2)}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={`/parts/${component.id}`}>Details</a>
                </Button>
                <Button size="sm">
                  <Plus className="mr-1 h-4 w-4" /> Add to Build
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
