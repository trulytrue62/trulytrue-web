"use client"

import { format } from "date-fns"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ReportStatusBadge } from "@/components/admin/status-badge"
import { adminContent } from "@/data/admin-content"
import { scamTypeLabel } from "@/components/admin/reports/columns"
import { identifierTypeIcons } from "@/utils/identifier"
import type { AdminUser } from "@/types/admin"
import type { ScamReport } from "@/types/report"

const content = adminContent.users.dialog

export function UserDetailDialog({
  user,
  reports,
  open,
  onOpenChange,
  onSelectReport,
}: {
  user: AdminUser | null
  reports: ScamReport[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectReport: (reportId: string) => void
}) {
  if (!user) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{user.name}</DialogTitle>
          <DialogDescription>{user.email}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium text-muted-foreground">{content.reportsHeading}</p>
          {reports.length === 0 ? (
            <p className="text-sm text-muted-foreground">{content.noReports}</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {reports.map((report) => {
                const Icon = identifierTypeIcons[report.identifierType]

                return (
                  <li key={report.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onOpenChange(false)
                        onSelectReport(report.id)
                      }}
                      className="flex w-full items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <Icon className="size-4 shrink-0 text-muted-foreground" />
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate font-medium text-foreground">{report.identifierValue}</span>
                          <span className="text-xs text-muted-foreground">
                            {scamTypeLabel(report.scamType)} &middot; {format(new Date(report.createdAt), "MMM d, yyyy")}
                          </span>
                        </div>
                      </div>
                      <ReportStatusBadge status={report.status} />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
