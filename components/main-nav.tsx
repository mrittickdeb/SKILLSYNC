"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {}

export function MainNav({ className, ...props }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href="/startup/dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/startup/dashboard" ? "text-black" : "text-muted-foreground",
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/startup/opportunities"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/startup/opportunities" ? "text-black" : "text-muted-foreground",
        )}
      >
        Opportunities
      </Link>
      <Link
        href="/startup/applications"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/startup/applications" ? "text-black" : "text-muted-foreground",
        )}
      >
        Applications
      </Link>
      <Link
        href="/startup/messages"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/startup/messages" ? "text-black" : "text-muted-foreground",
        )}
      >
        Messages
      </Link>
      <Link
        href="/startup/analytics"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/startup/analytics" ? "text-black" : "text-muted-foreground",
        )}
      >
        Analytics
      </Link>
    </nav>
  )
}
