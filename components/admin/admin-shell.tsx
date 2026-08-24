"use client"

import { useState } from "react"
import { FileTextIcon, MegaphoneIcon, type LucideIcon, UsersIcon } from "lucide-react"

import { AnnouncementsTable } from "@/components/admin/announcements/table"
import { applyReportDecision, type ReportDecision } from "@/components/admin/reports/decision"
import { ReportDetailDialog } from "@/components/admin/reports/report-detail-dialog"
import { ReportsTable } from "@/components/admin/reports/table"
import { UsersTable } from "@/components/admin/users/table"
import { Separator } from "@/components/ui/separator"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { adminContent } from "@/data/admin-content"
import { mockAdminReports } from "@/data/mock/admin-reports"
import type { ScamReport } from "@/types/report"

type AdminTab = "reports" | "users" | "announcements"

const ADMIN_TABS: { value: AdminTab; label: string; icon: LucideIcon }[] = [
  { value: "reports", label: adminContent.tabs.reports, icon: FileTextIcon },
  { value: "users", label: adminContent.tabs.users, icon: UsersIcon },
  { value: "announcements", label: adminContent.tabs.announcements, icon: MegaphoneIcon },
]

function AdminSidebarNav({ activeTab, onSelectTab }: { activeTab: AdminTab; onSelectTab: (tab: AdminTab) => void }) {
  const { state } = useSidebar()

  return (
    <div className="group hidden h-full shrink-0 md:block" data-collapsible={state === "collapsed" ? "icon" : ""}>
      <div className="flex h-full w-(--sidebar-width) flex-col gap-2 transition-[width] duration-200 ease-linear group-data-[collapsible=icon]:w-(--sidebar-width-icon)">
        <SidebarTrigger className="self-start" />
        <SidebarMenu>
          {ADMIN_TABS.map((tab) => (
            <SidebarMenuItem key={tab.value}>
              <SidebarMenuButton
                isActive={activeTab === tab.value}
                tooltip={tab.label}
                onClick={() => onSelectTab(tab.value)}
              >
                <tab.icon />
                <span>{tab.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>
    </div>
  )
}

export function AdminShell() {
  const [activeTab, setActiveTab] = useState<AdminTab>("reports")
  const [reports, setReports] = useState<ScamReport[]>(mockAdminReports)
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null)

  const selectedReport = reports.find((report) => report.id === selectedReportId) ?? null

  function handleDecision(reportId: string, decision: ReportDecision) {
    setReports((prev) =>
      prev.map((report) => (report.id === reportId ? applyReportDecision(report, decision) : report))
    )
  }

  return (
    <SidebarProvider defaultOpen={false} className="h-full min-h-0 w-full items-stretch gap-6">
      <AdminSidebarNav activeTab={activeTab} onSelectTab={setActiveTab} />
      <Separator orientation="vertical" className="hidden h-auto md:block" />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-hidden">
        {activeTab === "reports" && <ReportsTable reports={reports} onSelectReport={setSelectedReportId} />}
        {activeTab === "users" && <UsersTable reports={reports} onSelectReport={setSelectedReportId} />}
        {activeTab === "announcements" && <AnnouncementsTable />}
      </div>

      <ReportDetailDialog
        report={selectedReport}
        open={selectedReportId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedReportId(null)
          }
        }}
        onDecision={handleDecision}
      />
    </SidebarProvider>
  )
}
