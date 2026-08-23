"use client"

import { format } from "date-fns"
import { useWatch, type UseFormReturn } from "react-hook-form"

import { scamTypes } from "@/data/scam-types"
import { detectIdentifierType, identifierTypeIcons, identifierTypeLabels } from "@/components/report-form/identifier"
import type { ReportFormValues } from "@/components/report-form/report-schema"

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
        label="Reporting"
        value={
          <span className="flex items-center justify-end gap-1.5">
            {values.identifierValue}
            {DetectedIcon && detected && (
              <span className="flex items-center gap-1 rounded-full bg-indigo-600/10 px-2 py-0.5 text-xs font-medium text-indigo-600">
                <DetectedIcon className="size-3" />
                {identifierTypeLabels[detected]}
              </span>
            )}
          </span>
        }
      />
      <ReviewRow label="Scam type" value={scamTypeLabel} />
      <ReviewRow label="Description" value={values.description} />
      <ReviewRow label="Evidence" value={values.evidence?.name} />
      <ReviewRow
        label="Incident date & time"
        value={
          values.incidentDate
            ? `${format(values.incidentDate, "PPP")}${values.incidentTime ? ` at ${values.incidentTime}` : ""}`
            : undefined
        }
      />
      <ReviewRow label="Location" value={[values.region, values.country].filter(Boolean).join(", ")} />
    </div>
  )
}
