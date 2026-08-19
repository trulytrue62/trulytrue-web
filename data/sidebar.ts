import { Bot, DatabaseZap, Flag, Grid3X3, TableOfContents, Users2 } from "lucide-react"

import type { SidebarItem } from "@/types/sidebar"

export const navItems: SidebarItem[] = [
    {
    name: "---Platform",
    roles: ["user","admin"],
  },
  {
    name: "Dashboard",
    icon: Grid3X3,
    route: "/dashboard",
    roles: ["admin", "user"],
  },
  {
    name: "Check",
    icon: DatabaseZap,
    route: "/check",
    roles: ["admin", "user"],
  },
  {
    name: "Report",
    icon: Flag,
    route: "/report",
    roles: ["admin", "user"],
  },
  {
    name: "---Admin",
    roles: ["admin"],
  },
  {
    name: "Reports",
    icon: TableOfContents,
    route: "/admin/reports",
    isNew: true,
    roles: ["admin"],
  },
]
