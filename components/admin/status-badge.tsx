import { CircleDashedIcon, CircleHelpIcon, CircleXIcon, CircleCheckIcon, BanIcon, type LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { adminContent } from "@/data/admin-content"
import { cn } from "@/lib/utils"
import type { UserStatus } from "@/types/admin"
import type { ReportStatus } from "@/types/report"

const STATUS_CONFIG: Record<ReportStatus, { className: string; icon: LucideIcon }> = {
  pending: { className: "bg-muted text-muted-foreground", icon: CircleDashedIcon },
  verified: { className: "bg-safe/10 text-safe", icon: CircleCheckIcon },
  rejected: { className: "bg-danger/10 text-danger", icon: CircleXIcon },
  info_requested: { className: "bg-suspicious/10 text-suspicious", icon: CircleHelpIcon },
}

export function ReportStatusBadge({ status }: { status: ReportStatus }) {
  const { className, icon: Icon } = STATUS_CONFIG[status]

  return (
    <Badge variant="soft" className={cn("h-auto gap-1 px-2 py-0.5", className)}>
      <Icon className="size-3" />
      {adminContent.reports.status[status]}
    </Badge>
  )
}

const USER_STATUS_CONFIG: Record<UserStatus, { className: string; icon: LucideIcon }> = {
  active: { className: "bg-safe/10 text-safe", icon: CircleCheckIcon },
  banned: { className: "bg-danger/10 text-danger", icon: BanIcon },
}

export function UserStatusBadge({ status }: { status: UserStatus }) {
  const { className, icon: Icon } = USER_STATUS_CONFIG[status]

  return (
    <Badge variant="soft" className={cn("h-auto gap-1 px-2 py-0.5 capitalize", className)}>
      <Icon className="size-3" />
      {status}
    </Badge>
  )
}
