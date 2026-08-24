import { formatDistanceToNow } from "date-fns"

import { ANNOUNCEMENT_TYPE_CONFIG } from "@/components/admin/announcements/type-config"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { adminContent } from "@/data/mock/admin-content"
import { dashboardContent } from "@/data/mock/dashboard-content"
import type { Announcement } from "@/types/admin"

const content = dashboardContent.announcements
const typeContent = adminContent.announcements.type

export function AnnouncementsFeed({ announcements }: { announcements: Announcement[] }) {
  return (
    <div className="surface-card flex flex-col gap-4 p-6">
      <h2 className="text-lg font-medium text-foreground">{content.title}</h2>

      {announcements.length === 0 ? (
        <p className="text-sm text-muted-foreground">{content.empty}</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {announcements.map((announcement) => {
            const { icon: Icon, className } = ANNOUNCEMENT_TYPE_CONFIG[announcement.type]

            return (
              <li key={announcement.id} className="flex flex-col gap-1.5 border-b border-border/60 pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-foreground">{announcement.title}</span>
                  <Badge variant="soft" className={cn("shrink-0 gap-1", className)}>
                    <Icon className="size-3" />
                    {typeContent[announcement.type]}
                  </Badge>
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">{announcement.content}</p>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(announcement.createdAt), { addSuffix: true })}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
