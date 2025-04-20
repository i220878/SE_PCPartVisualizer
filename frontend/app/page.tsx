import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, BookOpen, Users, HardDrive, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Build Your Dream PC with Confidence
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Design, visualize, and plan your PC build with our interactive 3D tool. Check compatibility, compare
                prices, and share your creations.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/build">
                <Button size="lg">
                  Start Building
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/guides">
                <Button variant="outline" size="lg">
                  View Guides
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <Cpu className="h-8 w-8 mb-2" />
                <CardTitle>PC Builder</CardTitle>
                <CardDescription>Search, select, and visualize components</CardDescription>
              </CardHeader>
              <CardContent>
                Build your PC with our interactive tool. Check compatibility, compare prices, and see your build in 3D.
              </CardContent>
              <CardFooter>
                <Link href="/build">
                  <Button variant="outline">Start Building</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 mb-2" />
                <CardTitle>Build Guides</CardTitle>
                <CardDescription>Step-by-step assembly instructions</CardDescription>
              </CardHeader>
              <CardContent>
                Follow our detailed guides to assemble your PC. Learn tips and tricks from experts.
              </CardContent>
              <CardFooter>
                <Link href="/guides">
                  <Button variant="outline">View Guides</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 mb-2" />
                <CardTitle>Community Builds</CardTitle>
                <CardDescription>Explore builds from other users</CardDescription>
              </CardHeader>
              <CardContent>
                Get inspired by builds from the community. Share your own builds and get feedback.
              </CardContent>
              <CardFooter>
                <Link href="/community">
                  <Button variant="outline">Explore Builds</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <HardDrive className="h-8 w-8 mb-2" />
                <CardTitle>Parts Database</CardTitle>
                <CardDescription>Comprehensive component information</CardDescription>
              </CardHeader>
              <CardContent>
                Browse our extensive database of PC components. Read reviews and compare specifications.
              </CardContent>
              <CardFooter>
                <Link href="/parts">
                  <Button variant="outline">Browse Parts</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Build Your PC?</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Start building your dream PC today with our interactive tool.
              </p>
            </div>
            <Link href="/build">
              <Button size="lg">
                Start Building Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
