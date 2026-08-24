"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import type { MostReportedIdentifier } from "@/data/mock/community"
import { dashboardContent } from "@/data/mock/dashboard-content"

const content = dashboardContent.mostReported

const chartConfig = {
  count: { label: "Reports", color: "var(--chart-2)" },
} satisfies ChartConfig

function truncateLabel(value: string, max = 10) {
  return value.length > max ? `${value.slice(0, max)}…` : value
}

export function MostReportedCard({ items }: { items: MostReportedIdentifier[] }) {
  const data = items.map((item) => ({ label: item.identifierValue, count: item.count }))

  return (
    <div className="glass-panel flex h-full min-h-0 flex-col gap-3 overflow-hidden rounded-3xl p-4">
      <h2 className="shrink-0 text-sm font-medium text-foreground">{content.title}</h2>
      {items.length === 0 ? (
        <p className="text-xs text-muted-foreground">{content.empty}</p>
      ) : (
        <ChartContainer config={chartConfig} className="aspect-auto min-h-0 w-full flex-1">
          <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11 }}
              tickFormatter={(value: string) => truncateLabel(value)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="count"
              type="monotone"
              stroke="var(--color-count)"
              strokeWidth={2}
              dot={{ fill: "var(--color-count)" }}
            />
          </LineChart>
        </ChartContainer>
      )}
    </div>
  )
}
