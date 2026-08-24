import { MapPinIcon } from "lucide-react"

import type { TopRegion } from "@/data/mock/community"
import { dashboardContent } from "@/data/mock/dashboard-content"

const content = dashboardContent.topRegions

export function TopRegionsCard({ items }: { items: TopRegion[] }) {
  return (
    <div className="glass-panel flex h-full min-h-0 flex-col gap-3 overflow-hidden rounded-3xl p-4">
      <h2 className="shrink-0 text-sm font-medium text-foreground">{content.title}</h2>
      {items.length === 0 ? (
        <p className="text-xs text-muted-foreground">{content.empty}</p>
      ) : (
        <ul className="flex min-h-0 flex-1 flex-col justify-center gap-2.5 overflow-y-auto">
          {items.map((item) => (
            <li key={item.region} className="flex items-center justify-between gap-2 text-xs">
              <span className="flex min-w-0 items-center gap-1.5 text-foreground">
                <MapPinIcon className="size-3.5 shrink-0 text-muted-foreground" />
                <span className="truncate">{item.region}</span>
              </span>
              <span className="shrink-0 text-muted-foreground">{item.count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
