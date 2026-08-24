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
      className="group/reveal gap-0 px-2.5"
    >
      <Icon className="shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity,margin-left] duration-200 ease-out group-hover/reveal:ml-1.5 group-hover/reveal:max-w-40 group-hover/reveal:opacity-100">
        {label}
      </span>
    </Button>
  )
}
