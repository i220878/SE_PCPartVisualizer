"use client"

import NextLink from "next/link"
import { cn } from "@/lib/utils"

interface LinkProps extends React.ComponentProps<typeof NextLink> {
  className?: string
}

const LinkComponent = ({
  href,
  className,
  children,
  ...props
}: LinkProps) => {
  return (
    <NextLink
      href={href}
      className={cn(
        "transition-colors hover:text-foreground/80",
        className
      )}
      {...props}
    >
      {children}
    </NextLink>
  )
}

export default LinkComponent