import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground",
        className
      )}
    >
      <span className="text-lg font-bold leading-none">T</span>
      <span className="-ml-1 text-xs font-bold leading-none">T</span>
    </div>
  )
}

export function Brand({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Logo />
      <span className="truncate text-sm font-medium">TruelyTrue</span>
    </div>
  )
}
