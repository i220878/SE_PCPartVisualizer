import Link from "next/link"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    id: 1,
    name: "CPUs",
    image: "/placeholder.svg?height=100&width=100",
    slug: "cpus",
  },
  {
    id: 2,
    name: "Motherboards",
    image: "/placeholder.svg?height=100&width=100",
    slug: "motherboards",
  },
  {
    id: 3,
    name: "Graphics Cards",
    image: "/placeholder.svg?height=100&width=100",
    slug: "graphics-cards",
  },
  {
    id: 4,
    name: "Memory",
    image: "/placeholder.svg?height=100&width=100",
    slug: "memory",
  },
  {
    id: 5,
    name: "Storage",
    image: "/placeholder.svg?height=100&width=100",
    slug: "storage",
  },
  {
    id: 6,
    name: "Cases",
    image: "/placeholder.svg?height=100&width=100",
    slug: "cases",
  },
]

export default function FeaturedCategories() {
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Component Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/components/${category.slug}`}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={64}
                    height={64}
                    className="mb-2"
                  />
                  <span className="font-medium">{category.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
