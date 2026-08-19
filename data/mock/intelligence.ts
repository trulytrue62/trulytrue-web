export type TrendDirection = "up" | "down" | "flat"

export type TrendingScamType = {
  type: string
  reports: number
  trend: TrendDirection
}

export type ReportedIdentifier = {
  identifier: string
  category: "Phone" | "Link" | "Email" | "UPI"
  reports: number
  status: "Verified" | "Disputed"
}

export type RegionalTrend = {
  region: string
  note: string
}

export const trendingScamTypes: TrendingScamType[] = [
  { type: "Fake bank KYC calls", reports: 482, trend: "up" },
  { type: "UPI refund scams", reports: 356, trend: "up" },
  { type: "Fake delivery / OTP links", reports: 210, trend: "flat" },
  { type: "Lottery / prize messages", reports: 164, trend: "down" },
  { type: "Job offer scams", reports: 97, trend: "up" },
]

export const mostReportedIdentifiers: ReportedIdentifier[] = [
  {
    identifier: "+91 98765 43210",
    category: "Phone",
    reports: 128,
    status: "Verified",
  },
  {
    identifier: "bit.ly/kyc-update",
    category: "Link",
    reports: 94,
    status: "Verified",
  },
  {
    identifier: "support@bank-verify.com",
    category: "Email",
    reports: 61,
    status: "Disputed",
  },
  {
    identifier: "scamupi@oksbi",
    category: "UPI",
    reports: 53,
    status: "Verified",
  },
]

export const regionalTrends: RegionalTrend[] = [
  {
    region: "Your region · Maharashtra",
    note: "Fake bank KYC calls are trending",
  },
  {
    region: "India",
    note: "UPI refund scam messages are rising nationwide",
  },
  {
    region: "Karnataka",
    note: "Fake delivery OTP links reported frequently",
  },
  {
    region: "Delhi NCR",
    note: "Job offer scams on the rise",
  },
]
