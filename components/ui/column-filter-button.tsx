"use client"

import { CheckIcon, FilterIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export const COLUMN_FILTER_ALL = "all"

export function ColumnFilterButton({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}) {
  const isActive = value !== COLUMN_FILTER_ALL

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: isActive ? "secondary" : "ghost", size: "icon-xs" }),
          "size-5"
        )}
        aria-label="Filter column"
        onClick={(event: React.MouseEvent) => event.stopPropagation()}
      >
        <FilterIcon className="size-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => onChange(COLUMN_FILTER_ALL)}>
          {value === COLUMN_FILTER_ALL && <CheckIcon className="size-3.5" />}
          All
        </DropdownMenuItem>
        {options.map((option) => (
          <DropdownMenuItem key={option.value} onClick={() => onChange(option.value)}>
            {value === option.value && <CheckIcon className="size-3.5" />}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
