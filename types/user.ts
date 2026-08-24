import type { AuditFields } from "@/types/audit"

export type UserRole = "user" | "moderator" | "admin"
export type UserStatus = "active" | "banned"

export type User = AuditFields & {
  id: string
  name: string
  email: string
  image?: string
  role: UserRole
  status: UserStatus
}
