import Link from "next/link"

import { Button } from "@/components/ui/button"
import { statesContent } from "@/content/states"

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
      title={statesContent.forbidden.title}
      description={statesContent.forbidden.description}
      action={{ label: statesContent.forbidden.actionLabel, href: "/" }}
    />
  )
}

export function NotFound() {
  return (
    <State
      title={statesContent.notFound.title}
      description={statesContent.notFound.description}
      action={{ label: statesContent.notFound.actionLabel, href: "/" }}
    />
  )
}

export function FeatureUnavailable() {
  return (
    <State
      title={statesContent.featureUnavailable.title}
      description={statesContent.featureUnavailable.description}
      action={{ label: statesContent.featureUnavailable.actionLabel, href: "/" }}
    />
  )
}
