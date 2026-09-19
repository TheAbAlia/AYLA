"use client"

import { useParams, usePathname } from "next/navigation"

import { signout } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const links = [
  {
    href: "/account",
    label: "Overview",
    testId: "overview-link",
  },
  {
    href: "/account/profile",
    label: "Profile",
    testId: "profile-link",
  },
  {
    href: "/account/addresses",
    label: "Addresses",
    testId: "addresses-link",
  },
  {
    href: "/account/orders",
    label: "Orders",
    testId: "orders-link",
  },
]

const AccountNav = ({
  customer: _customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode)
  }

  const pathWithoutCountry =
    route === `/${countryCode}`
      ? "/"
      : route.replace(`/${countryCode}`, "") || "/"

  const isActive = (href: string) => {
    if (href === "/account") {
      return pathWithoutCountry === "/account"
    }

    return pathWithoutCountry.startsWith(href)
  }

  return (
    <nav
      className="border-b border-[#191816]/20"
      data-testid="account-nav"
    >
      <div className="flex items-center gap-x-6 overflow-x-auto py-4 md:gap-x-10">
        {links.map((link) => {
          const active = isActive(link.href)

          return (
            <LocalizedClientLink
              key={link.href}
              href={link.href}
              data-testid={link.testId}
              className={[
                "relative shrink-0 py-1 text-[9px] uppercase tracking-[0.18em] transition-opacity",
                active
                  ? "opacity-100"
                  : "opacity-45 hover:opacity-100",
              ].join(" ")}
            >
              {link.label}

              {active && (
                <span className="absolute -bottom-[17px] left-0 h-px w-full bg-[#191816]" />
              )}
            </LocalizedClientLink>
          )
        })}

        <button
          type="button"
          onClick={handleLogout}
          data-testid="logout-button"
          className="ml-auto shrink-0 py-1 text-[9px] uppercase tracking-[0.18em] opacity-45 transition-opacity hover:opacity-100"
        >
          Sign out
        </button>
      </div>
    </nav>
  )
}

export default AccountNav
