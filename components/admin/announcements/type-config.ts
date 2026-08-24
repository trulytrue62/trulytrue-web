import { AlertTriangleIcon, LightbulbIcon, MegaphoneIcon, type LucideIcon } from "lucide-react"

import type { AnnouncementType } from "@/types/admin"

export const ANNOUNCEMENT_TYPE_CONFIG: Record<AnnouncementType, { icon: LucideIcon; className: string }> = {
  alert: { icon: AlertTriangleIcon, className: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  update: { icon: MegaphoneIcon, className: "bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  tip: { icon: LightbulbIcon, className: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
}
