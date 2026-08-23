"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { LogOutIcon, UserIcon } from "lucide-react"

import { Brand } from "@/components/brand"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { filterNavItemsByRole, loggedInNavItems, loggedOutNavItems } from "@/components/navbar/nav-items"
import { NavItemLabel, NavMenuItem } from "@/components/navbar/nav-menu-item"
import { ThemeToggle } from "@/components/navbar/theme-toggle"
import { cn } from "@/lib/utils"
import type { NavUser } from "@/types/nav"

const SCROLL_THRESHOLD = 20

const loginItem = loggedOutNavItems.find((item) => item.route === "/login")!
const reportItem = loggedOutNavItems.find((item) => item.route === "/report")!

export function Navbar({ user = null }: { user?: NavUser | null }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const visibleItems = user ? filterNavItemsByRole(loggedInNavItems, user.roles) : []

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center transition-[padding] duration-300",
        scrolled ? "px-4 pt-4" : "px-0 pt-0"
      )}
    >
      <div
        className={cn(
          "flex w-full items-center justify-between gap-6 border border-transparent bg-background backdrop-blur transition-all duration-300",
          scrolled
            ? "max-w-5xl rounded-full border-border/60 px-4 py-2 shadow-lg shadow-black/5"
            : "max-w-none rounded-none px-6 py-4 shadow-none"
        )}
      >
        <div>
          <Link href="/">
            <Brand />
          </Link>
        </div>


        {user ? (
          <>
            <nav className="hidden items-center gap-6 md:flex">
              {visibleItems.map((item) => (
                <NavMenuItem key={item.route} item={item} />
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full p-1 outline-none transition-opacity hover:opacity-80 aria-expanded:opacity-80">
                  <Avatar size="sm">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem render={<Link href="/account" />}>
                    <span className="flex items-center gap-1.5">
                      <UserIcon className="size-4" />
                      Account
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">
                    <span className="flex items-center gap-1.5">
                      <LogOutIcon className="size-4" />
                      Log out
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
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
