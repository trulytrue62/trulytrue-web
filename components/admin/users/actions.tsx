"use client"

import { BanIcon, ShieldIcon, UserCheckIcon } from "lucide-react"

import { RowActionsMenu, type RowAction } from "@/components/ui/row-actions-menu"
import type { AdminUser, UserRole } from "@/types/admin"

const ROLE_LABELS: Record<UserRole, string> = {
  user: "User",
  moderator: "Moderator",
  admin: "Admin",
}

export function UserActionsCell({
  user,
  onToggleBanned,
  onChangeRole,
}: {
  user: AdminUser
  onToggleBanned: (user: AdminUser) => void
  onChangeRole: (user: AdminUser, role: UserRole) => void
}) {
  const roleActions: RowAction[] = (Object.keys(ROLE_LABELS) as UserRole[])
    .filter((role) => role !== user.role)
    .map((role) => ({
      label: `Make ${ROLE_LABELS[role]}`,
      icon: ShieldIcon,
      onClick: () => onChangeRole(user, role),
    }))

  const actions: RowAction[] = [
    ...roleActions,
    {
      label: user.status === "banned" ? "Unban user" : "Ban user",
      icon: user.status === "banned" ? UserCheckIcon : BanIcon,
      onClick: () => onToggleBanned(user),
      variant: user.status === "banned" ? "default" : "destructive",
    },
  ]

  return <RowActionsMenu actions={actions} />
}
