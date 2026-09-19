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

  const Actions = () => (
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
  )

  const Material = () => (
    <div className="border-t border-[#191816]/20 pt-4">
      <div className="flex items-start justify-between gap-6">
        <span className="text-[8px] uppercase tracking-[0.25em] opacity-45">
          Material
        </span>

        <span className="max-w-[180px] text-right text-[8px] uppercase leading-[1.7] tracking-[0.2em]">
          {product.material || "Heavyweight Cotton"}
        </span>
      </div>
    </div>
  )

  return (
    <main
      className="bg-[#EEEAE1] text-[#191816]"
      data-testid="product-container"
    >
      <section className="px-5 pb-20 pt-6 md:px-[4.7%] md:pb-28 md:pt-10 lg:pb-36 lg:pt-12">
        {/* Collection metadata */}
        <div className="mb-5 flex items-center justify-between border-t border-[#191816]/30 pt-3 md:mb-8 md:pt-4 lg:mb-12">
          <span className="text-[8px] uppercase tracking-[0.28em]">
            Collection 001
          </span>

          <span className="text-[8px] uppercase tracking-[0.28em]">
            Before Language
          </span>
        </div>

        {/* =====================================================
            MOBILE / TABLET
        ===================================================== */}
        <div className="lg:hidden">
          {/* 01 — Product imagery */}
          <ImageGallery images={images} />

          {/* 02 — Product identity */}
          <div className="border-b border-[#191816]/20 pb-8 pt-8 md:pb-10 md:pt-10">
            <ProductInfo product={product} />
          </div>

          {/* 03 — Purchase */}
          <div className="py-8 md:py-10">
            <div className="mb-7 flex items-center justify-between border-b border-[#191816]/20 pb-3">
              <span className="text-[8px] uppercase tracking-[0.26em]">
                Select
              </span>

              <span className="text-[8px] uppercase tracking-[0.26em] opacity-45">
                AYLA 001
              </span>
            </div>

            <Actions />
          </div>

          {/* 04 — Material / product details */}
          <div className="space-y-8 border-t border-[#191816]/20 pt-8">
            <Material />

            <ProductTabs product={product} />
          </div>
        </div>

        {/* =====================================================
            DESKTOP
        ===================================================== */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-x-10 lg:gap-y-10 xl:gap-x-14">
          {/* LEFT — identity / information */}
          <aside className="lg:col-span-3">
            <div className="sticky top-[120px]">
              <ProductInfo product={product} />

              <div className="mt-12">
                <ProductTabs product={product} />
              </div>
            </div>
          </aside>

          {/* CENTER — imagery */}
          <div className="lg:col-span-6">
            <ImageGallery images={images} />
          </div>

          {/* RIGHT — purchase */}
          <aside className="lg:col-span-3">
            <div className="sticky top-[120px]">
              <div className="mb-8 flex items-center justify-between border-b border-[#191816]/25 pb-3">
                <span className="text-[8px] uppercase tracking-[0.26em]">
                  Select
                </span>

                <span className="text-[8px] uppercase tracking-[0.26em] opacity-45">
                  AYLA 001
                </span>
              </div>

              <Actions />

              <div className="mt-12">
                <Material />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* RELATED */}
      <section
        className="border-t border-[#191816]/30 px-5 py-16 md:px-[4.7%] md:py-24 lg:py-32"
        data-testid="related-products-container"
      >
        <div className="mb-8 flex items-center justify-between md:mb-12">
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
