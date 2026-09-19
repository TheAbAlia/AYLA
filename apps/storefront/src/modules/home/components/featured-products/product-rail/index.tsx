import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function ProductRail({
  collection,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  return (
    <section className="bg-[#EEEAE1] text-[#191816]">
      <div className="px-5 pb-24 pt-20 md:px-[4.7%] md:pb-36 md:pt-32">
        {/* Top metadata */}
        <div className="mb-16 flex items-start justify-between border-t border-[#191816]/30 pt-4 md:mb-28">
          <span className="text-[9px] uppercase tracking-[0.28em]">
            001
          </span>

          <span className="text-[9px] uppercase tracking-[0.28em]">
            Drop 01
          </span>
        </div>

        {/* Collection introduction */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Main title */}
          <div className="md:col-span-7">
            <LocalizedClientLink
              href={`/collections/${collection.handle}`}
              className="group block"
            >
              <h2 className="max-w-[760px] font-serif text-[17vw] font-normal uppercase leading-[0.78] tracking-[-0.055em] transition-opacity duration-300 group-hover:opacity-65 md:text-[8.2vw]">
                Before
                <br />
                Language
              </h2>
            </LocalizedClientLink>
          </div>

          {/* Supporting copy */}
          <div className="flex flex-col justify-end md:col-span-3 md:col-start-10">
            <p className="max-w-[280px] text-[10px] uppercase leading-[1.7] tracking-[0.19em]">
              A study of form, memory and permanence.
              Clothing reduced to what remains.
            </p>
          </div>
        </div>

        {/* Collection CTA */}
        <div className="mt-20 flex items-center justify-between border-t border-[#191816]/30 pt-5 md:mt-32">
          <span className="text-[9px] uppercase tracking-[0.28em] opacity-50">
            Collection 001
          </span>

          <LocalizedClientLink
            href={`/collections/${collection.handle}`}
            className="group flex items-center gap-5 text-[10px] uppercase tracking-[0.24em]"
          >
            View Collection

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}