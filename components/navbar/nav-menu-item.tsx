import Link from "next/link"
import { ChevronDownIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
    <span className="flex items-center gap-1.5 hover:cursor-pointer">
      {Icon && <Icon className="size-4" />}
      {item.label}
      {item.isNew && <NavItemBadge>New</NavItemBadge>}
      {item.isBeta && <NavItemBadge>Beta</NavItemBadge>}
    </span>
  )
}

export function NavDropdownMenuItem({ item }: { item: NavItem }) {
  return (
    <DropdownMenuItem render={<Link href={item.route} />} className=''>
      <NavItemLabel item={item} />
    </DropdownMenuItem>
  )
}

export function NavMenuItem({ item }: { item: NavItem }) {
  if (item.children?.length) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground outline-none hover:text-foreground aria-expanded:text-foreground hover:bg-muted p-1 rounded-xl">
          <NavItemLabel item={item} />
          <ChevronDownIcon className="size-3.5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {item.children.map((child) => (
            <NavDropdownMenuItem key={child.route} item={child} />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Link
      href={item.route}
      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted p-1 rounded-xl"
    >
      <NavItemLabel item={item} />
    </Link>
  )
}
