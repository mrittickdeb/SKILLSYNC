"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, Briefcase, Users, MessageSquare, BarChart3, Settings, User, Brain } from "lucide-react"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/startup/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Opportunities",
    href: "/startup/opportunities",
    icon: Briefcase,
  },
  {
    title: "Applications",
    href: "/startup/applications",
    icon: Users,
  },
  {
    title: "Messages",
    href: "/startup/messages",
    icon: MessageSquare,
  },
  {
    title: "Analytics",
    href: "/startup/analytics",
    icon: BarChart3,
  },
  {
    title: "AI Tools",
    href: "/startup/ai-tools",
    icon: Brain,
  },
  {
    title: "Profile",
    href: "/startup/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/startup/settings",
    icon: Settings,
  },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">SkillSync</h2>
          <div className="space-y-1">
            <ScrollArea className="h-[300px] px-1">
              {sidebarNavItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn("w-full justify-start", pathname === item.href && "bg-muted font-medium")}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
