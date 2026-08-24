import type { AuditFields } from "@/types/audit"

export type AnnouncementType = "alert" | "update" | "tip"

export type Announcement = AuditFields & {
  id: string
  title: string
  content: string
  type: AnnouncementType
  published: boolean
  attachmentName?: string
}
