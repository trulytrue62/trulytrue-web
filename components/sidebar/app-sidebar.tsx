"use client"

import * as React from "react"

import { SidebarUser } from "@/components/sidebar/sidebar-user"
import { SidebarBrand } from "@/components/sidebar/sidebar-brand"
import { SidebarNav } from "@/components/sidebar/sidebar-item"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { navItems } from "@/data/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarBrand />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
