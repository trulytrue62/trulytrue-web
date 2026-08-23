import { GlobeIcon, HelpCircleIcon, LandmarkIcon, MailIcon, PhoneIcon, type LucideIcon } from "lucide-react"

import type { IdentifierType } from "@/types/report"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const UPI_PATTERN = /^[\w.-]{2,}@[a-zA-Z]{2,}$/
const URL_PATTERN =
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\/[^\s]*)?$/i
const PHONE_PATTERN = /^\+?[\d\s-]{7,15}$/

const EMAIL_OR_UPI_TOKEN_PATTERN = /[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9.-]{2,}/
const URL_TOKEN_PATTERN =
  /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]+\.(?:com|org|net|in|co|io|gov|edu|info|biz|xyz)(?:\/[^\s]*)?)/i
const PHONE_TOKEN_PATTERN = /\+?\d[\d\s-]{6,14}\d/

export function detectIdentifierType(value: string): IdentifierType | null {
  const trimmed = value.trim()

  if (!trimmed) {
    return null
  }

  if (trimmed.includes("@")) {
    return EMAIL_PATTERN.test(trimmed) ? "email" : UPI_PATTERN.test(trimmed) ? "upi" : "text"
  }

  if (URL_PATTERN.test(trimmed)) {
    return "url"
  }

  if (PHONE_PATTERN.test(trimmed)) {
    return "phone"
  }

  return "text"
}

export function extractIdentifierFromText(
  text: string
): { value: string; type: IdentifierType } | null {
  const atMatch = text.match(EMAIL_OR_UPI_TOKEN_PATTERN)
  if (atMatch) {
    const token = atMatch[0]
    const domain = token.split("@")[1] ?? ""
    return { value: token, type: domain.includes(".") ? "email" : "upi" }
  }

  const urlMatch = text.match(URL_TOKEN_PATTERN)
  if (urlMatch) {
    return { value: urlMatch[0], type: "url" }
  }

  const phoneMatch = text.match(PHONE_TOKEN_PATTERN)
  if (phoneMatch) {
    return { value: phoneMatch[0].trim(), type: "phone" }
  }

  return null
}

export const identifierTypeLabels: Record<IdentifierType, string> = {
  phone: "Phone number",
  url: "URL",
  email: "Email",
  upi: "UPI ID",
  text: "Text",
}

export const identifierTypeIcons: Record<IdentifierType, LucideIcon> = {
  phone: PhoneIcon,
  url: GlobeIcon,
  email: MailIcon,
  upi: LandmarkIcon,
  text: HelpCircleIcon,
}
