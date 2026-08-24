"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { format } from "date-fns"
import { Maximize2Icon } from "lucide-react"

import { ReportActionsCell } from "@/components/admin/reports/actions"
import type { ReportsTableFeatures } from "@/components/admin/reports/features"
import { ReportStatusBadge } from "@/components/admin/status-badge"
import { StackedCell } from "@/components/ui/stacked-cell"
import { adminContent } from "@/data/mock/admin-content"
import { getMockUserById } from "@/data/mock/admin-users"
import { mockAdminReports } from "@/data/mock/admin-reports"
import { identifierTypeIcons, identifierTypeLabels } from "@/utils/identifier"
import type { IdentifierType, ScamReport, ReportStatus } from "@/types/report"

const content = adminContent.reports.columns
const statusContent = adminContent.reports.status
const columnHelper = createColumnHelper<ReportsTableFeatures, ScamReport>()

const STATUS_FILTER_OPTIONS: { value: ReportStatus; label: string }[] = [
  { value: "pending", label: statusContent.pending },
  { value: "verified", label: statusContent.verified },
  { value: "rejected", label: statusContent.rejected },
  { value: "info_requested", label: statusContent.info_requested },
]

const IDENTIFIER_TYPE_FILTER_OPTIONS: { value: IdentifierType; label: string }[] = [
  { value: "phone", label: identifierTypeLabels.phone },
  { value: "url", label: identifierTypeLabels.url },
  { value: "email", label: identifierTypeLabels.email },
  { value: "upi", label: identifierTypeLabels.upi },
  { value: "text", label: identifierTypeLabels.text },
]

const REGION_FILTER_OPTIONS: { value: string; label: string }[] = [
  ...new Set(mockAdminReports.map((report) => report.region)),
]
  .sort((a, b) => a.localeCompare(b))
  .map((region) => ({ value: region, label: region }))

export function createReportColumns(onReview: (report: ScamReport) => void) {
  return columnHelper.columns([
    columnHelper.accessor((row) => row.identifierType, {
      id: "identifierType",
      header: content.identifier,
      enableSorting: false,
      filterFn: "equalsString",
      meta: { filterOptions: IDENTIFIER_TYPE_FILTER_OPTIONS },
      cell: (info) =>  <StackedCell
          icon={identifierTypeIcons[info.row.original.identifierType]}
          primary={info.row.original.identifierValue}
        
        />
    }),

    columnHelper.accessor("region", {
      header: content.region,
      sortFn: "text",
      filterFn: "equalsString",
      meta: { filterOptions: REGION_FILTER_OPTIONS },
      cell: (info) => (
        <div className="flex items-start">
          <p className="line-clamp-2 text-muted-foreground">{info.getValue()}</p>
        </div>
      ),
    }),
    columnHelper.accessor("description", {
      header: content.description,
      enableSorting: false,
      cell: (info) => (
        <div className="flex max-w-72 items-start gap-1.5">
          <p className="line-clamp-2 text-muted-foreground">{info.getValue()}</p>
          <Maximize2Icon className="mt-0.5 size-3 shrink-0 text-muted-foreground/60" />
        </div>
      ),
    }),
    columnHelper.accessor("createdBy", {
      id: "reportedBy",
      header: content.submittedBy,
      sortFn: "text",
      cell: (info) => {
        const submitter = getMockUserById(info.getValue())
        return <StackedCell primary={submitter?.name ?? "Unknown"} secondary={submitter?.email} />
      },
    }),
    columnHelper.accessor("status", {
      header: content.status,
      enableSorting: false,
      filterFn: "equalsString",
      meta: { filterOptions: STATUS_FILTER_OPTIONS },
      cell: (info) => <ReportStatusBadge status={info.getValue()} />,
    }),
    columnHelper.accessor("createdAt", {
      header: content.submitted,
      sortFn: "datetime",
      cell: (info) => format(new Date(info.getValue()), "MMM d, yyyy"),
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => <ReportActionsCell report={info.row.original} onReview={onReview} />,
    }),
  ])
}
