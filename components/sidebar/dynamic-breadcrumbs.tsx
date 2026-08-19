"use client"

import { Fragment } from "react"
import { usePathname } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { data } from "@/data/sidebar"
import { findItemPath } from "@/lib/sidebar"

export function DynamicBreadcrumbs() {
  const pathname = usePathname()
  const path = findItemPath(data.navItems, pathname)

  if (!path) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {path.map((item, index) => {
          const isLast = index === path.length - 1

          return (
            <Fragment key={item.route}>
              <BreadcrumbItem className={isLast ? undefined : "hidden md:block"}>
                {isLast ? (
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.route}>{item.name}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
