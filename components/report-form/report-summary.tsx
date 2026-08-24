"use client"

import { SearchIcon } from "lucide-react"
import { useWatch, type UseFormReturn } from "react-hook-form"

import { ShineBorder } from "@/components/ui/shine-border"
import { reportContent } from "@/data/mock/report-content"
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
    <button
      type="button"
      onClick={onViewSimilarReports}
      className="surface-card relative flex w-full items-center justify-between gap-3 overflow-hidden px-5 py-4 text-left text-sm transition-colors hover:bg-muted max-w-xl"
    >
      <ShineBorder shineColor='blue' />
      <span className="min-w-0 truncate font-medium text-foreground">{identifierValue}</span>
      <span className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
        <SearchIcon className="size-4" />
        {content.viewSimilarReportsButton}
      </span>
    </button>
  )
}
