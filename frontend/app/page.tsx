import Link from "next/link"
import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FeaturedCategories from "./components/featured-categories"
import FeaturedProducts from "./components/featured-products"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold">
            PCBuilder
          </Link>
          <div className="flex items-center gap-4">
            <div className="relative w-full max-w-sm">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search components..." className="w-full pl-8" />
            </div>
            <Link href="/cart">
              <Button variant="outline">Cart (0)</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Build Your Dream PC</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Search, compare, and build your perfect PC with our easy-to-use component picker.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/build">
                  <Button size="lg">Start Your Build</Button>
                </Link>
                <Link href="/components">
                  <Button size="lg" variant="outline">
                    Browse Components
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <FeaturedCategories />
        <FeaturedProducts />
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2024 PCBuilder. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/about" className="text-sm text-muted-foreground hover:underline">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
