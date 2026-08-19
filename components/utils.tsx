import Link from "next/link"

import { Button } from "@/components/ui/button"

type StateProps = {
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

function State({ title, description, action }: StateProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      {action && (
        <Button render={<Link href={action.href} />}>{action.label}</Button>
      )}
    </div>
  )
}

export function Forbidden() {
  return (
    <State
      title="You don't have access to this page"
      description="Your account doesn't have permission to view this page."
      action={{ label: "Back to Home", href: "/" }}
    />
  )
}

export function NotFound() {
  return (
    <State
      title="Page not found"
      description="The page you're looking for doesn't exist."
      action={{ label: "Back to Home", href: "/" }}
    />
  )
}

export function FeatureUnavailable() {
  return (
    <State
      title="Feature unavailable"
      description="This feature isn't available yet. Check back soon."
      action={{ label: "Back to Home", href: "/" }}
    />
  )
}
