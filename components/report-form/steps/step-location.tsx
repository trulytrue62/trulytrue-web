"use client"

import { useEffect } from "react"
import type { UseFormReturn } from "react-hook-form"

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { reportContent } from "@/data/report-content"
import type { ReportFormValues } from "@/schemas/report-schema"

const content = reportContent.steps.location

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
        <FieldLabel htmlFor="country">{content.country.label}</FieldLabel>
        <Input id="country" placeholder={content.country.placeholder} {...form.register("country")} />
        <FieldDescription>{content.country.description}</FieldDescription>
        <FieldError errors={[form.formState.errors.country]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="region">{content.region.label}</FieldLabel>
        <Input id="region" placeholder={content.region.placeholder} {...form.register("region")} />
        <FieldError errors={[form.formState.errors.region]} />
      </Field>
    </FieldGroup>
  )
}
