export default function StandardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto h-full max-w-7xl p-4 sm:p-6">
      <div className="h-full overflow-y-auto rounded-4xl glass-panel bg-card/20 p-6">{children}</div>
    </div>
  )
}
