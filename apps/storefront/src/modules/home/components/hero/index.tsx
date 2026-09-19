import { Suspense } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"

const Hero = () => {
  const navLink =
    "text-[10px] font-normal uppercase tracking-[0.28em] text-[#F1EDE5] transition-opacity duration-300 hover:opacity-55"

  return (
    <section className="relative w-full overflow-hidden bg-[#181714]">
      {/* ========================================================
          DESKTOP
      ======================================================== */}
      <div className="relative hidden w-full md:block">
        <img
          src="/ayla/hero.png"
          alt="AYLA — Before Language, Collection 001"
          className="block h-auto w-full"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/15 to-transparent" />

        {/* NAVIGATION */}
        <header className="absolute inset-x-0 top-0 z-30">
          <nav className="relative h-[88px] w-full">
            {/* Invisible link over embedded AYLA wordmark */}
            <LocalizedClientLink
              href="/"
              aria-label="AYLA Home"
              className="absolute left-[2.7%] top-[24px] h-[44px] w-[130px]"
            />

            {/* SHOP / MEN / WOMEN */}
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[42px]">
              <LocalizedClientLink
                href="/store"
                className={navLink}
              >
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
            </div>

            {/* ACCOUNT / BAG */}
            <div className="absolute right-[4.7%] top-0 flex h-[88px] items-center gap-8 text-[#F1EDE5]">
              <LocalizedClientLink
                href="/account"
                className={navLink}
              >
                Account
              </LocalizedClientLink>

              <div className="h-full text-[#F1EDE5]">
                <Suspense
                  fallback={
                    <LocalizedClientLink
                      href="/cart"
                      className={navLink}
                      data-testid="nav-cart-link"
                    >
                      BAG (0)
                    </LocalizedClientLink>
                  }
                >
                  <CartButton />
                </Suspense>
              </div>
            </div>
          </nav>
        </header>

        {/* EXPLORE COLLECTION */}
        <LocalizedClientLink
          href="/store"
          aria-label="Explore AYLA Collection 001"
          className="absolute left-[4.5%] top-[64%] z-20 h-[7%] w-[18%] cursor-pointer"
        />
      </div>

      {/* ========================================================
          MOBILE
      ======================================================== */}
      <div className="relative h-[100svh] min-h-[620px] md:hidden [@media(orientation:landscape)]:min-h-0">
        <img
          src="/ayla/hero.png"
          alt="AYLA — Before Language, Collection 001"
          className="
          absolute inset-0 h-full w-full object-cover object-[52%_center]
          [@media(orientation:landscape)]:object-[50%_42%]
        "
        />

        {/* Gentle contrast only where interface text sits */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />

        <header className="absolute inset-x-0 top-0 z-30">
          <nav className="flex h-[68px] items-center justify-between px-5 [@media(orientation:landscape)_and_(max-height:500px)]:h-[56px]">
            <LocalizedClientLink
              href="/"
              aria-label="AYLA Home"
              className="font-serif text-[21px] leading-none tracking-[0.035em] text-[#F1EDE5]"
            >
              AYLA
            </LocalizedClientLink>

            <div className="flex h-full items-center gap-[18px]">
              <LocalizedClientLink
                href="/store"
                className="text-[8px] uppercase tracking-[0.24em] text-[#F1EDE5] transition-opacity duration-300 hover:opacity-55"
              >
                Shop
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/account"
                aria-label="Account"
                className="hidden text-[8px] uppercase tracking-[0.24em] text-[#F1EDE5] min-[430px]:block"
              >
                Account
              </LocalizedClientLink>

              <div className="h-full text-[#F1EDE5]">
                <Suspense
                  fallback={
                    <LocalizedClientLink
                      href="/cart"
                      className="text-[8px] uppercase tracking-[0.24em] text-[#F1EDE5]"
                    >
                      BAG
                    </LocalizedClientLink>
                  }
                >
                  <CartButton />
                </Suspense>
              </div>
            </div>
          </nav>
        </header>

        {/* Mobile collection entry */}
        <div className="absolute inset-x-5 bottom-7 z-20 text-[#F1EDE5] [@media(orientation:landscape)_and_(max-height:500px)]:hidden">
          <div className="border-t border-[#F1EDE5]/45 pt-3">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[7px] uppercase tracking-[0.3em] opacity-65">
                  Collection 001
                </p>

                <p className="mt-2 font-serif text-[24px] leading-none tracking-[-0.025em]">
                  Before Language
                </p>
              </div>

              <LocalizedClientLink
                href="/store"
                className="shrink-0 pb-[2px] text-[8px] uppercase tracking-[0.25em] transition-opacity duration-300 hover:opacity-55"
              >
                Explore →
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero