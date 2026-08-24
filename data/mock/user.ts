import type { User } from "@/types/user"

const JOINED_AT = "2026-01-01T09:00:00.000Z"

export const currentUser: User = {
  id: "admin-current",
  name: "l1n3ar l1n3ar",
  email: "l1n3ar@truly-true.app",
  role: "admin",
  status: "active",
  createdAt: JOINED_AT,
  createdBy: "admin-current",
  updatedAt: JOINED_AT,
  updatedBy: "admin-current",
  isDeleted: false,
}
