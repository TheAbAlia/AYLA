import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full bg-[#EEEAE1] text-[#191816]">
      <header className="border-b border-[#191816]/20">
        <nav className="relative flex h-[68px] items-center px-5 md:h-[88px] md:px-[4.7%]">
          <div className="flex flex-1 items-center">
            <LocalizedClientLink
              href="/cart"
              className="text-[8px] uppercase tracking-[0.24em] transition-opacity hover:opacity-50"
              data-testid="back-to-cart-link"
            >
              ← Bag
            </LocalizedClientLink>
          </div>

          <LocalizedClientLink
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-serif text-[21px] leading-none tracking-[0.04em] transition-opacity hover:opacity-50 md:text-[27px]"
            data-testid="store-link"
          >
            AYLA
          </LocalizedClientLink>

          <div className="flex flex-1 justify-end">
            <span className="text-[8px] uppercase tracking-[0.24em] opacity-45">
              Secure checkout
            </span>
          </div>
        </nav>
      </header>

      {children}
    </div>
  )
}
