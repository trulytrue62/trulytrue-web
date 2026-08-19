import { AudioWaveform, Bot, Command, Frame, GalleryVerticalEnd, PieChart, Settings2, SquareTerminal } from "lucide-react"

import type { SidebarItem } from "@/types/sidebar"

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navItems: [
    {
      name: "Home",
      icon: SquareTerminal,
      route: "/",
      roles: ["admin", "user"],
    },
    {
      name: "Admin",
      icon: Settings2,
      route: "/admin",
      isNew: true,
      roles: ["admin"],
      items: [
        {
          name: "Users",
          icon: Bot,
          route: "/admin/users",
          roles: ["admin"],
        },
      ],
    },
  ] as SidebarItem[],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}
