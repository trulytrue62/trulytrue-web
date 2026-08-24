"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { format } from "date-fns"
import { AlertTriangleIcon, LightbulbIcon, Maximize2Icon, MegaphoneIcon, type LucideIcon } from "lucide-react"

import { AnnouncementActionsCell } from "@/components/admin/announcements/actions"
import type { AnnouncementsTableFeatures } from "@/components/admin/announcements/features"
import { Badge, type badgeVariants } from "@/components/ui/badge"
import { adminContent } from "@/data/admin-content"
import type { Announcement, AnnouncementType } from "@/types/admin"
import type { VariantProps } from "class-variance-authority"

const content = adminContent.announcements.columns
const typeContent = adminContent.announcements.type
const statusContent = adminContent.announcements.status
const columnHelper = createColumnHelper<AnnouncementsTableFeatures, Announcement>()

const TYPE_CONFIG: Record<AnnouncementType, { icon: LucideIcon; variant: VariantProps<typeof badgeVariants>["variant"] }> = {
  alert: { icon: AlertTriangleIcon, variant: "outline" },
  update: { icon: MegaphoneIcon, variant: "soft" },
  tip: { icon: LightbulbIcon, variant: "secondary" },
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
      filterFn: "equalsString",
      sortFn: "alphanumeric",
      meta: { filterOptions: TYPE_FILTER_OPTIONS },
      cell: (info) => {
        const { icon: Icon, variant } = TYPE_CONFIG[info.getValue()]
        return (
          <Badge variant={variant} className="gap-1">
            <Icon className="size-3" />
            {typeContent[info.getValue()]}
          </Badge>
        )
      },
    }),
    columnHelper.accessor((row) => (row.published ? "published" : "draft"), {
      id: "publishedStatus",
      header: content.status,
      filterFn: "equalsString",
      sortFn: "alphanumeric",
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
