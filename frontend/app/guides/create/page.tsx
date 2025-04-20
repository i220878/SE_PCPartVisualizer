"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useBuildStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react"

export default function CreateGuidePage() {
  const { currentBuild } = useBuildStore()
  const { toast } = useToast()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("gaming")
  const [difficulty, setDifficulty] = useState("beginner")
  const [budget, setBudget] = useState("")
  const [steps, setSteps] = useState([
    {
      title: "Prepare your workspace",
      content:
        "Clear a large, well-lit space for assembly. Gather all necessary tools: screwdrivers, zip ties, and anti-static equipment.",
    },
    {
      title: "Install CPU in motherboard",
      content:
        "Carefully align the CPU with the socket, matching the alignment markers. Gently lower the CPU into place without applying pressure. Secure the retention mechanism.",
    },
    {
      title: "Install RAM",
      content:
        "Align the notches on the RAM with the slots on the motherboard. Apply even pressure until the retention clips snap into place.",
    },
  ])

  const addStep = () => {
    setSteps([...steps, { title: "", content: "" }])
  }

  const updateStep = (index: number, field: "title" | "content", value: string) => {
    const newSteps = [...steps]
    newSteps[index][field] = value
    setSteps(newSteps)
  }

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !description || steps.some((step) => !step.title || !step.content)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would save to a database
    toast({
      title: "Guide Created",
      description: "Your build guide has been created successfully",
    })

    router.push("/guides")
  }

  return (
    <main className="container mx-auto p-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-4" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Build Guide</h1>
          <p className="text-muted-foreground">Share your knowledge with the community</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Guide Information</CardTitle>
                <CardDescription>Basic information about your build guide</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Budget Gaming PC Build Guide"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a brief overview of your build guide"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gaming">Gaming</SelectItem>
                        <SelectItem value="workstation">Workstation</SelectItem>
                        <SelectItem value="streaming">Streaming</SelectItem>
                        <SelectItem value="budget">Budget</SelectItem>
                        <SelectItem value="sff">Small Form Factor</SelectItem>
                        <SelectItem value="silent">Silent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Input
                      id="budget"
                      placeholder="e.g., $800-$1000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Build Steps</CardTitle>
                <CardDescription>Step-by-step instructions for your build guide</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Step {index + 1}</h3>
                      <Button variant="ghost" size="icon" type="button" onClick={() => removeStep(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`step-title-${index}`}>Title</Label>
                      <Input
                        id={`step-title-${index}`}
                        placeholder="e.g., Install CPU"
                        value={step.title}
                        onChange={(e) => updateStep(index, "title", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`step-content-${index}`}>Instructions</Label>
                      <Textarea
                        id={`step-content-${index}`}
                        placeholder="Detailed instructions for this step"
                        value={step.content}
                        onChange={(e) => updateStep(index, "content", e.target.value)}
                        required
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                ))}

                <Button type="button" variant="outline" className="w-full" onClick={addStep}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Components</CardTitle>
                <CardDescription>Components used in this build</CardDescription>
              </CardHeader>
              <CardContent>
                {currentBuild.components.length > 0 ? (
                  <div className="space-y-2">
                    {currentBuild.components.map((component) => (
                      <div key={component.id} className="flex justify-between text-sm border-b pb-2">
                        <span className="text-muted-foreground">{component.category}:</span>
                        <span>{component.name}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-medium pt-2">
                      <span>Total:</span>
                      <span>${currentBuild.components.reduce((sum, c) => sum + c.price, 0).toFixed(2)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No components selected. Add components in the Build page.
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/build">Edit Components</a>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>Preview your guide</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="info">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="info">Info</TabsTrigger>
                    <TabsTrigger value="steps">Steps</TabsTrigger>
                  </TabsList>
                  <TabsContent value="info" className="pt-4">
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">{title || "Guide Title"}</h3>
                      <p className="text-muted-foreground">{description || "Guide description will appear here"}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {category && (
                          <div className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                            {category}
                          </div>
                        )}
                        {difficulty && (
                          <div className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                            {difficulty}
                          </div>
                        )}
                        {budget && (
                          <div className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                            {budget}
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="steps" className="pt-4">
                    <div className="space-y-4">
                      {steps.length > 0 ? (
                        steps.map((step, index) => (
                          <div key={index} className="space-y-1">
                            <h4 className="font-medium">
                              Step {index + 1}: {step.title || "Step Title"}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {step.content || "Step instructions will appear here"}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-muted-foreground">No steps added yet</div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Publish Guide
            </Button>
          </div>
        </div>
      </form>
    </main>
  )
}
