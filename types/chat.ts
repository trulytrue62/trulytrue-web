import type { CheckResult } from "@/data/mock/check-analysis"

export type ChatAttachment = {
  name: string
  isImage: boolean
  url?: string
}

export type ChatMessage =
  | { id: string; role: "user"; kind: "text"; text: string; attachment?: ChatAttachment }
  | { id: string; role: "assistant"; kind: "text"; text: string }
  | { id: string; role: "assistant"; kind: "result"; text: string; result: CheckResult }
