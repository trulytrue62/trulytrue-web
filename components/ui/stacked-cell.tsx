import type { LucideIcon } from "lucide-react"

export function StackedCell({
  icon: Icon,
  primary,
  secondary,
}: {
  icon?: LucideIcon
  primary: React.ReactNode
  secondary?: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2">
      {Icon && <Icon className="size-4 shrink-0 text-muted-foreground" />}
      <div className="flex min-w-0 flex-col">
        <span className="truncate font-medium text-foreground">{primary}</span>
        {secondary && <span className="truncate text-xs text-muted-foreground">{secondary}</span>}
      </div>
    </div>
  )
}
