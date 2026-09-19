"use client"

import { useSearchParams } from "next/navigation"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function AudienceLinks({
  mobile = false,
}: {
  mobile?: boolean
}) {
  const searchParams = useSearchParams()

  const rawAudience = searchParams.get("audience")

  const audience =
    rawAudience === "men" || rawAudience === "women"
      ? rawAudience
      : undefined

  const shopHref = audience
    ? `/store?audience=${audience}`
    : "/store"

  const navLink =
    "text-[9px] uppercase tracking-[0.26em] transition-opacity duration-300 hover:opacity-45"

  if (mobile) {
    return (
      <LocalizedClientLink
        href={shopHref}
        className={navLink}
      >
        Shop
      </LocalizedClientLink>
    )
  }

  return (
    <>
      <LocalizedClientLink
        href={shopHref}
        className={navLink}
      >
        Shop
      </LocalizedClientLink>

      <LocalizedClientLink
        href="/store?audience=men"
        className={`${navLink} ${
          audience === "men" ? "opacity-100" : "opacity-55"
        }`}
      >
        Men
      </LocalizedClientLink>

      <LocalizedClientLink
        href="/store?audience=women"
        className={`${navLink} ${
          audience === "women" ? "opacity-100" : "opacity-55"
        }`}
      >
        Women
      </LocalizedClientLink>
    </>
  )
}
