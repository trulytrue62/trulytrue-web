"use client"

import { format } from "date-fns"
import { useWatch, type UseFormReturn } from "react-hook-form"

import { reportContent } from "@/data/report-content"
import { scamTypes } from "@/data/mock/scam-types"
import { detectIdentifierType, identifierTypeIcons, identifierTypeLabels } from "@/utils/identifier"
import type { ReportFormValues } from "@/schemas/report-schema"

const content = reportContent.steps.review.rows

function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/60 py-3 last:border-b-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="max-w-[60%] text-right text-sm font-medium text-foreground">
        {value || "—"}
      </span>
    </div>
  )
}

export function StepReview({ form }: { form: UseFormReturn<ReportFormValues> }) {
  const values = useWatch({ control: form.control })
  const detected = detectIdentifierType(values.identifierValue ?? "")
  const DetectedIcon = detected ? identifierTypeIcons[detected] : null
  const scamTypeLabel = scamTypes.find((type) => type.value === values.scamType)?.label

  return (
    <div className="flex flex-col gap-1">
      <ReviewRow
        label={content.reporting}
        value={
          <span className="flex items-center justify-end gap-1.5">
            {values.identifierValue}
            {DetectedIcon && detected && (
              <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                <DetectedIcon className="size-3" />
                {identifierTypeLabels[detected]}
              </span>
            )}
          </span>
        }
      />
      <ReviewRow label={content.scamType} value={scamTypeLabel} />
      <ReviewRow label={content.description} value={values.description} />
      <ReviewRow label={content.evidence} value={values.evidence?.name} />
      <ReviewRow
        label={content.incidentDateTime}
        value={
          values.incidentDate
            ? `${format(values.incidentDate, "PPP")}${values.incidentTime ? ` at ${values.incidentTime}` : ""}`
            : undefined
        }
      />
      <ReviewRow
        label={content.location}
        value={[values.region, values.country].filter(Boolean).join(", ")}
      />
    </div>
  )
}
