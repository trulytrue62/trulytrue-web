import Link from "next/link"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import type { NavItem } from "@/types/nav"

function NavItemBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="soft" className="h-auto px-1.5 py-0.5 text-[10px] leading-none">
      {children}
    </Badge>
  )
}

export function NavItemLabel({
  item,
  iconClassName = "size-4",
}: {
  item: NavItem
  iconClassName?: string
}) {
  const Icon = item.icon

  return (
    <span className="flex items-center gap-1.5">
      {Icon && <Icon className={iconClassName} />}
      {item.label}
      {item.isNew && <NavItemBadge>New</NavItemBadge>}
      {item.isBeta && <NavItemBadge>Beta</NavItemBadge>}
    </span>
  )
}

function NavMegaMenuItem({ item, index }: { item: NavItem; index: number }) {
  const Icon = item.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.2, ease: "easeOut" }}
    >
      <NavigationMenuLink
        render={<Link href={item.route} />}
        className="h-full flex-col items-start justify-start gap-1.5 rounded-2xl border border-border/60 bg-muted/40 p-4 text-left hover:bg-muted focus:bg-muted focus-visible:ring-0"
      >
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          {Icon && <Icon className="size-3.5" />}
          {item.label}
        </span>
        {item.description && (
          <span className="text-base leading-snug font-semibold text-foreground">{item.description}</span>
        )}
      </NavigationMenuLink>
    </motion.div>
  )
}

export function NavDropdownMenuItem({ item }: { item: NavItem }) {
  return (
    <DropdownMenuItem render={<Link href={item.route} />}>
      <NavItemLabel item={item} />
    </DropdownMenuItem>
  )
}

function pillItemClassName(active: boolean) {
  return cn(
    "h-auto gap-1 rounded-full px-2 py-1 text-sm font-medium",
    active
      ? "bg-foreground text-background hover:bg-foreground focus:bg-foreground data-open:bg-foreground data-popup-open:bg-foreground"
      : "text-muted-foreground"
  )
}

export function NavMenuItem({ item, active = false }: { item: NavItem; active?: boolean }) {
  if (item.children?.length) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), pillItemClassName(active))}>
          <NavItemLabel item={item} />
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className="w-full p-3">
            <div className="grid grid-cols-3 gap-3">
              {item.children.map((child, index) => (
                <NavMegaMenuItem key={child.route} item={child} index={index} />
              ))}
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink render={<Link href={item.route} />} className={pillItemClassName(active)}>
        <NavItemLabel item={item} />
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}
