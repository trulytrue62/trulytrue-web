import type { LucideIcon } from "lucide-react"

import { Button, type buttonVariants } from "@/components/ui/button"
import type { VariantProps } from "class-variance-authority"

export function IconRevealButton({
  icon: Icon,
  label,
  onClick,
  variant = "default",
  disabled,
}: {
  icon: LucideIcon
  label: string
  onClick?: () => void
  variant?: VariantProps<typeof buttonVariants>["variant"]
  disabled?: boolean
}) {
  return (
    <Button
      type="button"
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      className="group/reveal w-9 justify-start overflow-hidden px-0 transition-[width] duration-200 ease-out hover:w-auto hover:px-4"
    >
      <Icon className="mx-2.5 shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 ease-out group-hover/reveal:max-w-40 group-hover/reveal:-ml-1.5 group-hover/reveal:opacity-100">
        {label}
      </span>
    </Button>
  )
}
