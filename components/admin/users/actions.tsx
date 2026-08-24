"use client"

import { BanIcon, UserCheckIcon } from "lucide-react"

import { RowActionsMenu, type RowAction } from "@/components/ui/row-actions-menu"
import type { User } from "@/types/user"

export function UserActionsCell({
  user,
  onToggleBanned,
}: {
  user: User
  onToggleBanned: (user: User) => void
}) {
  const actions: RowAction[] = [
    {
      label: user.status === "banned" ? "Activate user" : "Deactivate user",
      icon: user.status === "banned" ? UserCheckIcon : BanIcon,
      onClick: () => onToggleBanned(user),
      variant: user.status === "banned" ? "default" : "destructive",
    },
  ]

  return <RowActionsMenu actions={actions} />
}
