import { AnnouncementsFeed } from "@/components/dashboard/announcements-feed"
import { DashboardComposer } from "@/components/dashboard/dashboard-composer"
import { MostReportedCard } from "@/components/dashboard/most-reported-card"
import { MyReportsList } from "@/components/dashboard/my-reports-list"
import { RecentReportsFeed } from "@/components/dashboard/recent-reports-feed"
import { TopRegionsCard } from "@/components/dashboard/top-regions-card"
import { TrendingScamsCard } from "@/components/dashboard/trending-scams-card"
import { mockAnnouncements } from "@/data/mock/admin-announcements"
import { getMockReportsBySubmitter } from "@/data/mock/admin-reports"
import {
  getMockMostReportedIdentifiers,
  getMockRecentReports,
  getMockTopRegions,
  getMockTrendingScamTypes,
} from "@/data/mock/community"
import { currentUser } from "@/data/mock/user"

export default function DashboardPage() {
  const announcements = mockAnnouncements
    .filter((announcement) => announcement.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const myReports = getMockReportsBySubmitter(currentUser.id).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div className="grid h-full min-h-0 grid-rows-[auto_2fr_1fr] gap-6">
      <DashboardComposer />

      <div className="grid min-h-0 grid-cols-4 gap-6">
        <div className="col-span-4 min-h-0 lg:col-span-2">
          <RecentReportsFeed reports={getMockRecentReports(8)} />
        </div>
        <div className="col-span-4 grid min-h-0 grid-rows-3 gap-4 lg:col-span-2">
          <TrendingScamsCard items={getMockTrendingScamTypes()} />
          <MostReportedCard items={getMockMostReportedIdentifiers()} />
          <TopRegionsCard items={getMockTopRegions()} />
        </div>
      </div>

      <div className="grid min-h-0 grid-cols-1 gap-6 lg:grid-cols-2">
        <MyReportsList reports={myReports} />
        <AnnouncementsFeed announcements={announcements} />
      </div>
    </div>
  )
}
