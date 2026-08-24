"use client"

import { EyeIcon } from "lucide-react"

import { RowActionsMenu } from "@/components/ui/row-actions-menu"
import { adminContent } from "@/data/admin-content"
import type { ScamReport } from "@/types/report"

export function ReportActionsCell({
  report,
  onReview,
}: {
  report: ScamReport
  onReview: (report: ScamReport) => void
}) {
  return (
    <RowActionsMenu
      actions={[
        { label: adminContent.reports.actions.review, icon: EyeIcon, onClick: () => onReview(report) },
      ]}
    />
  )
}
