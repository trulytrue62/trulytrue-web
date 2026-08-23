export type IdentifierType = "phone" | "url" | "email" | "upi" | "text"

export type ReportStatus = "pending" | "verified" | "rejected"

export type ScamReport = {
  identifierType: IdentifierType
  identifierValue: string
  scamType: string
  description: string
  evidenceFileName?: string
  incidentDateTime: string
  country: string
  region: string
  status: ReportStatus
  submitterId: string | null
  submittedAt: string
}
