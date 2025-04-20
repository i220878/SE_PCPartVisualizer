import Link from "next/link"
import Image from "next/image"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const featuredProducts = [
  {
    id: 1,
    name: "AMD Ryzen 7 5800X",
    category: "CPUs",
    price: 299.99,
    image: "/placeholder.svg?height=200&width=200",
    slug: "amd-ryzen-7-5800x",
  },
  {
    id: 2,
    name: "NVIDIA GeForce RTX 3080",
    category: "Graphics Cards",
    price: 699.99,
    image: "/placeholder.svg?height=200&width=200",
    slug: "nvidia-geforce-rtx-3080",
  },
  {
    id: 3,
    name: "Corsair Vengeance RGB Pro 32GB",
    category: "Memory",
    price: 149.99,
    image: "/placeholder.svg?height=200&width=200",
    slug: "corsair-vengeance-rgb-pro-32gb",
  },
  {
    id: 4,
    name: "Samsung 970 EVO Plus 1TB",
    category: "Storage",
    price: 129.99,
    image: "/placeholder.svg?height=200&width=200",
    slug: "samsung-970-evo-plus-1tb",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Featured Components</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <Link href={`/components/${product.category.toLowerCase()}/${product.slug}`}>
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
              </Link>
              <CardContent className="p-4">
                <div className="space-y-1">
                  <Link href={`/components/${product.category.toLowerCase()}/${product.slug}`}>
                    <h3 className="font-semibold hover:underline">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <p className="font-medium">${product.price.toFixed(2)}</p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
