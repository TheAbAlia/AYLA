import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      {product.collection && (
        <LocalizedClientLink
          href={`/collections/${product.collection.handle}`}
          className="mb-5 inline-block text-[7px] uppercase tracking-[0.28em] opacity-45 transition-opacity duration-300 hover:opacity-100 md:mb-6 lg:mb-8 lg:text-[8px]"
        >
          {product.collection.title}
        </LocalizedClientLink>
      )}

      <h1
        className="max-w-[340px] font-serif text-[36px] font-normal uppercase leading-[0.92] tracking-[-0.035em] md:text-[44px] lg:text-[3.4vw] lg:leading-[0.9] lg:tracking-[-0.04em]"
        data-testid="product-title"
      >
        {product.title}
      </h1>

      {product.subtitle && (
        <p className="mt-4 text-[7px] uppercase tracking-[0.22em] opacity-45 md:text-[8px] lg:mt-5">
          {product.subtitle}
        </p>
      )}

      {product.description && (
        <p
          className="mt-6 max-w-[320px] whitespace-pre-line text-[9px] leading-[1.8] tracking-[0.07em] opacity-65 md:mt-7 md:text-[10px] lg:mt-9 lg:max-w-[290px] lg:tracking-[0.08em] lg:opacity-70"
          data-testid="product-description"
        >
          {product.description}
        </p>
      )}
    </div>
  )
}

export default ProductInfo
