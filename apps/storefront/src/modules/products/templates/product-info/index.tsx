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
          className="mb-8 inline-block text-[8px] uppercase tracking-[0.28em] opacity-50 transition-opacity duration-300 hover:opacity-100"
        >
          {product.collection.title}
        </LocalizedClientLink>
      )}

      <h1
        className="max-w-[340px] font-serif text-[42px] font-normal uppercase leading-[0.9] tracking-[-0.04em] md:text-[48px] lg:text-[3.4vw]"
        data-testid="product-title"
      >
        {product.title}
      </h1>

      {product.subtitle && (
        <p className="mt-5 text-[8px] uppercase tracking-[0.22em] opacity-45">
          {product.subtitle}
        </p>
      )}

      {product.description && (
        <p
          className="mt-9 max-w-[290px] whitespace-pre-line text-[10px] leading-[1.8] tracking-[0.08em] opacity-70"
          data-testid="product-description"
        >
          {product.description}
        </p>
      )}
    </div>
  )
}

export default ProductInfo
