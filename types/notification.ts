import type { AnnouncementType } from "@/types/admin"
import type { ReportStatus } from "@/types/report"

export type Notification =
  | {
      kind: "announcement"
      id: string
      announcementId: string
      title: string
      description: string
      announcementType: AnnouncementType
      createdAt: string
      href: string
    }
  | {
      kind: "report_status"
      id: string
      reportId: string
      title: string
      description: string
      status: Exclude<ReportStatus, "pending">
      createdAt: string
      href: string
    }
