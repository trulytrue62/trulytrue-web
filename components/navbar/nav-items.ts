import type { NavItem } from "@/types/nav"

export const loggedOutNavItems: NavItem[] = [
  { route: "/login", label: "Login" },
  { route: "/report", label: "Report a scam" },
]

export const loggedInNavItems: NavItem[] = [
  { route: "/dashboard", label: "Trends" },
  { route: "/check", label: "Check" },
  { route: "/report", label: "Report" },
  { route: "/admin", label: "Admin", roles: ["admin"] },
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
