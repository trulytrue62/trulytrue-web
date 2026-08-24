import { mockAdminReports } from "@/data/mock/admin-reports"
import { getScamTypeLabel } from "@/data/mock/scam-types"
import type { IdentifierType, ScamReport } from "@/types/report"

const communityReports = mockAdminReports.filter((report) => report.status !== "rejected")

export function getMockRecentReports(limit = 6): ScamReport[] {
  return [...communityReports]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

export type TrendingScamType = { scamType: string; label: string; count: number }

export function getMockTrendingScamTypes(limit = 5): TrendingScamType[] {
  const counts = new Map<string, number>()
  for (const report of communityReports) {
    counts.set(report.scamType, (counts.get(report.scamType) ?? 0) + 1)
  }

  return [...counts.entries()]
    .map(([scamType, count]) => ({ scamType, label: getScamTypeLabel(scamType), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

export type MostReportedIdentifier = {
  identifierValue: string
  identifierType: IdentifierType
  count: number
}

export function getMockMostReportedIdentifiers(limit = 5): MostReportedIdentifier[] {
  const counts = new Map<string, { identifierType: IdentifierType; submitters: Set<string> }>()
  for (const report of communityReports) {
    const entry = counts.get(report.identifierValue) ?? {
      identifierType: report.identifierType,
      submitters: new Set<string>(),
    }
    entry.submitters.add(report.createdBy)
    counts.set(report.identifierValue, entry)
  }

  return [...counts.entries()]
    .map(([identifierValue, { identifierType, submitters }]) => ({
      identifierValue,
      identifierType,
      count: submitters.size,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

export type TopRegion = { region: string; count: number }

export function getMockTopRegions(limit = 5): TopRegion[] {
  const counts = new Map<string, number>()
  for (const report of communityReports) {
    counts.set(report.region, (counts.get(report.region) ?? 0) + 1)
  }

  return [...counts.entries()]
    .map(([region, count]) => ({ region, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}
