import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between h-14 pl-12">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center space-x-2">
            <Cpu className="h-6 w-6" />
            <span className="font-bold">PCPartVisualizer</span>
          </Link>
        </div>
          <MainNav />
        <div className="justify-end flex items-center">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

import { Cpu } from "lucide-react"
import Link from "next/link"
