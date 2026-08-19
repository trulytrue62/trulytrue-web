"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { Forbidden } from "@/components/utils"
import { data } from "@/data/sidebar"
import { findItemPath } from "@/lib/sidebar"

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  const path = findItemPath(data.navItems, pathname)
  const allowedRoles = path?.at(-1)?.roles
  const role = session?.user?.role
  const isForbidden = Boolean(
    allowedRoles && role && !allowedRoles.includes(role)
  )

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login")
    }
  }, [status, router])

  if (status === "loading" || status === "unauthenticated") {
    return null
  }

  if (isForbidden) {
    return <Forbidden />
  }

  return <>{children}</>
}
