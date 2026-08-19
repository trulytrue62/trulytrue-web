import { Bot, Settings2, SquareTerminal, Users2 } from "lucide-react"

import type { SidebarItem } from "@/types/sidebar"

export const navItems: SidebarItem[] = [
  {
    name: "Home",
    icon: SquareTerminal,
    route: "/",
    roles: ["admin", "user"],

  },
  {
    name: "---Admin",
    roles: ["admin"],
  },
  {
    name: "Users",
    icon: Users2,
    route: "/admin/users",
    isNew: true,
    roles: ["admin"],
  },
]
