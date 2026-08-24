"use client"

import { EyeIcon, EyeOffIcon, PencilIcon } from "lucide-react"

import { RowActionsMenu, type RowAction } from "@/components/ui/row-actions-menu"
import { adminContent } from "@/data/admin-content"
import type { Announcement } from "@/types/admin"

export function AnnouncementActionsCell({
  announcement,
  onEdit,
  onTogglePublished,
}: {
  announcement: Announcement
  onEdit: (announcement: Announcement) => void
  onTogglePublished: (announcement: Announcement) => void
}) {
  const content = adminContent.announcements.actions

  const actions: RowAction[] = [
    { label: content.edit, icon: PencilIcon, onClick: () => onEdit(announcement) },
    {
      label: announcement.published ? content.unpublish : content.publish,
      icon: announcement.published ? EyeOffIcon : EyeIcon,
      onClick: () => onTogglePublished(announcement),
    },
  ]

  return <RowActionsMenu actions={actions} />
}
