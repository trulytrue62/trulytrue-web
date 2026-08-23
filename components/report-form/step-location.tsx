"use client"

import { useEffect } from "react"
import type { UseFormReturn } from "react-hook-form"

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { ReportFormValues } from "@/components/report-form/report-schema"

function detectCountry(): string | null {
  try {
    const region = new Intl.Locale(navigator.language).maximize().region
    if (!region) {
      return null
    }
    return new Intl.DisplayNames(["en"], { type: "region" }).of(region) ?? null
  } catch {
    return null
  }
}

export function StepLocation({ form }: { form: UseFormReturn<ReportFormValues> }) {
  useEffect(() => {
    if (form.getValues("country")) {
      return
    }
    const detected = detectCountry()
    if (detected) {
      form.setValue("country", detected, { shouldValidate: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="country">Country</FieldLabel>
        <Input id="country" placeholder="e.g. India" {...form.register("country")} />
        <FieldDescription>Auto-filled from your browser &mdash; feel free to correct it.</FieldDescription>
        <FieldError errors={[form.formState.errors.country]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="region">State / region</FieldLabel>
        <Input id="region" placeholder="e.g. Maharashtra" {...form.register("region")} />
        <FieldError errors={[form.formState.errors.region]} />
      </Field>
    </FieldGroup>
  )
}
