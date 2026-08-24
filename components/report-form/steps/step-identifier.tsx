"use client"

import { AnimatePresence, motion } from "motion/react"
import { useWatch, type UseFormReturn } from "react-hook-form"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { reportContent } from "@/data/mock/report-content"
import { detectIdentifierType, identifierTypeIcons, identifierTypeLabels } from "@/utils/identifier"
import type { ReportFormValues } from "@/schemas/report-schema"

const content = reportContent.steps.identifier

export function StepIdentifier({ form }: { form: UseFormReturn<ReportFormValues> }) {
  const value = useWatch({ control: form.control, name: "identifierValue" })
  const detected = detectIdentifierType(value ?? "")
  const DetectedIcon = detected ? identifierTypeIcons[detected] : null

  return (
    <Field>
      <div className="flex items-center justify-between gap-3">
        <FieldLabel htmlFor="identifierValue">{content.fieldLabel}</FieldLabel>
        <AnimatePresence mode="wait">
          {DetectedIcon && detected && (
            <motion.span
              key={detected}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.15 }}
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
            >
              <DetectedIcon className="size-3.5" />
              {identifierTypeLabels[detected]}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <Input
        id="identifierValue"
        placeholder={content.placeholder}
        autoComplete="off"
        {...form.register("identifierValue")}
      />
      <FieldError errors={[form.formState.errors.identifierValue]} />
    </Field>
  )
}
