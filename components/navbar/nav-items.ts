import {
  FileTextIcon,
  FlagIcon,
  LogInIcon,
  MegaphoneIcon,
  UsersIcon,
} from "lucide-react"

import type { NavItem } from "@/types/nav"

export const loggedOutNavItems: NavItem[] = [
  { route: "/login", label: "Login" },
  { route: "/report", label: "Report a scam" },
]

export const loggedInNavItems: NavItem[] = [
  { route: "/dashboard", label: "Dashboard"},
  { route: "/check", label: "Check"},
    { route: "/report", label: "Report"},
  {
    route: "/admin",
    label: "Admin",
    roles: ["admin"],
    children: [
      { route: "/admin/reports", label: "Reports", icon: FileTextIcon },
      { route: "/admin/users", label: "Users", icon: UsersIcon },
      { route: "/admin/announcements", label: "Announcements", icon: MegaphoneIcon },
    ],
  },
]

export function filterNavItemsByRole(
  items: NavItem[],
  userRoles?: string[]
): NavItem[] {
  return items
    .filter((item) => !item.roles || item.roles.some((role) => userRoles?.includes(role)))
    .map((item) =>
      item.children
        ? { ...item, children: filterNavItemsByRole(item.children, userRoles) }
        : item
    )
}
