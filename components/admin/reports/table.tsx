"use client"

import { useMemo, useState } from "react"

import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { createReportColumns, scamTypeLabel } from "@/components/admin/reports/columns"
import { features } from "@/components/admin/reports/features"
import { DataTable } from "@/components/ui/data-table"
import { adminContent } from "@/data/admin-content"
import { getMockUserById } from "@/data/mock/admin-users"
import type { ScamReport } from "@/types/report"

const content = adminContent.reports

export function ReportsTable({
  reports,
  onSelectReport,
}: {
  reports: ScamReport[]
  onSelectReport: (reportId: string) => void
}) {
  const [search, setSearch] = useState("")

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) {
      return reports
    }
    return reports.filter((report) => {
      const submitterName = getMockUserById(report.createdBy)?.name ?? ""
      return [report.identifierValue, scamTypeLabel(report.scamType), report.region, submitterName]
        .join(" ")
        .toLowerCase()
        .includes(query)
    })
  }, [reports, search])

  const columns = useMemo(() => createReportColumns((report) => onSelectReport(report.id)), [onSelectReport])

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <AdminPageHeader
        title={content.title}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder={content.searchPlaceholder}
      />

      <div className="min-h-0 flex-1">
        <DataTable
          features={features}
          columns={columns}
          data={filteredReports}
          altRows
          emptyMessage={content.empty}
          onRowClick={(report) => onSelectReport(report.id)}
        />
      </div>
    </div>
  )
}
