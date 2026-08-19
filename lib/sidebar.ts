import type { SidebarItem } from "@/types/sidebar"

export function findItemPath(
  items: SidebarItem[],
  pathname: string
): SidebarItem[] | null {
  for (const item of items) {
    if (item.route === pathname) {
      return [item]
    }

    if (item.items) {
      const childPath = findItemPath(item.items, pathname)
      if (childPath) {
        return [item, ...childPath]
      }
    }
  }

  return null
}
