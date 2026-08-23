import { getMockSimilarReports } from "@/data/mock/similar-reports"
import { extractIdentifierFromText } from "@/utils/identifier"
import type { IdentifierType } from "@/types/report"

export type CheckVerdict = "safe" | "suspicious" | "unsafe"

export type CheckResult = {
  verdict: CheckVerdict
  score: number
  extractedIdentifier: string | null
  identifierType: IdentifierType | null
  reasons: string[]
  similarReportsCount: number
}

const CONTENT_SIGNALS: { pattern: RegExp; weight: number; reason: string }[] = [
  {
    pattern: /\b(urgent|immediately|act now|right away|expires? (today|soon))\b/i,
    weight: 15,
    reason: "Uses urgent, pressure-based language",
  },
  {
    pattern: /\b(wire transfer|gift card|western union|crypto|bitcoin|pay(ment)? now|send money)\b/i,
    weight: 25,
    reason: "Asks for payment through an unusual or hard-to-trace method",
  },
  {
    pattern: /\b(otp|one[-\s]?time password|cvv|pin number|verify your (account|password|identity))\b/i,
    weight: 25,
    reason: "Requests an OTP, PIN, or other sensitive credential",
  },
  {
    pattern: /\b(you('ve| have) won|lottery|claim now|free (gift|reward)|congratulations)\b/i,
    weight: 20,
    reason: "Contains prize or lottery-style bait",
  },
  {
    pattern: /\b(click (here|this link)|verify now|confirm your details)\b/i,
    weight: 10,
    reason: "Pushes you to click a link or confirm details quickly",
  },
]

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  }
  return hash
}

function scoreToVerdict(score: number): CheckVerdict {
  if (score >= 67) {
    return "unsafe"
  }
  if (score >= 34) {
    return "suspicious"
  }
  return "safe"
}

export function analyzeMessage(message: string): CheckResult {
  const extracted = extractIdentifierFromText(message)
  const reasons: string[] = []
  let score = 0
  let similarReportsCount = 0

  if (extracted) {
    const similar = getMockSimilarReports(extracted.value)
    similarReportsCount = similar.count
    if (similar.count > 0) {
      score += Math.min(50, similar.count * 15)
      reasons.push(
        `${similar.count} other ${similar.count === 1 ? "report" : "reports"} exist for this identifier`
      )
    } else {
      reasons.push("No prior reports found for this identifier")
    }
  }

  for (const signal of CONTENT_SIGNALS) {
    if (signal.pattern.test(message)) {
      score += signal.weight
      reasons.push(signal.reason)
    }
  }

  if (score > 0) {
    score = Math.min(100, score + (hashString(message.trim().toLowerCase()) % 8))
  }

  if (reasons.length === 0) {
    reasons.push("No suspicious patterns or identifiers were detected")
  }

  return {
    verdict: scoreToVerdict(score),
    score,
    extractedIdentifier: extracted?.value ?? null,
    identifierType: extracted?.type ?? null,
    reasons,
    similarReportsCount,
  }
}
