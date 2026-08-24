"use client"

import { useWatch, type UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { ShineBorder } from "@/components/ui/shine-border"
import { reportContent } from "@/data/report-content"
import type { ReportFormValues } from "@/schemas/report-schema"

const content = reportContent.summary

export function ReportSummary({
  form,
  onViewSimilarReports,
}: {
  form: UseFormReturn<ReportFormValues>
  onViewSimilarReports: () => void
}) {
  const identifierValue = useWatch({ control: form.control, name: "identifierValue" })

  return (
    <div className="surface-card relative flex flex-wrap items-center justify-between gap-3 overflow-hidden px-5 py-4">
      <ShineBorder shineColor="var(--primary)" />
      <div className="flex min-w-0 items-center gap-2 text-sm">
        <span className="truncate font-medium text-foreground">{identifierValue}</span>
      </div>
      <Button variant="ghost" onClick={onViewSimilarReports}>
        {content.viewSimilarReportsButton}
      </Button>
    </div>
  )
}
