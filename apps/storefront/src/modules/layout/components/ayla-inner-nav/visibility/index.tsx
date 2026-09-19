"use client"

import { usePathname } from "next/navigation"

export default function InnerNavVisibility({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  // /dk, /de, /us, etc. = landing page
  if (segments.length <= 1) {
    return null
  }

  return <>{children}</>
}
