import { currentUser } from "@/data/mock/user"
import type { ScamReport } from "@/types/report"

export type ReportDecision =
  | { type: "approve" }
  | { type: "reject"; reason: string }
  | { type: "request_info"; message: string; attachmentName?: string }

export function applyReportDecision(report: ScamReport, decision: ReportDecision): ScamReport {
  const updatedAt = new Date().toISOString()
  const updatedBy = currentUser.id

  if (decision.type === "approve") {
    return {
      ...report,
      status: "verified",
      rejectionReason: undefined,
      infoRequestMessage: undefined,
      infoRequestAttachmentName: undefined,
      updatedAt,
      updatedBy,
    }
  }

  if (decision.type === "reject") {
    return {
      ...report,
      status: "rejected",
      rejectionReason: decision.reason,
      infoRequestMessage: undefined,
      infoRequestAttachmentName: undefined,
      updatedAt,
      updatedBy,
    }
  }

  return {
    ...report,
    status: "info_requested",
    infoRequestMessage: decision.message,
    infoRequestAttachmentName: decision.attachmentName,
    rejectionReason: undefined,
    updatedAt,
    updatedBy,
  }
}
