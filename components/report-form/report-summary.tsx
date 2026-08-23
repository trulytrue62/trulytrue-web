"use client"

import { useWatch, type UseFormReturn } from "react-hook-form"

import { ShimmerButton } from "@/components/ui/shimmer-button"
import { ShineBorder } from "@/components/ui/shine-border"
import { reportContent } from "@/data/report-content"
import { detectIdentifierType, identifierTypeIcons, identifierTypeLabels } from "@/utils/identifier"
import type { ReportFormValues } from "@/schemas/report-schema"
import { Button } from "../ui/button"

const content = reportContent.summary

export function ReportSummary({
  form,
  onViewSimilarReports,
}: {
  form: UseFormReturn<ReportFormValues>
  onViewSimilarReports: () => void
}) {
  const identifierValue = useWatch({ control: form.control, name: "identifierValue" })
  const detected = detectIdentifierType(identifierValue ?? "")
  const Icon = detected ? identifierTypeIcons[detected] : null

  return (
    <div className="relative flex flex-wrap items-center justify-between gap-3 overflow-hidden rounded-3xl border border-border/60 bg-card px-5 py-4">
      <ShineBorder shineColor="var(--primary)" />
      <div className="flex min-w-0 items-center gap-2 text-sm">
        {/* <span className="shrink-0 text-muted-foreground">{content.reportingLabel}</span> */}
        {/* {Icon && <Icon className="size-4 shrink-0 text-primary" />} */}
        <span className="truncate font-medium text-foreground">{identifierValue}</span>
        {/* {detected && (
          <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {identifierTypeLabels[detected]}
          </span>
        )} */}
      </div>
      <Button variant='ghost'  onClick={onViewSimilarReports}> {content.viewSimilarReportsButton} </Button>
    </div>
  )
}
