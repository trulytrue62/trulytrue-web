"use client"

import { useSession } from "next-auth/react"
import { ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import type { Role } from "@/types/auth"
import type { SidebarItem } from "@/types/sidebar"

function filterByRole(items: SidebarItem[], role: Role): SidebarItem[] {
  return items
    .filter((item) => item.roles.includes(role))
    .map((item) => ({
      ...item,
      items: item.items ? filterByRole(item.items, role) : undefined,
    }))
}

function NewBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "rounded-md bg-sidebar-primary px-1.5 py-0.5 text-[10px] font-medium text-sidebar-primary-foreground",
        className
      )}
    >
      New
    </span>
  )
}

function SidebarItemRow({ item }: { item: SidebarItem }) {
  const Icon = item.icon

  if (!item.items?.length) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={item.name}
          render={<a href={item.route} />}
        >
          <Icon />
          <span>{item.name}</span>
          {item.isNew && <NewBadge className="ml-auto" />}
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Collapsible className="group/collapsible" render={<SidebarMenuItem />}>
      <CollapsibleTrigger render={<SidebarMenuButton tooltip={item.name} />}>
        <Icon />
        <span>{item.name}</span>
        {item.isNew && <NewBadge />}
        <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.items.map((child) => (
            <SidebarMenuSubItem key={child.route}>
              <SidebarMenuSubButton render={<a href={child.route} />}>
                <child.icon className="size-4" />
                <span>{child.name}</span>
                {child.isNew && <NewBadge className="ml-auto" />}
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function SidebarNav({ items }: { items: SidebarItem[] }) {
  const { data: session } = useSession()
  const role = session?.user?.role
  const visibleItems = role ? filterByRole(items, role) : []

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {visibleItems.map((item) => (
          <SidebarItemRow key={item.route} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
