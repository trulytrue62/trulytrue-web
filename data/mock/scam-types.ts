export type ScamTypeOption = {
  value: string
  label: string
}

export const scamTypes: ScamTypeOption[] = [
  { value: "phishing", label: "Phishing" },
  { value: "fake-investment", label: "Fake investment / Ponzi scheme" },
  { value: "fake-ecommerce", label: "Fake e-commerce / online store" },
  { value: "job-scam", label: "Fake job offer" },
  { value: "romance-scam", label: "Romance scam" },
  { value: "loan-scam", label: "Fake loan offer" },
  { value: "impersonation", label: "Impersonation (bank, govt, company)" },
  { value: "otp-bank-fraud", label: "OTP / bank fraud" },
  { value: "other", label: "Other" },
]

export function getScamTypeLabel(value: string): string {
  return scamTypes.find((type) => type.value === value)?.label ?? value
}
