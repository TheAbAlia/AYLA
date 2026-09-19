import { Suspense } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"

import AudienceLinks from "./audience-links"
import InnerNavVisibility from "./visibility"

export default async function AylaInnerNav() {
  const navLink =
    "text-[9px] uppercase tracking-[0.26em] transition-opacity duration-300 hover:opacity-45"

  return (
    <InnerNavVisibility>
      <header className="relative z-50 w-full border-b border-[#191816]/20 bg-[#EEEAE1] text-[#191816]">
        <nav className="relative flex h-[76px] items-center px-5 md:h-[88px] md:px-[4.7%]">
          {/* AYLA */}
          <div className="flex flex-1 items-center">
            <LocalizedClientLink
              href="/"
              aria-label="AYLA — Return to home"
              className="font-serif text-[23px] font-normal leading-none tracking-[0.04em] transition-opacity duration-300 hover:opacity-50 md:text-[27px]"
            >
              AYLA
            </LocalizedClientLink>
          </div>

          {/* DESKTOP: SHOP / MEN / WOMEN */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex lg:gap-11">
            <Suspense fallback={null}>
              <AudienceLinks />
            </Suspense>
          </div>

          {/* MOBILE: SHOP */}
          <div className="flex items-center md:hidden">
            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/store"
                  className={navLink}
                >
                  Shop
                </LocalizedClientLink>
              }
            >
              <AudienceLinks mobile />
            </Suspense>
          </div>

          {/* ACCOUNT / BAG */}
          <div className="flex flex-1 items-center justify-end gap-6 md:gap-8">
            <LocalizedClientLink
              href="/account"
              className={`${navLink} hidden sm:block`}
            >
              Account
            </LocalizedClientLink>

            <div className="[&_*]:text-[#191816]">
              <Suspense
                fallback={
                  <LocalizedClientLink
                    href="/cart"
                    className={navLink}
                    data-testid="nav-cart-link"
                  >
                    Bag (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </div>
        </nav>
      </header>
    </InnerNavVisibility>
  )
}