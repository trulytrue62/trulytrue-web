import { LogOutIcon, UserIcon } from "lucide-react"

import type { NavItem } from "@/types/nav"

export const accountMenuItems: NavItem[] = [
  { route: "/account", label: "Account", icon: UserIcon },
  { route: "/logout", label: "Log out", icon: LogOutIcon },
]
