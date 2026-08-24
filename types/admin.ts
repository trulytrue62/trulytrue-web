import type { AuditFields } from "@/types/audit"

export type UserRole = "user" | "moderator" | "admin"
export type UserStatus = "active" | "banned"

export type AdminUser = AuditFields & {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
}

export type AnnouncementType = "alert" | "update" | "tip"

export type Announcement = AuditFields & {
  id: string
  title: string
  content: string
  type: AnnouncementType
  published: boolean
  attachmentName?: string
}
