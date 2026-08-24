"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { format } from "date-fns"
import { Maximize2Icon } from "lucide-react"

import { ReportActionsCell } from "@/components/admin/reports/actions"
import type { ReportsTableFeatures } from "@/components/admin/reports/features"
import { ReportStatusBadge } from "@/components/admin/status-badge"
import { StackedCell } from "@/components/ui/stacked-cell"
import { adminContent } from "@/data/admin-content"
import { getMockUserById } from "@/data/mock/admin-users"
import { scamTypes } from "@/data/mock/scam-types"
import { identifierTypeIcons } from "@/utils/identifier"
import type { ScamReport, ReportStatus } from "@/types/report"

const content = adminContent.reports.columns
const statusContent = adminContent.reports.status
const columnHelper = createColumnHelper<ReportsTableFeatures, ScamReport>()

export function scamTypeLabel(value: string) {
  return scamTypes.find((type) => type.value === value)?.label ?? value
}

const STATUS_FILTER_OPTIONS: { value: ReportStatus; label: string }[] = [
  { value: "pending", label: statusContent.pending },
  { value: "verified", label: statusContent.verified },
  { value: "rejected", label: statusContent.rejected },
  { value: "info_requested", label: statusContent.info_requested },
]

export function createReportColumns(onReview: (report: ScamReport) => void) {
  return columnHelper.columns([
    columnHelper.accessor("identifierValue", {
      header: content.identifier,
      sortFn: "text",
      cell: (info) => (
        <StackedCell
          icon={identifierTypeIcons[info.row.original.identifierType]}
          primary={info.getValue()}
          secondary={scamTypeLabel(info.row.original.scamType)}
        />
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
    columnHelper.accessor("region", {
      id: "location",
      header: content.location,
      sortFn: "text",
      cell: (info) => (
        <StackedCell
          primary={info.getValue()}
          secondary={getMockUserById(info.row.original.createdBy)?.email}
        />
      ),
    }),
    columnHelper.accessor("status", {
      header: content.status,
      filterFn: "equalsString",
      sortFn: "alphanumeric",
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
