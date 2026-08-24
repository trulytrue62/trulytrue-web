"use client"

import { format } from "date-fns"
import { useWatch, type UseFormReturn } from "react-hook-form"

import { DetailRow } from "@/components/ui/detail-row"
import { reportContent } from "@/data/report-content"
import { scamTypes } from "@/data/mock/scam-types"
import { detectIdentifierType, identifierTypeIcons, identifierTypeLabels } from "@/utils/identifier"
import type { ReportFormValues } from "@/schemas/report-schema"

const content = reportContent.steps.review.rows

export function StepReview({ form }: { form: UseFormReturn<ReportFormValues> }) {
  const values = useWatch({ control: form.control })
  const detected = detectIdentifierType(values.identifierValue ?? "")
  const DetectedIcon = detected ? identifierTypeIcons[detected] : null
  const scamTypeLabel = scamTypes.find((type) => type.value === values.scamType)?.label

  return (
    <div className="flex flex-col gap-1">
      <DetailRow
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
      <DetailRow label={content.scamType} value={scamTypeLabel} />
      <DetailRow label={content.description} value={values.description} />
      <DetailRow label={content.evidence} value={values.evidence?.name} />
      <DetailRow
        label={content.incidentDateTime}
        value={
          values.incidentDate
            ? `${format(values.incidentDate, "PPP")}${values.incidentTime ? ` at ${values.incidentTime}` : ""}`
            : undefined
        }
      />
    </div>
  )
}
