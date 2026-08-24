export default function StandardLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto h-full max-w-7xl overflow-y-auto p-10 sm:px-6">{children}</div>
}
