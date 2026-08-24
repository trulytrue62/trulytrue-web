"use client"

import { MoreVerticalIcon, type LucideIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type RowAction = {
  label: string
  icon: LucideIcon
  onClick: () => void
  variant?: "default" | "destructive"
}

export function RowActionsMenu({ actions }: { actions: RowAction[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
        aria-label="More actions"
        onClick={(event: React.MouseEvent) => event.stopPropagation()}
      >
        <MoreVerticalIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action) => (
          <DropdownMenuItem key={action.label} variant={action.variant} onClick={action.onClick}>
            <action.icon className="size-4" />
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
