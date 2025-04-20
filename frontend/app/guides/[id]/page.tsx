"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ThumbsUp, MessageSquare, Share2, Bookmark, Eye } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

// Mock data for a build guide
const guide = {
  id: 1,
  title: "Budget Gaming PC Build Guide",
  description:
    "A comprehensive guide to building a budget-friendly gaming PC that can handle most modern games at 1080p with good framerates.",
  author: {
    name: "PCPartVisualizer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  date: "2023-05-15",
  difficulty: "Beginner",
  category: "Gaming",
  budget: "$700-$800",
  image: "/placeholder.svg?height=400&width=800",
  views: 1245,
  likes: 87,
  comments: 24,
  components: [
    { category: "CPU", name: "AMD Ryzen 5 5600X", price: 199.99 },
    { category: "Motherboard", name: "MSI B550 Tomahawk", price: 169.99 },
    { category: "RAM", name: "Corsair Vengeance RGB Pro 16GB", price: 89.99 },
    { category: "GPU", name: "NVIDIA GeForce RTX 3060", price: 329.99 },
    { category: "Storage", name: "Samsung 970 EVO Plus 1TB", price: 119.99 },
    { category: "PSU", name: "Corsair RM650x", price: 109.99 },
    { category: "Case", name: "Corsair 4000D Airflow", price: 94.99 },
  ],
  steps: [
    {
      title: "Prepare your workspace",
      content:
        "Clear a large, well-lit space for assembly. Gather all necessary tools: screwdrivers (Phillips-head and flathead), zip ties for cable management, and anti-static equipment if available (wristband or mat). Unbox all components and verify nothing is missing or damaged.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Install CPU in motherboard",
      content:
        "Carefully align the CPU with the socket, matching the alignment markers (usually a gold triangle in the corner). Gently lower the CPU into place without applying pressure. Secure the retention mechanism according to your motherboard's design. Apply a pea-sized amount of thermal paste to the center of the CPU if your cooler doesn't come with pre-applied paste.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Install CPU cooler",
      content:
        "Align the cooler with the mounting brackets on the motherboard. Secure it following the manufacturer's instructions, usually by tightening screws in a diagonal pattern. Connect the CPU fan to the CPU_FAN header on the motherboard.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Install RAM",
      content:
        "Align the notches on the RAM with the slots on the motherboard. For dual-channel configuration, use slots 2 and 4 (counting from the CPU). Apply even pressure until the retention clips snap into place.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Install M.2 SSD (if applicable)",
      content:
        "Locate the M.2 slot on your motherboard. Insert the SSD at a 30-degree angle, then press it down and secure it with the provided screw.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Prepare the case",
      content:
        "Remove both side panels. Identify the standoffs for your motherboard form factor (ATX in this build) and ensure they're installed in the correct positions. Install the I/O shield that came with your motherboard by pressing it into place from inside the case.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Install motherboard in case",
      content:
        "Carefully lower the motherboard into the case, aligning it with the I/O shield and standoffs. Secure the motherboard with screws, but don't overtighten.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Install power supply",
      content:
        "Position the PSU in its designated location (usually at the bottom of the case). Secure it with screws. If your case allows, orient the fan facing downward if there's adequate ventilation underneath.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Install GPU",
      content:
        "Remove the appropriate PCI-E slot covers from the back of the case. Align the GPU with the top PCI-E x16 slot and press firmly until it clicks into place. Secure it with screws to the case.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Connect power cables",
      content:
        "Connect the 24-pin ATX power connector to the motherboard. Connect the 8-pin CPU power connector. Connect the necessary PCIe power cables to the GPU. Route cables neatly for better airflow.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Connect front panel connectors",
      content:
        "Connect the front panel connectors (power switch, reset switch, LEDs) to the appropriate headers on the motherboard. Refer to your motherboard manual for the exact layout.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Final checks and power on",
      content:
        "Double-check all connections. Ensure all components are properly seated. Close the case. Connect peripherals (monitor, keyboard, mouse). Connect power and turn on the PC. Enter BIOS to verify all components are recognized and configure settings as needed.",
      image: "/placeholder.svg?height=300&width=500",
    },
  ],
}

export default function GuidePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const totalPrice = guide.components.reduce((sum, component) => sum + component.price, 0)

  return (
    <main className="container mx-auto p-4 py-8">
      <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Guides
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{guide.title}</h1>
            <p className="text-muted-foreground mb-4">{guide.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">{guide.category}</Badge>
              <Badge variant="outline">{guide.difficulty}</Badge>
              <Badge variant="outline">{guide.budget}</Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={guide.author.avatar || "/placeholder.svg"} alt={guide.author.name} />
                  <AvatarFallback>{guide.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">{guide.author.name}</div>
                  <div className="text-xs text-muted-foreground">{guide.date}</div>
                </div>
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="h-4 w-4 mr-1" />
                {guide.views} views
              </div>
            </div>
          </div>

          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <img src={guide.image || "/placeholder.svg"} alt={guide.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button variant={liked ? "default" : "outline"} size="sm" onClick={() => setLiked(!liked)}>
                <ThumbsUp className="h-4 w-4 mr-2" />
                {liked ? guide.likes + 1 : guide.likes}
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                {guide.comments}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant={bookmarked ? "default" : "outline"} size="sm" onClick={() => setBookmarked(!bookmarked)}>
                <Bookmark className="h-4 w-4 mr-2" />
                {bookmarked ? "Saved" : "Save"}
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-bold mb-4">Build Guide</h2>
            <div className="space-y-8">
              {guide.steps.map((step, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-xl font-medium">
                    Step {index + 1}: {step.title}
                  </h3>
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={step.image || "/placeholder.svg"}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p>{step.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Components</h3>
              <div className="space-y-2">
                {guide.components.map((component, index) => (
                  <div key={index} className="flex justify-between text-sm border-b pb-2">
                    <span className="text-muted-foreground">{component.category}:</span>
                    <span>{component.name}</span>
                  </div>
                ))}
                <div className="flex justify-between font-medium pt-2">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Button className="w-full">Build This PC</Button>
                <Button variant="outline" className="w-full">
                  View in 3D
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Similar Guides</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-sm">Mid-Range Gaming PC</h4>
                    <p className="text-xs text-muted-foreground">$1000-$1200 • Gaming</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-sm">Ultra Budget Build</h4>
                    <p className="text-xs text-muted-foreground">$500-$600 • Gaming</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-sm">First-Time Builder Guide</h4>
                    <p className="text-xs text-muted-foreground">$800-$900 • Beginner</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
