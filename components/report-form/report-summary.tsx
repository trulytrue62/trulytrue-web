"use client"

import { useWatch, type UseFormReturn } from "react-hook-form"

import { ShimmerButton } from "@/components/ui/shimmer-button"
import { ShineBorder } from "@/components/ui/shine-border"
import { detectIdentifierType, identifierTypeIcons, identifierTypeLabels } from "@/components/report-form/identifier"
import type { ReportFormValues } from "@/components/report-form/report-schema"

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
      <ShineBorder shineColor={["#6366f1", "#a5b4fc"]} />
      <div className="flex min-w-0 items-center gap-2 text-sm">
        <span className="shrink-0 text-muted-foreground">Reporting</span>
        {Icon && <Icon className="size-4 shrink-0 text-indigo-600" />}
        <span className="truncate font-medium text-foreground">{identifierValue}</span>
        {detected && (
          <span className="shrink-0 rounded-full bg-indigo-600/10 px-2 py-0.5 text-xs font-medium text-indigo-600">
            {identifierTypeLabels[detected]}
          </span>
        )}
      </div>
      <ShimmerButton
        type="button"
        onClick={onViewSimilarReports}
        background="#4f46e5"
        shimmerColor="#c7d2fe"
        className="px-4 py-2 text-xs"
      >
        View similar reports
      </ShimmerButton>
    </div>
  )
}
