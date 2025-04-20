"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, ThumbsUp, MessageSquare, Eye, ArrowRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for community builds
const communityBuilds = [
  {
    id: 1,
    title: "My First Gaming PC",
    description: "Built this for playing Cyberpunk 2077 and other AAA titles",
    author: {
      name: "GamerX",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-10-15",
    category: "Gaming",
    specs: {
      cpu: "Ryzen 7 5800X",
      gpu: "RTX 3080",
      ram: "32GB DDR4 3600MHz",
      storage: "1TB NVMe SSD",
      case: "Corsair 4000D Airflow",
    },
    images: ["/placeholder.svg?height=200&width=300"],
    comments: 24,
    likes: 87,
    views: 1245,
  },
  {
    id: 2,
    title: "Compact Productivity Machine",
    description: "Small form factor PC for my home office setup",
    author: {
      name: "OfficePro",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-09-22",
    category: "Productivity",
    specs: {
      cpu: "Intel i5-12600K",
      gpu: "Intel UHD Graphics",
      ram: "16GB DDR4 3200MHz",
      storage: "512GB NVMe SSD",
      case: "NZXT H1",
    },
    images: ["/placeholder.svg?height=200&width=300"],
    comments: 12,
    likes: 45,
    views: 782,
  },
  {
    id: 3,
    title: "Ultimate Streaming Setup",
    description: "Dual PC setup for streaming and gaming",
    author: {
      name: "StreamerPro",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-08-10",
    category: "Streaming",
    specs: {
      cpu: "Ryzen 9 5950X",
      gpu: "RTX 3090",
      ram: "64GB DDR4 3600MHz",
      storage: "2TB NVMe SSD + 4TB HDD",
      case: "Lian Li O11 Dynamic",
    },
    images: ["/placeholder.svg?height=200&width=300"],
    comments: 36,
    likes: 124,
    views: 2145,
  },
  {
    id: 4,
    title: "Budget Workstation",
    description: "Affordable PC for video editing and 3D modeling",
    author: {
      name: "CreatorOnBudget",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-07-05",
    category: "Workstation",
    specs: {
      cpu: "Ryzen 5 5600X",
      gpu: "RTX 3060",
      ram: "32GB DDR4 3200MHz",
      storage: "1TB NVMe SSD",
      case: "Fractal Design Meshify C",
    },
    images: ["/placeholder.svg?height=200&width=300"],
    comments: 18,
    likes: 56,
    views: 932,
  },
  {
    id: 5,
    title: "RGB Showcase",
    description: "Maximum RGB build with synchronized lighting",
    author: {
      name: "RGBLover",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-06-12",
    category: "Gaming",
    specs: {
      cpu: "Intel i9-12900K",
      gpu: "RTX 3080 Ti",
      ram: "32GB DDR5 5600MHz",
      storage: "2TB NVMe SSD",
      case: "Corsair iCUE 5000X RGB",
    },
    images: ["/placeholder.svg?height=200&width=300"],
    comments: 42,
    likes: 138,
    views: 2567,
  },
  {
    id: 6,
    title: "Silent Home Theater PC",
    description: "Ultra-quiet HTPC for my living room",
    author: {
      name: "MovieBuff",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-05-01",
    category: "HTPC",
    specs: {
      cpu: "Intel i5-12400",
      gpu: "RTX 3050",
      ram: "16GB DDR4 3200MHz",
      storage: "1TB NVMe SSD + 4TB HDD",
      case: "Fractal Design Node 202",
    },
    images: ["/placeholder.svg?height=200&width=300"],
    comments: 15,
    likes: 42,
    views: 876,
  },
]

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredBuilds = communityBuilds.filter((build) => {
    const matchesSearch =
      build.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      build.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      build.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(build.specs).some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = activeTab === "all" || build.category.toLowerCase() === activeTab.toLowerCase()

    return matchesSearch && matchesCategory
  })

  return (
    <main className="container mx-auto p-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Community Builds</h1>
          <p className="text-muted-foreground">Discover builds shared by other enthusiasts</p>
        </div>
        <Button className="mt-4 md:mt-0" asChild>
          <a href="/community/submit">
            <Plus className="mr-2 h-4 w-4" /> Submit Build
          </a>
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search builds by title, description, category, or components..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-7">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="gaming">Gaming</TabsTrigger>
          <TabsTrigger value="workstation">Workstation</TabsTrigger>
          <TabsTrigger value="streaming">Streaming</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="htpc">HTPC</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBuilds.map((build) => (
          <Card key={build.id} className="overflow-hidden">
            <div className="aspect-video bg-muted">
              <img
                src={build.images[0] || "/placeholder.svg"}
                alt={build.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{build.title}</CardTitle>
                <Badge>{build.category}</Badge>
              </div>
              <CardDescription>{build.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CPU:</span>
                  <span>{build.specs.cpu}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GPU:</span>
                  <span>{build.specs.gpu}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">RAM:</span>
                  <span>{build.specs.ram}</span>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={build.author.avatar || "/placeholder.svg"} alt={build.author.name} />
                  <AvatarFallback>{build.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div>{build.author.name}</div>
                  <div className="text-muted-foreground">{build.date}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Eye className="mr-1 h-4 w-4" />
                  {build.views}
                </div>
                <div className="flex items-center">
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  {build.likes}
                </div>
                <div className="flex items-center">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  {build.comments}
                </div>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <a href={`/community/builds/${build.id}`}>
                  View <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
