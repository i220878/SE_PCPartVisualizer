"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Cpu, BookOpen, Users, HardDrive, HelpCircle } from "lucide-react"

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Build",
    href: "/build",
    icon: Cpu,
  },
  {
    name: "Guides",
    href: "/guides",
    icon: BookOpen,
  },
  {
    name: "Community",
    href: "/community",
    icon: Users,
  },
  {
    name: "Parts",
    href: "/parts",
    icon: HardDrive,
  },
  {
    name: "Help",
    href: "/help",
    icon: HelpCircle,
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "text-primary" : "text-muted-foreground",
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
