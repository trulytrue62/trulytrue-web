import { currentUser } from "@/data/mock/user"
import { createAuditFields } from "@/types/audit"
import type { Announcement } from "@/types/admin"

export const mockAnnouncements: Announcement[] = [
  {
    id: "announcement-1",
    title: "New UPI scam pattern trending in Bihar",
    content:
      "We're seeing a spike in fake refund requests via UPI collect requests impersonating bank support. Remind users to never approve a collect request they didn't initiate.",
    type: "alert",
    published: true,
    ...createAuditFields(currentUser.id, "2026-08-18T09:00:00.000Z"),
  },
  {
    id: "announcement-2",
    title: "Screenshot uploads now supported in Check",
    content: "You can now attach a screenshot directly in the Check chat instead of only pasting text.",
    type: "update",
    published: true,
    ...createAuditFields(currentUser.id, "2026-08-10T09:00:00.000Z"),
  },
  {
    id: "announcement-3",
    title: "Tip: verify before you approve",
    content: "A community report alone doesn't confirm a scam. Always check the evidence and reasons before trusting a verdict.",
    type: "tip",
    published: false,
    ...createAuditFields(currentUser.id, "2026-08-05T09:00:00.000Z"),
  },
]
