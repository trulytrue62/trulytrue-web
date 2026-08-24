"use client"

import { useMemo, useState } from "react"
import { format, formatDistanceToNow } from "date-fns"
import { BellIcon } from "lucide-react"

import { ANNOUNCEMENT_TYPE_CONFIG } from "@/components/admin/announcements/type-config"
import { ReportStatusBadge } from "@/components/admin/status-badge"
import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { dashboardContent } from "@/data/mock/dashboard-content"
import { getMockNotifications } from "@/data/mock/notifications"
import { cn } from "@/lib/utils"
import type { Notification } from "@/types/notification"

function NotificationIcon({ notification }: { notification: Notification }) {
  if (notification.kind === "announcement") {
    const { icon: Icon, className } = ANNOUNCEMENT_TYPE_CONFIG[notification.announcementType]
    return (
      <div className={cn("flex size-7 shrink-0 items-center justify-center rounded-full", className)}>
        <Icon className="size-3.5" />
      </div>
    )
  }

  return <ReportStatusBadge status={notification.status} />
}

function NotificationRow({
  notification,
  onSelect,
}: {
  notification: Notification
  onSelect: (notification: Notification) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(notification)}
      className="flex w-full cursor-pointer flex-col items-start gap-1.5 rounded-2xl p-2.5 text-left text-sm transition-colors hover:bg-muted/60"
    >
      <NotificationIcon notification={notification} />
      <span className="font-medium text-foreground">{notification.title}</span>
      <span className="line-clamp-2 text-xs text-muted-foreground">{notification.description}</span>
      <span className="text-xs text-muted-foreground">
        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
      </span>
    </button>
  )
}

export function NotificationBell({ userId }: { userId: string }) {
  const notifications = useMemo(() => getMockNotifications(userId), [userId])
  const [readIds, setReadIds] = useState<Set<string>>(new Set())
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Notification | null>(null)
  const unreadCount = notifications.filter((notification) => !readIds.has(notification.id)).length

  return (
    <>
      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen)
          if (nextOpen) {
            setReadIds(new Set(notifications.map((notification) => notification.id)))
          }
        }}
      >
        <PopoverTrigger
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative rounded-full")}
          aria-label="Notifications"
        >
          <BellIcon />
          {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-danger" />}
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 gap-3 p-3">
          <span className="px-1 text-sm font-medium text-foreground">Notifications</span>
          <Separator />
          {notifications.length === 0 ? (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              {dashboardContent.notifications.empty}
            </div>
          ) : (
            <ul className="flex max-h-96 flex-col gap-1 overflow-y-auto">
              {notifications.slice(0, 8).map((notification) => (
                <li key={notification.id}>
                  <NotificationRow
                    notification={notification}
                    onSelect={(selectedNotification) => {
                      setSelected(selectedNotification)
                      setOpen(false)
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
        </PopoverContent>
      </Popover>

      <Dialog open={selected !== null} onOpenChange={(nextOpen) => !nextOpen && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2.5">
                  <NotificationIcon notification={selected} />
                  <DialogTitle>{selected.title}</DialogTitle>
                </div>
                <DialogDescription>{format(new Date(selected.createdAt), "MMM d, yyyy 'at' h:mm a")}</DialogDescription>
              </DialogHeader>
              <p className="text-sm text-foreground">{selected.description}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
