import { mockAnnouncements } from "@/data/mock/admin-announcements"
import { dashboardContent } from "@/data/mock/dashboard-content"
import { getMockReportsBySubmitter } from "@/data/mock/admin-reports"
import type { Notification } from "@/types/notification"
import type { ReportStatus, ScamReport } from "@/types/report"

function reportStatusDescription(status: Exclude<ReportStatus, "pending">, report: ScamReport): string {
  if (status === "rejected") {
    return report.rejectionReason ?? report.identifierValue
  }
  if (status === "info_requested") {
    return report.infoRequestMessage ?? report.identifierValue
  }
  return report.identifierValue
}

export function getMockNotifications(userId: string): Notification[] {
  const announcementNotifications: Notification[] = mockAnnouncements
    .filter((announcement) => announcement.published)
    .map((announcement) => ({
      kind: "announcement",
      id: `announcement-${announcement.id}`,
      announcementId: announcement.id,
      title: announcement.title,
      description: announcement.content,
      announcementType: announcement.type,
      createdAt: announcement.createdAt,
      href: "/dashboard",
    }))

  const reportStatusNotifications: Notification[] = getMockReportsBySubmitter(userId)
    .filter((report): report is typeof report & { status: Exclude<ReportStatus, "pending"> } => report.status !== "pending")
    .map((report) => ({
      kind: "report_status",
      id: `report-status-${report.id}-${report.updatedAt}`,
      reportId: report.id,
      title: dashboardContent.notifications.reportStatusTitle[report.status],
      description: reportStatusDescription(report.status, report),
      status: report.status,
      createdAt: report.updatedAt,
      href: "/dashboard",
    }))

  return [...announcementNotifications, ...reportStatusNotifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}
