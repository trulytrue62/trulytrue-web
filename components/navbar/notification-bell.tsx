"use client"

import { useMemo, useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { BellIcon } from "lucide-react"

import { ANNOUNCEMENT_TYPE_CONFIG } from "@/components/admin/announcements/type-config"
import { ReportStatusBadge } from "@/components/admin/status-badge"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { dashboardContent } from "@/data/mock/dashboard-content"
import { getMockNotifications } from "@/data/mock/notifications"
import { cn } from "@/lib/utils"
import type { Notification } from "@/types/notification"

function NotificationRow({ notification }: { notification: Notification }) {
  return (
    <div className="flex items-start gap-2.5 rounded-2xl px-3 py-2 text-sm">
      {notification.kind === "announcement" ? (
        (() => {
          const { icon: Icon, className } = ANNOUNCEMENT_TYPE_CONFIG[notification.announcementType]
          return (
            <div className={cn("mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full", className)}>
              <Icon className="size-3.5" />
            </div>
          )
        })()
      ) : (
        <div className="mt-0.5 shrink-0">
          <ReportStatusBadge status={notification.status} />
        </div>
      )}
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="font-medium text-foreground">{notification.title}</span>
        <span className="line-clamp-2 text-xs text-muted-foreground">{notification.description}</span>
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </span>
      </div>
    </div>
  )
}

export function NotificationBell({ userId }: { userId: string }) {
  const notifications = useMemo(() => getMockNotifications(userId), [userId])
  const [readIds, setReadIds] = useState<Set<string>>(new Set())
  const unreadCount = notifications.filter((notification) => !readIds.has(notification.id)).length

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setReadIds(new Set(notifications.map((notification) => notification.id)))
        }
      }}
    >
      <DropdownMenuTrigger
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative rounded-full")}
        aria-label="Notifications"
      >
        <BellIcon />
        {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-danger" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="px-3 py-6 text-center text-sm text-muted-foreground">
            {dashboardContent.notifications.empty}
          </div>
        ) : (
          notifications.slice(0, 8).map((notification) => (
            <NotificationRow key={notification.id} notification={notification} />
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
