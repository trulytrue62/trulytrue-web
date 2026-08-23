import Link from "next/link"

import { cn } from "@/lib/utils"
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
    <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] leading-none font-medium text-primary">
      {children}
    </span>
  )
}

export function NavItemLabel({ item }: { item: NavItem }) {
  const Icon = item.icon

  return (
    <span className="flex items-center gap-1.5">
      {Icon && <Icon className="size-4" />}
      {item.label}
      {item.isNew && <NavItemBadge>New</NavItemBadge>}
      {item.isBeta && <NavItemBadge>Beta</NavItemBadge>}
    </span>
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
          <div className="w-64 p-5">
            <p className="mb-3 text-xs font-medium text-muted-foreground">{item.label}</p>
            <ul className="flex flex-col gap-3.5">
              {item.children.map((child) => (
                <li key={child.route}>
                  <NavigationMenuLink
                    render={<Link href={child.route} />}
                    className="h-auto justify-start rounded-none bg-transparent px-2 text-sm font-medium text-foreground hover:bg-transparent hover:text-muted-foreground focus:bg-transparent focus-visible:ring-0"
                  >
                    <NavItemLabel item={child} />
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
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
