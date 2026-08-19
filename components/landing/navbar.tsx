"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { FlagIcon, LayoutDashboardIcon, LogInIcon } from "lucide-react"

import { Brand } from "@/components/brand"
import { Button } from "@/components/ui/button"
import { navbarContent } from "@/content/navbar"

export function LandingNavbar() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/80 px-6 py-4 backdrop-blur">
      <Link href="/">
        <Brand />
      </Link>
      <nav className="flex items-center gap-2">
        <Button
          variant="ghost"
          render={<Link href={session ? "/dashboard" : "/login"} />}
        >
          {session ? <LayoutDashboardIcon /> : <LogInIcon />}
          {session ? navbarContent.dashboardLabel : navbarContent.loginLabel}
        </Button>
        <Button render={<Link href="/report" />}>
          <FlagIcon />
          {navbarContent.reportLabel}
        </Button>
      </nav>
    </header>
  )
}
