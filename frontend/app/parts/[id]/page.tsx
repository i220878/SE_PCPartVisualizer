"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, StarHalf, Plus, ThumbsUp, ThumbsDown, ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { mockComponents } from "@/lib/mock-data"
import { getPriceComparisons } from "@/lib/price-comparison"

// Mock reviews data
const reviews = [
  {
    id: 1,
    author: {
      name: "TechEnthusiast",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    date: "2023-08-15",
    title: "Excellent performance for the price",
    content:
      "I've been using this CPU for gaming and productivity tasks, and it handles everything I throw at it with ease. The multi-core performance is particularly impressive for the price point.",
    helpful: 24,
    unhelpful: 2,
  },
  {
    id: 2,
    author: {
      name: "GamersChoice",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 4,
    date: "2023-07-22",
    title: "Great for gaming, runs a bit hot",
    content:
      "This CPU performs excellently in games, with high framerates in all the titles I play. My only complaint is that it runs a bit hot under load, so make sure you have good cooling.",
    helpful: 18,
    unhelpful: 3,
  },
  {
    id: 3,
    author: {
      name: "BuilderPro",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    date: "2023-06-10",
    title: "Perfect for mid-range builds",
    content:
      "This is my go-to CPU for mid-range builds. Great performance, reasonable power consumption, and the included cooler is actually decent. Highly recommended!",
    helpful: 32,
    unhelpful: 1,
  },
]

export default function PartPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("specs")

  // Find the component by ID
  const component = mockComponents.find((c) => c.id === params.id) || mockComponents[0]
  const priceComparisons = getPriceComparisons(component.id)

  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  // Calculate rating distribution
  const ratingDistribution = [0, 0, 0, 0, 0]
  reviews.forEach((review) => {
    ratingDistribution[review.rating - 1]++
  })
  const maxRatingCount = Math.max(...ratingDistribution)

  return (
    <main className="container mx-auto p-4 py-8">
      <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Parts
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 aspect-square bg-muted rounded-lg flex items-center justify-center">
              <div className="text-4xl font-bold text-muted-foreground">{component.category.toUpperCase()}</div>
            </div>

            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{component.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline">{component.brand}</Badge>
                <Badge>{component.category}</Badge>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex text-amber-500">
                  {[...Array(Math.floor(averageRating))].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                  {averageRating % 1 >= 0.5 && <StarHalf className="h-5 w-5 fill-current" />}
                </div>
                <span className="ml-2 font-medium">{averageRating.toFixed(1)}</span>
                <span className="ml-1 text-muted-foreground">({reviews.length} reviews)</span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between font-medium">
                  <span>Price:</span>
                  <span>${component.price.toFixed(2)}</span>
                </div>

                <div className="text-sm text-muted-foreground">
                  Prices from {priceComparisons.length} retailers, starting at $
                  {Math.min(...priceComparisons.map((p) => p.price)).toFixed(2)}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Build
                </Button>
                <Button variant="outline" className="flex-1">
                  Compare
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="specs" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="prices">Price Comparison</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {component.specs.map((spec, index) => (
                      <div key={index} className="flex justify-between py-2 border-b last:border-0">
                        <span className="font-medium">{spec.name}</span>
                        <span>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compatibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {component.category === "cpu" && (
                      <>
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium">Socket</span>
                          <span>{component.specs.find((s) => s.name === "Socket")?.value || "AM4/LGA1700"}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium">Compatible Chipsets</span>
                          <span>{component.brand === "AMD" ? "X570, B550, A520" : "Z690, B660, H610"}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="font-medium">Memory Support</span>
                          <span>{component.brand === "AMD" ? "DDR4-3200" : "DDR4-3200/DDR5-4800"}</span>
                        </div>
                      </>
                    )}

                    {component.category === "motherboard" && (
                      <>
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium">CPU Support</span>
                          <span>
                            {component.specs.find((s) => s.name === "Socket")?.value === "AM4"
                              ? "AMD Ryzen 3000/5000 Series"
                              : "Intel 12th/13th Gen"}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium">Memory Type</span>
                          <span>{component.specs.find((s) => s.name === "Memory Type")?.value || "DDR4"}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="font-medium">Form Factor</span>
                          <span>{component.specs.find((s) => s.name === "Form Factor")?.value || "ATX"}</span>
                        </div>
                      </>
                    )}

                    {component.category === "gpu" && (
                      <>
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium">Required PCIe Slot</span>
                          <span>PCIe 4.0 x16</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium">Power Connectors</span>
                          <span>{component.specs.find((s) => s.name === "Power Connectors")?.value || "8-pin"}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="font-medium">Recommended PSU</span>
                          <span>
                            {Number.parseInt(component.specs.find((s) => s.name === "TDP")?.value || "0") * 2}W
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prices" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Price Comparison</CardTitle>
                  <CardDescription>Compare prices across different retailers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {priceComparisons.map((price, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                        <div>
                          <div className="font-medium">{price.retailer}</div>
                          <div className="text-sm text-muted-foreground">Free shipping • In stock</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold">${price.price.toFixed(2)}</span>
                          <Button variant="outline" size="sm" asChild>
                            <a href={price.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Visit
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Price History</CardTitle>
                  <CardDescription>Price trends over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-muted-foreground">Price history chart</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>
                    {reviews.length} reviews for {component.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="w-full md:w-1/3 space-y-2">
                      <div className="text-center">
                        <div className="text-5xl font-bold">{averageRating.toFixed(1)}</div>
                        <div className="flex justify-center text-amber-500 my-2">
                          {[...Array(Math.floor(averageRating))].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-current" />
                          ))}
                          {averageRating % 1 >= 0.5 && <StarHalf className="h-5 w-5 fill-current" />}
                        </div>
                        <div className="text-sm text-muted-foreground">Based on {reviews.length} reviews</div>
                      </div>
                    </div>

                    <div className="w-full md:w-2/3 space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-2">
                          <div className="w-8 text-sm text-right">{rating} ★</div>
                          <Progress
                            value={(ratingDistribution[rating - 1] / maxRatingCount) * 100}
                            className="h-2 flex-1"
                          />
                          <div className="w-8 text-sm">{ratingDistribution[rating - 1]}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="space-y-2">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={review.author.avatar || "/placeholder.svg"} alt={review.author.name} />
                              <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{review.author.name}</div>
                              <div className="text-xs text-muted-foreground">{review.date}</div>
                            </div>
                          </div>
                          <div className="flex text-amber-500">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium">{review.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{review.content}</p>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <span>Was this review helpful?</span>
                          <Button variant="outline" size="sm" className="h-8">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Yes ({review.helpful})
                          </Button>
                          <Button variant="outline" size="sm" className="h-8">
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            No ({review.unhelpful})
                          </Button>
                        </div>

                        <Separator className="mt-4" />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Write a Review
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Similar Components</CardTitle>
              <CardDescription>Other {component.category}s you might consider</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockComponents
                  .filter((c) => c.category === component.category && c.id !== component.id)
                  .slice(0, 3)
                  .map((similarComponent) => (
                    <div
                      key={similarComponent.id}
                      className="flex justify-between items-center py-2 border-b last:border-0"
                    >
                      <div>
                        <div className="font-medium">{similarComponent.name}</div>
                        <div className="text-sm text-muted-foreground">{similarComponent.brand}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">${similarComponent.price.toFixed(2)}</span>
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/parts/${similarComponent.id}`}>Compare</a>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    1
                  </div>
                  <div>
                    <div className="font-medium">Amazon</div>
                    <div className="text-sm text-muted-foreground">
                      Free shipping • Estimated delivery: 2-3 business days
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    2
                  </div>
                  <div>
                    <div className="font-medium">Newegg</div>
                    <div className="text-sm text-muted-foreground">
                      $4.99 shipping • Estimated delivery: 3-5 business days
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    3
                  </div>
                  <div>
                    <div className="font-medium">Best Buy</div>
                    <div className="text-sm text-muted-foreground">
                      Free shipping on orders over $35 • Estimated delivery: 1-2 business days
                    </div>
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
