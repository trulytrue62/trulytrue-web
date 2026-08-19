"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"

import { Brand } from "@/components/brand"
import { Button } from "@/components/ui/button"

export function LandingNavbar() {
  const { data: session } = useSession()

  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <Link href="/">
        <Brand />
      </Link>
      <nav className="flex items-center gap-2">
        <Button
          variant="ghost"
          render={<Link href={session ? "/dashboard" : "/login"} />}
        >
          {session ? "Dashboard" : "Login"}
        </Button>
        <Button render={<Link href="/report" />}>Report</Button>
      </nav>
    </header>
  )
}
