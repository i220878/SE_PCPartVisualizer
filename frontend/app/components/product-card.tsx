"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import { toast } from "@/components/ui/use-toast"

type ProductCardProps = {
  id: number
  name: string
  category: string
  price: number
  image: string
  slug: string
}

export default function ProductCard({ id, name, category, price, image, slug }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      category,
      price,
      image,
    })

    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
      duration: 3000,
    })
  }

  return (
    <Card className="overflow-hidden">
      <Link href={`/components/${category.toLowerCase()}/${slug}`}>
        <div className="aspect-square relative">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="space-y-1">
          <Link href={`/components/${category.toLowerCase()}/${slug}`}>
            <h3 className="font-semibold hover:underline">{name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground">{category}</p>
          <p className="font-medium">${price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
