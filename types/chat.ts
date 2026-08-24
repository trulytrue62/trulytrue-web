import type { AuditFields } from "@/types/audit"
import type { CheckResult } from "@/data/mock/check-analysis"

export type ChatAttachment = {
  name: string
  isImage: boolean
  url?: string
}

type ChatMessageBase = AuditFields & { id: string }

export type ChatMessage =
  | (ChatMessageBase & { role: "user"; kind: "text"; text: string; attachment?: ChatAttachment })
  | (ChatMessageBase & { role: "assistant"; kind: "text"; text: string })
  | (ChatMessageBase & { role: "assistant"; kind: "result"; text: string; result: CheckResult })
