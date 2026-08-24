import type { AdminUser } from "@/types/admin"

function selfAudited(id: string, createdAt: string) {
  return { createdAt, createdBy: id, updatedAt: createdAt, updatedBy: id, isDeleted: false }
}

export const mockAdminUsers: AdminUser[] = [
  { id: "user-1", name: "Priya Sharma", email: "priya.sharma@example.com", role: "user", status: "active", ...selfAudited("user-1", "2026-02-14T09:00:00.000Z") },
  { id: "user-2", name: "Rahul Verma", email: "rahul.verma@example.com", role: "user", status: "active", ...selfAudited("user-2", "2026-03-02T09:00:00.000Z") },
  { id: "user-3", name: "Ayesha Khan", email: "ayesha.khan@example.com", role: "moderator", status: "active", ...selfAudited("user-3", "2026-03-19T09:00:00.000Z") },
  { id: "user-4", name: "Vikram Singh", email: "vikram.singh@example.com", role: "user", status: "active", ...selfAudited("user-4", "2026-04-07T09:00:00.000Z") },
  { id: "user-5", name: "Neha Gupta", email: "neha.gupta@example.com", role: "user", status: "banned", ...selfAudited("user-5", "2026-05-22T09:00:00.000Z") },
  { id: "user-6", name: "Arjun Nair", email: "arjun.nair@example.com", role: "user", status: "active", ...selfAudited("user-6", "2026-06-11T09:00:00.000Z") },
  { id: "user-7", name: "Sneha Reddy", email: "sneha.reddy@example.com", role: "user", status: "active", ...selfAudited("user-7", "2026-07-03T09:00:00.000Z") },
  { id: "user-8", name: "Karan Mehta", email: "karan.mehta@example.com", role: "user", status: "active", ...selfAudited("user-8", "2026-07-28T09:00:00.000Z") },
]

export function getMockUserById(id: string): AdminUser | undefined {
  return mockAdminUsers.find((user) => user.id === id)
}
