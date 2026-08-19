import { MapPinIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { regionalTrends } from "@/data/mock/intelligence"

export default function RegionalTrendsSlot() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Regional trends</CardTitle>
        <CardDescription>
          What&apos;s spreading near you and across India
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 sm:grid-cols-2">
          {regionalTrends.map((item) => (
            <li
              key={item.region}
              className="flex items-start gap-2 rounded-2xl border p-3"
            >
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{item.region}</div>
                <p className="text-sm text-muted-foreground">{item.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
