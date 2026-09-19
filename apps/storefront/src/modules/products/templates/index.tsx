import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <main
      className="bg-[#EEEAE1] text-[#191816]"
      data-testid="product-container"
    >
      {/* PRODUCT */}
      <section className="px-5 pb-24 pt-8 md:px-[4.7%] md:pb-36 md:pt-12">
        {/* Top metadata */}
        <div className="mb-8 flex items-center justify-between border-t border-[#191816]/30 pt-4 md:mb-12">
          <span className="text-[8px] uppercase tracking-[0.28em]">
            Collection 001
          </span>

          <span className="text-[8px] uppercase tracking-[0.28em]">
            Before Language
          </span>
        </div>

        {/* Desktop: info / gallery / purchase */}
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-14">

          {/* LEFT */}
          <aside className="order-2 lg:order-1 lg:col-span-3">
            <div className="lg:sticky lg:top-[120px]">
              <ProductInfo product={product} />

              <div className="mt-12">
                <ProductTabs product={product} />
              </div>
            </div>
          </aside>

          {/* CENTER */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <ImageGallery images={images} />
          </div>

          {/* RIGHT */}
          <aside className="order-3 lg:col-span-3">
            <div className="lg:sticky lg:top-[120px]">
              <div className="mb-8 flex items-center justify-between border-b border-[#191816]/25 pb-3">
                <span className="text-[8px] uppercase tracking-[0.26em]">
                  Select
                </span>

                <span className="text-[8px] uppercase tracking-[0.26em] opacity-45">
                  AYLA 001
                </span>
              </div>

              <Suspense
                fallback={
                  <ProductActions
                    disabled
                    product={product}
                    region={region}
                  />
                }
              >
                <ProductActionsWrapper
                  id={product.id}
                  region={region}
                />
              </Suspense>

              {/* Material note */}
              <div className="mt-12 border-t border-[#191816]/25 pt-4">
                <div className="flex items-start justify-between gap-6">
                  <span className="text-[8px] uppercase tracking-[0.25em] opacity-45">
                    Material
                  </span>

                  <span className="max-w-[150px] text-right text-[8px] uppercase leading-[1.7] tracking-[0.2em]">
                    {product.material || "Heavyweight Cotton"}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* RELATED */}
      <section
        className="border-t border-[#191816]/30 px-5 py-24 md:px-[4.7%] md:py-32"
        data-testid="related-products-container"
      >
        <div className="mb-12 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.28em]">
            Continue Exploring
          </span>

          <span className="text-[9px] uppercase tracking-[0.28em] opacity-45">
            Collection 001
          </span>
        </div>

        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts
            product={product}
            countryCode={countryCode}
          />
        </Suspense>
      </section>
    </main>
  )
}

export default ProductTemplate
