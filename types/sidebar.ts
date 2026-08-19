import type { ElementType } from "react"

import type { Role } from "@/types/auth"

export type SidebarItem = {
  name: string
  icon?: ElementType
  route?: string
  isNew?: boolean
  roles: Role[]
  items?: SidebarItem[]
  separatorAfter?: boolean
}
