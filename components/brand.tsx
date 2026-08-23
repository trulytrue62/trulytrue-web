import Image from "next/image"

import { cn } from "@/lib/utils"
import logo from "@/public/logo.png"
import darkLogo from "@/public/logo-dark.png"
import { useTheme } from "next-themes"

export function Brand({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme()

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image src= {resolvedTheme === 'dark' ? darkLogo : logo} alt="Logo" className="h-8 w-8" />
      {/* <span className="truncate text-sm font-medium">TrulyTrue</span> */}
    </div>
  )
}
