import { format } from "date-fns"

import { ReportStatusBadge } from "@/components/admin/status-badge"
import { StackedCell } from "@/components/ui/stacked-cell"
import { dashboardContent } from "@/data/mock/dashboard-content"
import { identifierTypeIcons } from "@/utils/identifier"
import type { ScamReport } from "@/types/report"

const content = dashboardContent.myReports

export function MyReportsList({ reports }: { reports: ScamReport[] }) {
  return (
    <div className="glass-panel flex h-full min-h-0 flex-col gap-4 overflow-hidden rounded-3xl p-6">
      <h2 className="shrink-0 text-lg font-medium text-foreground">{content.title}</h2>

      {reports.length === 0 ? (
        <p className="text-sm text-muted-foreground">{content.empty}</p>
      ) : (
        <ul className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
          {reports.map((report) => (
            <li
              key={report.id}
              className="flex flex-col gap-1.5 border-b border-border/60 pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center justify-between gap-3">
                <StackedCell
                  icon={identifierTypeIcons[report.identifierType]}
                  primary={report.identifierValue}
                  secondary={report.region}
                />
                <ReportStatusBadge status={report.status} />
              </div>
              {report.rejectionReason && (
                <p className="text-xs text-muted-foreground">{report.rejectionReason}</p>
              )}
              {report.infoRequestMessage && (
                <p className="text-xs text-muted-foreground">{report.infoRequestMessage}</p>
              )}
              <span className="text-xs text-muted-foreground">
                {format(new Date(report.createdAt), "MMM d, yyyy")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
