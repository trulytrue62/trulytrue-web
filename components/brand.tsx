import { cn } from "@/lib/utils"
import { siteContent } from "@/content/site"
import Image from "next/image"
import logo from '@/public/logo.png'



export function Brand({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image src = {logo} alt="Logo" className="h-8 w-8"/>
      <span className="truncate text-sm font-medium">{siteContent.name}</span>
    </div>
  )
}
