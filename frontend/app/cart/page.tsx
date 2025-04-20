"use client"

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "../components/cart-provider"
import Header from "../components/header"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Your Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any components to your cart yet.
              </p>
              <Link href="/components">
                <Button>Browse Components</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <div className="rounded-lg border">
                  <div className="p-6 space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-24 h-24 relative">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                              <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Separator className="sm:hidden" />
                      </div>
                    ))}
                  </div>
                  <div className="p-6 border-t">
                    <Button variant="outline" onClick={clearCart}>
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <div className="rounded-lg border p-6 space-y-6 sticky top-6">
                  <h2 className="font-semibold text-lg">Order Summary</h2>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          {item.name} x {item.quantity}
                        </span>
                        <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button className="w-full">Checkout</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2024 PCBuilder. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:underline">
              About
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:underline">
              Contact
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
