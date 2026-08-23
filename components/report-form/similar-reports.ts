import { scamTypes } from "@/data/scam-types"

export type SimilarReport = {
  scamType: string
  daysAgo: number
}

export type SimilarReportsResult = {
  count: number
  examples: SimilarReport[]
}

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  }
  return hash
}

export function getMockSimilarReports(identifierValue: string): SimilarReportsResult {
  const hash = hashString(identifierValue.trim().toLowerCase())
  const count = hash % 6

  const examples: SimilarReport[] = Array.from({ length: Math.min(count, 3) }, (_, index) => {
    const seed = hash + index * 17
    return {
      scamType: scamTypes[seed % scamTypes.length].label,
      daysAgo: (seed % 28) + 1,
    }
  })

  return { count, examples }
}
