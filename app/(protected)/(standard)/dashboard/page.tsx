import { AnnouncementsFeed } from "@/components/dashboard/announcements-feed"
import { MyReportsList } from "@/components/dashboard/my-reports-list"
import { mockAnnouncements } from "@/data/mock/admin-announcements"
import { getMockReportsBySubmitter } from "@/data/mock/admin-reports"
import { currentUser } from "@/data/mock/user"
import { dashboardContent } from "@/data/mock/dashboard-content"

export default function DashboardPage() {
  const announcements = mockAnnouncements
    .filter((announcement) => announcement.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const myReports = getMockReportsBySubmitter(currentUser.id).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-medium text-foreground">{dashboardContent.page.title}</h1>
        <p className="text-sm text-muted-foreground">{dashboardContent.page.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnnouncementsFeed announcements={announcements} />
        <MyReportsList reports={myReports} />
      </div>
    </div>
  )
}
