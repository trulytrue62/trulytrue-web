import { format } from "date-fns"
import { z } from "zod"

import { reportContent } from "@/data/report-content"
import { scamTypes } from "@/data/mock/scam-types"
import { detectIdentifierType } from "@/utils/identifier"

const scamTypeValues = scamTypes.map((type) => type.value) as [string, ...string[]]
const content = reportContent.steps

export const reportFormSchema = z.object({
  identifierValue: z
    .string()
    .min(1, content.identifier.errors.required)
    .refine((value) => detectIdentifierType(value) !== null, {
      message: content.identifier.errors.undetected,
    }),
  scamType: z.enum(scamTypeValues, { message: content.details.scamType.error }),
  description: z.string().min(20, content.details.description.error),
  incidentDate: z.date({ error: content.details.incidentDate.error }),
  incidentTime: z.string().min(1, content.details.incidentTime.error),
  evidence: z.instanceof(File).optional().nullable(),
  country: z.string().min(1, content.location.country.error),
  region: z.string().min(1, content.location.region.error),
})

export type ReportFormValues = z.infer<typeof reportFormSchema>

export function getReportFormDefaultValues(): ReportFormValues {
  const now = new Date()

  return {
    identifierValue: "",
    scamType: "",
    description: "",
    incidentDate: now,
    incidentTime: format(now, "HH:mm"),
    evidence: null,
    country: "",
    region: "",
  }
}

export const REPORT_STEPS: {
  id: string
  title: string
  fields: (keyof ReportFormValues)[]
}[] = [
  { id: "identifier", title: content.identifier.title, fields: ["identifierValue"] },
  {
    id: "details",
    title: content.details.title,
    fields: ["scamType", "description", "incidentDate", "incidentTime"],
  },
  { id: "evidence", title: content.evidence.title, fields: ["evidence"] },
  { id: "location", title: content.location.title, fields: ["country", "region"] },
  { id: "review", title: content.review.title, fields: [] },
]
