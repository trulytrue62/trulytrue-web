import { CheckInput } from "@/components/check/check-input"

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
      <CheckInput showSuggestions={false} placeholderText="  Paste a phone number, link, email, UPI ID, message or upload a
          screenshot to check it against community reports."/>
      <div className="grid gap-4 lg:grid-cols-2">
        {trending}
        {reported}
        <div className="lg:col-span-2">{regional}</div>
      </div>
    </div>

  )
}
