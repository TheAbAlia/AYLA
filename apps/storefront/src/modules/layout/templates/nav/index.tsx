import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  const navLink =
    "text-[10px] uppercase tracking-[0.22em] transition-opacity duration-300 hover:opacity-55"

  return (
    <div className="absolute inset-x-0 top-0 z-50 text-[#F2EFE8]">
      <header className="h-[72px] md:h-[82px]">
        <nav className="mx-auto flex h-full w-full items-center px-6 md:px-12 lg:px-16">
          
          {/* Left / Brand */}
          <div className="flex flex-1 items-center">
            <LocalizedClientLink
              href="/"
              className="font-serif text-[22px] leading-none tracking-[-0.03em] md:text-[25px]"
              data-testid="nav-store-link"
            >
              AYLA
            </LocalizedClientLink>
          </div>

          {/* Center / Desktop navigation */}
          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            <LocalizedClientLink href="/store" className={navLink}>
              Shop
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/store?audience=men"
              className={navLink}
            >
              Men
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/store?audience=women"
              className={navLink}
            >
              Women
            </LocalizedClientLink>

            <LocalizedClientLink href="/about" className={navLink}>
              About
            </LocalizedClientLink>
          </div>

          {/* Right / Cart */}
          <div className="flex flex-1 items-center justify-end gap-5">
            <div className="md:hidden">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>

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
        </nav>
      </header>
    </div>
  )
}
