import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="min-h-[75vh] bg-[#EEEAE1] px-5 pb-24 pt-16 text-[#191816] md:px-[4.7%] md:pb-32 md:pt-20"
      data-testid="empty-cart-message"
    >
      <div className="border-t border-[#191816]/30 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-[8px] uppercase tracking-[0.28em]">
            Your Selection
          </span>

          <span className="text-[8px] uppercase tracking-[0.28em]">
            00 Pieces
          </span>
        </div>

        <h1 className="mt-12 font-serif text-[22vw] font-normal uppercase leading-[0.75] tracking-[-0.055em] md:mt-16 md:text-[10vw]">
          Bag
        </h1>
      </div>

      <div className="mt-20 grid border-t border-[#191816]/30 pt-6 md:grid-cols-12">
        <div className="md:col-span-4 md:col-start-9">
          <p className="max-w-[300px] text-[9px] uppercase leading-[1.8] tracking-[0.2em]">
            Your bag is currently empty.
            Explore Collection 001 — Before Language.
          </p>

          <LocalizedClientLink
            href="/store"
            className="group mt-8 flex min-h-[54px] w-full items-center justify-between bg-[#191816] px-5 text-[#F1EDE5]"
          >
            <span className="text-[9px] uppercase tracking-[0.26em]">
              Explore collection
            </span>

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default EmptyCartMessage
