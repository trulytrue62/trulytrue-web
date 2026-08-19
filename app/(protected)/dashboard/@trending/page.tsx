import { MinusIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { trendingScamTypes } from "@/data/mock/intelligence"

const TREND_ICON = {
  up: TrendingUpIcon,
  down: TrendingDownIcon,
  flat: MinusIcon,
}

const TREND_CLASS = {
  up: "text-destructive",
  down: "text-muted-foreground",
  flat: "text-muted-foreground",
}

export default function TrendingScamTypesSlot() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending scam types</CardTitle>
        <CardDescription>
          Categories with the most reports right now
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="divide-y">
          {trendingScamTypes.map((item) => {
            const TrendIcon = TREND_ICON[item.trend]
            return (
              <li
                key={item.type}
                className="flex items-center justify-between py-2"
              >
                <span className="text-sm">{item.type}</span>
                <span
                  className={cn(
                    "flex items-center gap-1.5 text-sm",
                    TREND_CLASS[item.trend]
                  )}
                >
                  {item.reports}
                  <TrendIcon className="size-4" />
                </span>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
