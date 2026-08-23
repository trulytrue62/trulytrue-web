"use client"

import { AnimatePresence, motion } from "motion/react"
import { useWatch, type UseFormReturn } from "react-hook-form"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { detectIdentifierType, identifierTypeIcons, identifierTypeLabels } from "@/components/report-form/identifier"
import type { ReportFormValues } from "@/components/report-form/report-schema"

export function StepIdentifier({ form }: { form: UseFormReturn<ReportFormValues> }) {
  const value = useWatch({ control: form.control, name: "identifierValue" })
  const detected = detectIdentifierType(value ?? "")
  const DetectedIcon = detected ? identifierTypeIcons[detected] : null

  return (
    <Field>
      <div className="flex items-center justify-between gap-3">
        <FieldLabel htmlFor="identifierValue">
          Phone number, URL, email, or UPI ID being reported
        </FieldLabel>
        <AnimatePresence mode="wait">
          {DetectedIcon && detected && (
            <motion.span
              key={detected}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.15 }}
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-medium text-indigo-600"
            >
              <DetectedIcon className="size-3.5" />
              {identifierTypeLabels[detected]}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <Input
        id="identifierValue"
        placeholder="e.g. +1 555 0100, scam-site.com, name@bank"
        autoComplete="off"
        {...form.register("identifierValue")}
      />
      <FieldError errors={[form.formState.errors.identifierValue]} />
    </Field>
  )
}
