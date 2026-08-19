export function SidebarBrand() {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <span className="text-lg font-bold leading-none">T</span>
        <span className="-ml-1 text-xs font-bold leading-none">T</span>
      </div>
      <span className="truncate text-sm font-medium">TruelyTrue</span>
    </div>
  )
}
