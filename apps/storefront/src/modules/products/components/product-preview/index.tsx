import { getProductPrice } from "@lib/util/get-product-price"
import { getAylaProductImages } from "@lib/util/ayla-product-images"
import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import ProductImageCarousel from "./image-carousel"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
  audience,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  audience?: "men" | "women"
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const aylaImages = getAylaProductImages(product.handle)

  const carouselImages = aylaImages
    ? audience === "men"
      ? [
          aylaImages.male,
          aylaImages.front,
          aylaImages.detail,
        ]
      : audience === "women"
        ? [
            aylaImages.female,
            aylaImages.front,
            aylaImages.detail,
          ]
        : [
            aylaImages.front,
            aylaImages.detail,
            aylaImages.female,
            aylaImages.male,
          ]
    : []

  const productHref =
    audience === "men" || audience === "women"
      ? `/products/${product.handle}?audience=${audience}`
      : `/products/${product.handle}`

  return (
    <LocalizedClientLink
      href={productHref}
      className="group block"
    >
      <article data-testid="product-wrapper">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#E5E0D6]">
          {aylaImages ? (
            <ProductImageCarousel
              images={carouselImages}
              alt={product.title || "AYLA product"}
            />
          ) : (
            <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]">
              <Thumbnail
                thumbnail={product.thumbnail}
                images={product.images}
                size="full"
                isFeatured={isFeatured}
              />
            </div>
          )}
        </div>

        <div className="mt-4 border-t border-[#191816]/25 pt-3">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3
                className="text-[10px] font-normal uppercase leading-[1.5] tracking-[0.2em]"
                data-testid="product-title"
              >
                {product.title}
              </h3>

              {product.subtitle && (
                <p className="mt-1 text-[8px] uppercase tracking-[0.18em] opacity-45">
                  {product.subtitle}
                </p>
              )}
            </div>

            {cheapestPrice && (
              <div className="shrink-0 text-[10px] uppercase tracking-[0.15em]">
                <PreviewPrice price={cheapestPrice} />
              </div>
            )}
          </div>
        </div>
      </article>
    </LocalizedClientLink>
  )
}
