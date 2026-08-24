export function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/60 py-3 last:border-b-0">
      <span className="shrink-0 text-sm text-muted-foreground">{label}</span>
      <span className="max-w-[70%] text-right text-sm font-medium text-foreground">
        {value || "Not provided"}
      </span>
    </div>
  )
}
