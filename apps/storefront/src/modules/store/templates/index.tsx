import { Suspense } from "react"

import { OptionValueIds } from "@lib/util/product-option-filters"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  optionValueIds,
  audience,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
  audience?: "men" | "women"
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const title =
    audience === "men"
      ? "Men"
      : audience === "women"
        ? "Women"
        : "Shop"

  return (
    <main
      className="min-h-screen bg-[#EEEAE1] text-[#191816]"
      data-testid="category-container"
    >
      {/* Editorial header */}
      <section className="px-5 pb-12 pt-16 md:px-[4.7%] md:pb-24 md:pt-32">
        <div className="flex items-center justify-between border-t border-[#191816]/30 pt-4">
          <span className="text-[9px] uppercase tracking-[0.28em]">
            Collection 001
          </span>

          <span className="text-[9px] uppercase tracking-[0.28em]">
            Before Language
          </span>
        </div>

        <div className="mt-10 md:mt-20">
          <h1
            className="font-serif text-[17vw] font-normal uppercase leading-[0.82] tracking-[-0.05em] md:text-[10vw] md:leading-[0.78] md:tracking-[-0.055em]"
            data-testid="store-page-title"
          >
            {title}
          </h1>
        </div>

        {/* Shop navigation */}
        <div className="mt-10 flex gap-7 border-b border-[#191816]/30 pb-4 md:mt-20 md:gap-8">
          <LocalizedClientLink
            href="/store"
            className={`text-[9px] uppercase tracking-[0.25em] transition-opacity hover:opacity-50 ${
              !audience ? "opacity-100" : "opacity-40"
            }`}
          >
            All
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/store?audience=men"
            className={`text-[9px] uppercase tracking-[0.25em] transition-opacity hover:opacity-50 ${
              audience === "men" ? "opacity-100" : "opacity-40"
            }`}
          >
            Men
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/store?audience=women"
            className={`text-[9px] uppercase tracking-[0.25em] transition-opacity hover:opacity-50 ${
              audience === "women" ? "opacity-100" : "opacity-40"
            }`}
          >
            Women
          </LocalizedClientLink>
        </div>
      </section>

      {/* Products */}
      <section className="px-5 pb-24 md:px-[4.7%] md:pb-40">
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            optionValueIds={optionValueIds}
            audience={audience}
          />
        </Suspense>
      </section>
    </main>
  )
}

export default StoreTemplate
