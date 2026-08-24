"use client"

import { SearchIcon } from "lucide-react"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

export function AdminPageHeader({
  title,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  action,
}: {
  title: string
  searchValue: string
  onSearchChange: (value: string) => void
  searchPlaceholder: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-medium text-foreground">{title}</h2>
      </div>
      <div className="flex items-center gap-2">
        <InputGroup className="w-56 sm:w-64">
          <InputGroupInput
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>
        {action}
      </div>

    </div>
  )
}
