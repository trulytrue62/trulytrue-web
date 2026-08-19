import { CheckInput } from "@/components/check/check-input"
import { checkInputContent } from "@/content/check-input"

export default function DashboardLayout({
  trending,
  reported,
  regional,
}: {
  trending: React.ReactNode
  reported: React.ReactNode
  regional: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <CheckInput
        showSuggestions={false}
        placeholderText={checkInputContent.description}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {trending}
        {reported}
        <div className="lg:col-span-2">{regional}</div>
      </div>
    </div>
  )
}
