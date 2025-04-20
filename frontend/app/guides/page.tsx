import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Plus } from "lucide-react"

// Mock guides data
const guides = [
  {
    id: "1",
    title: "Beginner's Guide to PC Building",
    description: "A step-by-step guide for first-time builders",
    difficulty: "Beginner",
    author: "PCPartVisualizer Team",
    date: "2023-01-15",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    title: "How to Install a CPU",
    description: "Detailed instructions for CPU installation",
    difficulty: "Beginner",
    author: "PCPartVisualizer Team",
    date: "2023-02-10",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    title: "Advanced Cable Management",
    description: "Tips and tricks for clean cable management",
    difficulty: "Intermediate",
    author: "PCPartVisualizer Team",
    date: "2023-03-05",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "4",
    title: "Water Cooling Installation Guide",
    description: "Complete guide to installing a custom water cooling loop",
    difficulty: "Advanced",
    author: "PCPartVisualizer Team",
    date: "2023-04-20",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "5",
    title: "Optimizing Airflow in Your Case",
    description: "Learn how to maximize airflow for better cooling",
    difficulty: "Intermediate",
    author: "PCPartVisualizer Team",
    date: "2023-05-12",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "6",
    title: "RGB Lighting Setup Guide",
    description: "How to set up and synchronize RGB lighting",
    difficulty: "Intermediate",
    author: "PCPartVisualizer Team",
    date: "2023-06-08",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function GuidesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Build Guides</h1>
        <p className="text-muted-foreground">Step-by-step guides to help you build your PC with confidence.</p>
      </div>

      <div className="flex justify-end">
        <Link href="/guides/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Guide
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Card key={guide.id}>
            <CardHeader className="p-0">
              <img
                src={guide.image || "/placeholder.svg"}
                alt={guide.title}
                className="aspect-video w-full object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">{guide.difficulty}</span>
                <span className="text-sm text-muted-foreground">{guide.date}</span>
              </div>
              <CardTitle className="mb-2">{guide.title}</CardTitle>
              <CardDescription>{guide.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-sm text-muted-foreground">By {guide.author}</span>
              <Link href={`/guides/${guide.id}`}>
                <Button variant="outline" size="sm">
                  View Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
