import type { AuditFields } from "@/types/audit"

export type IdentifierType = "phone" | "url" | "email" | "upi" | "text"

export type ReportStatus = "pending" | "verified" | "rejected" | "info_requested"

export type ScamReport = AuditFields & {
  id: string
  identifierType: IdentifierType
  identifierValue: string
  scamType: string
  description: string
  evidenceFileName?: string
  incidentDateTime: string
  region: string
  status: ReportStatus
  rejectionReason?: string
  infoRequestMessage?: string
  infoRequestAttachmentName?: string
}
