import { GlobeIcon, HelpCircleIcon, LandmarkIcon, MailIcon, PhoneIcon, type LucideIcon } from "lucide-react"

import type { IdentifierType } from "@/types/report"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const UPI_PATTERN = /^[\w.-]{2,}@[a-zA-Z]{2,}$/
const URL_PATTERN =
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\/[^\s]*)?$/i
const PHONE_PATTERN = /^\+?[\d\s-]{7,15}$/

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
