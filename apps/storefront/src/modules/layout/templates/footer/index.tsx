import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Footer() {
  const footerLink =
    "text-[9px] uppercase tracking-[0.24em] transition-opacity duration-300 hover:opacity-45"

  return (
    <footer className="bg-[#EEEAE1] px-5 pb-8 pt-20 text-[#191816] md:px-[4.7%] md:pb-10 md:pt-28">

      {/* TOP RULE */}
      <div className="border-t border-[#191816]/30" />

      {/* MAIN FOOTER */}
      <div className="grid grid-cols-1 gap-y-16 py-12 md:grid-cols-12 md:py-16">

        {/* BRAND */}
        <div className="md:col-span-5">
          <LocalizedClientLink
            href="/"
            className="inline-block font-serif text-[16vw] font-normal uppercase leading-[0.75] tracking-[-0.045em] transition-opacity duration-300 hover:opacity-55 md:text-[7vw]"
          >
            AYLA
          </LocalizedClientLink>

          <p className="mt-8 max-w-[310px] text-[9px] uppercase leading-[1.8] tracking-[0.22em]">
            Clothing as a quieter
            <br />
            form of belonging.
          </p>
        </div>

        {/* COLLECTION */}
        <div className="md:col-span-2 md:col-start-7">
          <p className="mb-6 text-[8px] uppercase tracking-[0.28em] opacity-45">
            Collection
          </p>

          <div className="flex flex-col gap-3">
            <LocalizedClientLink
              href="/collections/before-language"
              className={footerLink}
            >
              001
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/collections/before-language"
              className={footerLink}
            >
              Before Language
            </LocalizedClientLink>
          </div>
        </div>

        {/* SHOP */}
        <div className="md:col-span-2">
          <p className="mb-6 text-[8px] uppercase tracking-[0.28em] opacity-45">
            Shop
          </p>

          <div className="flex flex-col gap-3">
            <LocalizedClientLink
              href="/store"
              className={footerLink}
            >
              All
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/store?audience=men"
              className={footerLink}
            >
              Men
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/store?audience=women"
              className={footerLink}
            >
              Women
            </LocalizedClientLink>
          </div>
        </div>

        {/* INFORMATION */}
        <div className="md:col-span-2">
          <p className="mb-6 text-[8px] uppercase tracking-[0.28em] opacity-45">
            Information
          </p>

          <div className="flex flex-col gap-3">
            <LocalizedClientLink
              href="/about"
              className={footerLink}
            >
              About
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/contact"
              className={footerLink}
            >
              Contact
            </LocalizedClientLink>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col gap-5 border-t border-[#191816]/30 pt-5 md:flex-row md:items-end md:justify-between">

        <div className="flex gap-8">
          <span className="text-[8px] uppercase tracking-[0.24em] opacity-50">
            Collection 001
          </span>

          <span className="text-[8px] uppercase tracking-[0.24em] opacity-50">
            Before Language
          </span>
        </div>

        <p className="text-[8px] uppercase tracking-[0.24em] opacity-50">
          © {new Date().getFullYear()} AYLA
        </p>

      </div>
    </footer>
  )
}
