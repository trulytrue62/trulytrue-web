"use client"

import type { UseFormReturn } from "react-hook-form"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { FileUpload } from "@/components/ui/file-upload"
import { reportContent } from "@/data/report-content"
import type { ReportFormValues } from "@/schemas/report-schema"

const content = reportContent.steps.evidence

export function StepEvidence({ form }: { form: UseFormReturn<ReportFormValues> }) {
  return (
    <Field>
      <FieldLabel>{content.fieldLabel}</FieldLabel>
      <div className="overflow-hidden rounded-2xl border border-dashed border-border">
        <FileUpload
          onChange={(files) =>
            form.setValue("evidence", files[0] ?? null, { shouldValidate: true })
          }
        />
      </div>

      <FieldError errors={[form.formState.errors.evidence]} />
    </Field>
  )
}
