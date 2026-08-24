"use client"

import Image from "next/image"
import { useTheme } from "next-themes"

import logo from "@/public/logo.png"
import logoDark from "@/public/logo-dark.png"

export function AssistantAvatar() {
  const { resolvedTheme } = useTheme()

  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
      <Image src={resolvedTheme === "dark" ? logoDark : logo} alt="Assistant" className="size-5" />
    </div>
  )
}
