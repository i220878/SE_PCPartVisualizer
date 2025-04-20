"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, SlidersHorizontal } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useBuildStore } from "@/lib/store"
import type { Component, ComponentCategory } from "@/lib/types"
import { mockComponents } from "@/lib/mock-data"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function ComponentSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>("cpu")
  const [filteredComponents, setFilteredComponents] = useState<Component[]>([])
  const { addComponent, currentBuild } = useBuildStore()
  const { toast } = useToast()

  // Filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [maxPowerConsumption, setMaxPowerConsumption] = useState<number>(500)
  const [sortBy, setSortBy] = useState<string>("price-asc")

  // Get unique brands for the current category
  const availableBrands = [
    ...new Set(mockComponents.filter((c) => c.category === selectedCategory).map((c) => c.brand)),
  ].sort()

  useEffect(() => {
    let filtered = mockComponents.filter((component) => {
      const matchesCategory = component.category === selectedCategory
      const matchesSearch =
        searchTerm === "" ||
        component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.specs.some(
          (spec) =>
            spec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            spec.value.toLowerCase().includes(searchTerm.toLowerCase()),
        )

      // Price filter
      const matchesPrice = component.price >= priceRange[0] && component.price <= priceRange[1]

      // Brand filter
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(component.brand)

      // Power consumption filter (only for CPU and GPU)
      let matchesPower = true
      if (component.category === "cpu" || component.category === "gpu") {
        const tdpSpec = component.specs.find((spec) => spec.name === "TDP")
        if (tdpSpec) {
          const tdp = Number.parseInt(tdpSpec.value)
          matchesPower = tdp <= maxPowerConsumption
        }
      }
      

      return matchesCategory && matchesSearch && matchesPrice && matchesBrand && matchesPower
    })

    // Sort components
    switch (sortBy) {
      case "price-asc":
        filtered = filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered = filtered.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filtered = filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
    }

    setFilteredComponents(filtered)
  }, [searchTerm, selectedCategory, priceRange, selectedBrands, maxPowerConsumption, sortBy])

  const handleAddComponent = (component: Component) => {
    // Check if a component of this category already exists in the build
    const existingComponent = currentBuild.components.find((c) => c.category === component.category)

    if (existingComponent) {
      toast({
        title: "Component replaced",
        description: `Replaced ${existingComponent.name} with ${component.name}`,
      })
    } else {
      toast({
        title: "Component added",
        description: `Added ${component.name} to your build`,
      })
    }

    addComponent(component)
  }

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    } else {
      setSelectedBrands([...selectedBrands, brand])
    }
  }

  // Get max price for the current category
  const maxPrice = Math.max(...mockComponents.filter((c) => c.category === selectedCategory).map((c) => c.price))

  // Reset filters when category changes
  useEffect(() => {
    setPriceRange([0, maxPrice])
    setSelectedBrands([])
    setMaxPowerConsumption(500)
  }, [selectedCategory, maxPrice])

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Component Search</CardTitle>
            <CardDescription>Search and add components to your build</CardDescription>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Components</SheetTitle>
                <SheetDescription>Refine your search with additional filters</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Price Range</h4>
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0].toFixed(2)}</span>
                    <span>${priceRange[1].toFixed(2)}</span>
                  </div>
                  <Slider
                    value={priceRange}
                    min={0}
                    max={maxPrice}
                    step={10}
                    onValueChange={(value) => setPriceRange([value[0], value[1]])}
                    className="mt-2"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Brands</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {availableBrands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {(selectedCategory === "cpu" || selectedCategory === "gpu") && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Max Power Consumption</h4>
                      <span>{maxPowerConsumption}W</span>
                    </div>
                    <Slider
                      value={[maxPowerConsumption]}
                      min={0}
                      max={500}
                      step={10}
                      onValueChange={(value) => setMaxPowerConsumption(value[0])}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium">Sort By</h4>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or brand..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="cpu" onValueChange={(value) => setSelectedCategory(value as ComponentCategory)}>
          <TabsList className="grid grid-cols-4 md:grid-cols-7">
            <TabsTrigger value="cpu">CPU</TabsTrigger>
            <TabsTrigger value="motherboard">Motherboard</TabsTrigger>
            <TabsTrigger value="ram">RAM</TabsTrigger>
            <TabsTrigger value="gpu">GPU</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="psu">PSU</TabsTrigger>
            <TabsTrigger value="case">Case</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredComponents.length > 0 ? (
                filteredComponents.map((component) => (
                  <Card key={component.id} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">{component.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{component.brand}</Badge>
                        <Badge variant="secondary">{component.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-sm space-y-2">
                        {component.specs.map((spec, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-muted-foreground">{spec.name}:</span>
                            <span>{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 flex justify-between">
                      <div className="font-medium">${component.price.toFixed(2)}</div>
                      <Button size="sm" onClick={() => handleAddComponent(component)}>
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No components found. Try adjusting your search or filters.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
