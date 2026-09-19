import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

import { convertToLocale } from "@lib/util/money"
import { getAylaProductImages } from "@lib/util/ayla-product-images"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  currencyCode: string
}

const Item = ({ item, currencyCode }: ItemProps) => {
  const handle =
    "product_handle" in item
      ? item.product_handle
      : item.variant?.product?.handle

  const aylaImages = getAylaProductImages(handle)
  const image = aylaImages?.front || item.thumbnail

  const variantTitle =
    item.variant?.title &&
    item.variant.title !== "Default variant"
      ? item.variant.title
      : null

  return (
    <div
      className="grid grid-cols-[72px_1fr] gap-5 border-b border-[#191816]/20 py-5 md:grid-cols-[88px_1fr_auto] md:items-center md:gap-7"
      data-testid="product-row"
    >
      <div className="relative aspect-[4/5] w-[72px] overflow-hidden bg-[#E7E2D8] md:w-[88px]">
        {image ? (
          <Image
            src={image}
            alt={item.product_title || "AYLA product"}
            fill
            sizes="88px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="min-w-0">
        <div
          className="font-serif text-[20px] leading-[1.05] tracking-[-0.025em] md:text-[23px]"
          data-testid="product-name"
        >
          {item.product_title}
        </div>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[7px] uppercase tracking-[0.18em] opacity-50">
          {variantTitle && <span>{variantTitle}</span>}

          <span>
            Qty{" "}
            <span data-testid="product-quantity">{item.quantity}</span>
          </span>
        </div>
      </div>

      <div className="col-start-2 flex items-end justify-between gap-6 md:col-start-auto md:block md:text-right">
        <div className="text-[7px] uppercase tracking-[0.18em] opacity-40 md:mb-2">
          Total
        </div>

        <div className="text-[10px] tracking-[0.08em]">
          {convertToLocale({
            amount: item.total ?? 0,
            currency_code: currencyCode,
          })}
        </div>
      </div>
    </div>
  )
}

export default Item
