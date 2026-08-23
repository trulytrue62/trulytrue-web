"use client"

import type { UseFormReturn } from "react-hook-form"

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { FileUpload } from "@/components/ui/file-upload"
import type { ReportFormValues } from "@/components/report-form/report-schema"

export function StepEvidence({ form }: { form: UseFormReturn<ReportFormValues> }) {
  return (
    <Field>
      <FieldLabel>Evidence (optional)</FieldLabel>
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
