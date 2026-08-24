"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SimilarReportsSidebar } from "@/components/report-form/similar-reports-sidebar"

export function SimilarReportsDialog({
  identifierValue,
  open,
  onOpenChange,
  title,
}: {
  identifierValue: string
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <SimilarReportsSidebar identifierValue={identifierValue} />
      </DialogContent>
    </Dialog>
  )
}
