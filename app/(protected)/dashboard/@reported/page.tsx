import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { mostReportedIdentifiers } from "@/data/mock/intelligence"

export default function MostReportedIdentifiersSlot() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Most reported identifiers</CardTitle>
        <CardDescription>Flagged most often by the community</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="divide-y">
          {mostReportedIdentifiers.map((item) => (
            <li
              key={item.identifier}
              className="flex items-center justify-between py-2"
            >
              <div>
                <div className="font-mono text-sm">{item.identifier}</div>
                <div className="text-xs text-muted-foreground">
                  {item.category}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {item.reports} reports
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 text-xs",
                    item.status === "Verified"
                      ? "border-primary/30 text-primary"
                      : "border-muted-foreground/30"
                  )}
                >
                  {item.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
