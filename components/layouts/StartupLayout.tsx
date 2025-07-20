"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserNav } from "@/components/user-nav"
import {
  LayoutDashboard,
  Briefcase,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  User,
  Building,
  Brain,
  Rocket,
} from "lucide-react"

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
    icon: Building,
  },
  {
    title: "Settings",
    href: "/startup/settings",
    icon: Settings,
  },
]

interface StartupLayoutProps {
  children: ReactNode
}

export function StartupLayout({ children }: StartupLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50 bg-gray-900">
        <div className="flex items-center px-6 py-4">
          <Link href="/startup/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SkillSync</span>
          </Link>
        </div>

        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1">
            {sidebarNavItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-white hover:text-white hover:bg-gray-800",
                    pathname === item.href && "bg-gray-800 text-white",
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3 text-white">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">TechFlow AI</p>
              <p className="text-xs text-gray-400">Startup Account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">
                {sidebarNavItems.find((item) => item.href === pathname)?.title || "Dashboard"}
              </h1>
            </div>
            <UserNav />
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
