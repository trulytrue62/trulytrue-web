"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { format } from "date-fns"
import { AlertTriangleIcon, LightbulbIcon, Maximize2Icon, MegaphoneIcon, type LucideIcon } from "lucide-react"

import { AnnouncementActionsCell } from "@/components/admin/announcements/actions"
import type { AnnouncementsTableFeatures } from "@/components/admin/announcements/features"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { adminContent } from "@/data/mock/admin-content"
import type { Announcement, AnnouncementType } from "@/types/admin"

const content = adminContent.announcements.columns
const typeContent = adminContent.announcements.type
const statusContent = adminContent.announcements.status
const columnHelper = createColumnHelper<AnnouncementsTableFeatures, Announcement>()

const TYPE_CONFIG: Record<AnnouncementType, { icon: LucideIcon; className: string }> = {
  alert: { icon: AlertTriangleIcon, className: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  update: { icon: MegaphoneIcon, className: "bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  tip: { icon: LightbulbIcon, className: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
}

const TYPE_FILTER_OPTIONS: { value: AnnouncementType; label: string }[] = [
  { value: "alert", label: typeContent.alert },
  { value: "update", label: typeContent.update },
  { value: "tip", label: typeContent.tip },
]

const STATUS_FILTER_OPTIONS = [
  { value: "published", label: statusContent.published },
  { value: "draft", label: statusContent.draft },
]

export function createAnnouncementColumns(
  onEdit: (announcement: Announcement) => void,
  onTogglePublished: (announcement: Announcement) => void
) {
  return columnHelper.columns([
    columnHelper.accessor("title", {
      header: content.title,
      sortFn: "text",
      cell: (info) => <span className="font-medium text-foreground">{info.getValue()}</span>,
    }),
    columnHelper.accessor("content", {
      id: "description",
      header: content.description,
      enableSorting: false,
      cell: (info) => (
        <div className="flex max-w-72 items-start gap-1.5">
          <p className="line-clamp-2 text-muted-foreground">{info.getValue()}</p>
          <Maximize2Icon className="mt-0.5 size-3 shrink-0 text-muted-foreground/60" />
        </div>
      ),
    }),
    columnHelper.accessor("type", {
      header: content.type,
      enableSorting: false,
      filterFn: "equalsString",
      meta: { filterOptions: TYPE_FILTER_OPTIONS },
      cell: (info) => {
        const { icon: Icon, className } = TYPE_CONFIG[info.getValue()]
        return (
          <Badge variant="soft" className={cn("gap-1", className)}>
            <Icon className="size-3" />
            {typeContent[info.getValue()]}
          </Badge>
        )
      },
    }),
    columnHelper.accessor((row) => (row.published ? "published" : "draft"), {
      id: "publishedStatus",
      header: content.status,
      enableSorting: false,
      filterFn: "equalsString",
      meta: { filterOptions: STATUS_FILTER_OPTIONS },
      cell: (info) => (
        <Badge
          variant="soft"
          className={info.getValue() === "published" ? "bg-safe/10 text-safe" : "bg-muted text-muted-foreground"}
        >
          {info.getValue() === "published" ? statusContent.published : statusContent.draft}
        </Badge>
      ),
    }),
    columnHelper.accessor("createdAt", {
      header: content.created,
      sortFn: "datetime",
      cell: (info) => format(new Date(info.getValue()), "MMM d, yyyy"),
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => (
        <AnnouncementActionsCell
          announcement={info.row.original}
          onEdit={onEdit}
          onTogglePublished={onTogglePublished}
        />
      ),
    }),
  ])
}
