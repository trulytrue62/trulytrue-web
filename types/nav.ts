import type { LucideIcon } from "lucide-react"

export type NavItem = {
  route: string
  label: string
  icon?: LucideIcon
  isNew?: boolean
  isBeta?: boolean
  roles?: string[]
  children?: NavItem[]
}

export type NavUser = {
  name: string
  image?: string
  roles?: string[]
}
