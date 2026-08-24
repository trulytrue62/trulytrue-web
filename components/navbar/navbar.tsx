"use client"

import { useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Brand } from "@/components/brand"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import { accountMenuItems } from "@/components/navbar/account-menu-items"
import { filterNavItemsByRole, loggedInNavItems, loggedOutNavItems } from "@/components/navbar/nav-items"
import { NavDropdownMenuItem, NavItemLabel, NavMenuItem } from "@/components/navbar/nav-menu-item"
import { ThemeToggle } from "@/components/navbar/theme-toggle"
import type { NavItem } from "@/types/nav"
import type { User } from "@/types/user"

const loginItem = loggedOutNavItems.find((item) => item.route === "/login")!
const reportItem = loggedOutNavItems.find((item) => item.route === "/report")!

function isItemActive(item: NavItem, pathname: string): boolean {
  return item.route === pathname || (item.children?.some((child) => child.route === pathname) ?? false)
}

export function Navbar({ user = null }: { user?: User | null }) {
  const pathname = usePathname()
  const pillRef = useRef<HTMLDivElement>(null)
  const visibleItems = user ? filterNavItemsByRole(loggedInNavItems, user.role) : []

  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        ref={pillRef}
        className="glass-panel mx-auto flex w-full max-w-5xl items-center justify-between gap-6 rounded-full px-3 py-2"
      >
        <div className="flex min-w-0 items-center gap-6">
          <Link href="/" className="flex shrink-0 items-center pl-1.5">
            <Brand />
          </Link>
          {user && (
            <NavigationMenu
              anchor={pillRef}
              className="hidden w-auto max-w-none flex-none justify-start md:flex"
            >
              <NavigationMenuList className="flex-none justify-start gap-2">
                {visibleItems.map((item) => (
                  <NavMenuItem key={item.route} item={item} active={isItemActive(item, pathname)} />
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>

        {user ? (
          <div className="flex shrink-0 items-center gap-1">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger className="ml-1 rounded-full outline-none ring-2 ring-transparent transition-all duration-200 hover:ring-border aria-expanded:ring-border">
                <Avatar>
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {accountMenuItems.map((item) => (
                  <NavDropdownMenuItem key={item.route} item={item} />
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-1">
            <ThemeToggle />
            <Button variant="ghost" render={<Link href={loginItem.route} />}>
              <NavItemLabel item={loginItem} />
            </Button>
            <Button render={<Link href={reportItem.route} />}>
              <NavItemLabel item={reportItem} />
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
