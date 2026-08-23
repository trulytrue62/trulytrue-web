import { z } from "zod"

import { scamTypes } from "@/data/scam-types"
import { detectIdentifierType } from "@/components/report-form/identifier"

const scamTypeValues = scamTypes.map((type) => type.value) as [string, ...string[]]

export const reportFormSchema = z.object({
  identifierValue: z
    .string()
    .min(1, "Enter what you're reporting")
    .refine((value) => detectIdentifierType(value) !== null, {
      message: "We couldn't tell if this is a phone number, URL, email, or UPI ID",
    }),
  scamType: z.enum(scamTypeValues, { message: "Select a scam category" }),
  description: z
    .string()
    .min(20, "Please describe what happened in a bit more detail"),
  incidentDate: z.date({ error: "Select a date" }),
  incidentTime: z.string().min(1, "Enter a time"),
  evidence: z.instanceof(File).optional().nullable(),
  country: z.string().min(1, "Enter a country"),
  region: z.string().min(1, "Enter a state or region"),
})

export type ReportFormValues = z.infer<typeof reportFormSchema>

export const reportFormDefaultValues: ReportFormValues = {
  identifierValue: "",
  scamType: "",
  description: "",
  incidentDate: undefined as unknown as Date,
  incidentTime: "",
  evidence: null,
  country: "",
  region: "",
}

export const REPORT_STEPS: {
  id: string
  title: string
  fields: (keyof ReportFormValues)[]
}[] = [
  { id: "identifier", title: "What are you reporting?", fields: ["identifierValue"] },
  {
    id: "details",
    title: "Scam details",
    fields: ["scamType", "description", "incidentDate", "incidentTime"],
  },
  { id: "evidence", title: "Evidence", fields: ["evidence"] },
  { id: "location", title: "Location", fields: ["country", "region"] },
  { id: "review", title: "Review & submit", fields: [] },
]
