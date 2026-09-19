"use client"

import { updateLineItem } from "@lib/data/cart"
import { getAylaProductImages } from "@lib/util/ayla-product-images"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
  index?: number
}

const Item = ({
  item,
  type = "full",
  currencyCode,
  index = 0,
}: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const aylaImages = getAylaProductImages(item.product_handle)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory
    ? 10
    : maxQtyFromInventory

  /*
   * Compact version used by cart previews/dropdowns.
   */
  if (type === "preview") {
    return (
      <div
        className="flex gap-4 border-b border-[#191816]/15 py-4"
        data-testid="product-row"
      >
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className="relative block aspect-[4/5] w-16 shrink-0 overflow-hidden bg-[#E3DED3]"
        >
          {aylaImages ? (
            <img
              src={aylaImages.front}
              alt={item.product_title || "AYLA product"}
              className="h-full w-full object-cover"
            />
          ) : (
            <Thumbnail
              thumbnail={item.thumbnail}
              images={item.variant?.product?.images}
              size="square"
            />
          )}
        </LocalizedClientLink>

        <div className="flex min-w-0 flex-1 justify-between gap-4">
          <div>
            <LocalizedClientLink
              href={`/products/${item.product_handle}`}
              className="text-[9px] uppercase leading-[1.5] tracking-[0.18em]"
            >
              {item.product_title}
            </LocalizedClientLink>

            <div className="mt-2 text-[8px] uppercase tracking-[0.16em] opacity-45">
              <LineItemOptions variant={item.variant} />
            </div>

            <p className="mt-2 text-[7px] uppercase tracking-[0.18em] opacity-40">
              Qty {String(item.quantity).padStart(2, "0")}
            </p>
          </div>

          <div className="shrink-0 text-right text-[9px]">
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>
        </div>
      </div>
    )
  }

  /*
   * Full AYLA Bag line item.
   *
   * IMPORTANT:
   * This intentionally uses <article>/<div>, NOT Table.Row.
   */
  return (
    <article
      className="
        grid
        grid-cols-[105px_1fr]
        gap-5
        border-t
        border-[#191816]/25
        py-6
        first:border-t-0
        md:grid-cols-[180px_1fr]
        md:gap-8
        md:py-8
      "
      data-testid="product-row"
    >
      {/* IMAGE */}
      <LocalizedClientLink
        href={`/products/${item.product_handle}`}
        className="relative block aspect-[4/5] overflow-hidden bg-[#E3DED3]"
      >
        {aylaImages ? (
          <img
            src={aylaImages.front}
            alt={item.product_title || "AYLA product"}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.015]"
          />
        ) : (
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="full"
          />
        )}

        <span className="absolute bottom-3 left-3 text-[7px] uppercase tracking-[0.22em] text-[#F1EDE5]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </LocalizedClientLink>

      {/* INFORMATION */}
      <div className="flex min-w-0 flex-col">
        {/* TITLE / PRICE */}
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <LocalizedClientLink
              href={`/products/${item.product_handle}`}
              className="text-[10px] uppercase leading-[1.5] tracking-[0.2em] transition-opacity duration-300 hover:opacity-50"
              data-testid="product-title"
            >
              {item.product_title}
            </LocalizedClientLink>

            <p className="mt-2 text-[7px] uppercase tracking-[0.2em] opacity-40">
              Collection 001 — Before Language
            </p>
          </div>

          <div className="shrink-0 text-right text-[10px] tracking-[0.1em]">
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>
        </div>

        {/* VARIANT */}
        <div className="mt-6 border-t border-[#191816]/15 pt-4">
          <span className="mb-2 block text-[7px] uppercase tracking-[0.22em] opacity-40">
            Selection
          </span>

          <div
            className="text-[8px] uppercase tracking-[0.18em] opacity-65"
            data-testid="product-variant"
          >
            <LineItemOptions variant={item.variant} />
          </div>
        </div>

        {/* QUANTITY / REMOVE */}
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
          <div>
            <span className="mb-2 block text-[7px] uppercase tracking-[0.22em] opacity-40">
              Quantity
            </span>

            <div className="flex items-center gap-3">
              <CartItemSelect
                value={item.quantity}
                onChange={(event) =>
                  changeQuantity(parseInt(event.target.value))
                }
                data-testid="product-select-button"
              >
                {Array.from(
                  {
                    length: Math.min(maxQuantity, 10),
                  },
                  (_, i) => (
                    <option
                      value={i + 1}
                      key={i + 1}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  )
                )}
              </CartItemSelect>

              {updating && <Spinner />}
            </div>
          </div>

          <div className="text-[8px] uppercase tracking-[0.2em] opacity-55 transition-opacity duration-300 hover:opacity-100">
            <DeleteButton
              id={item.id}
              data-testid="product-delete-button"
            />
          </div>
        </div>

        {error && (
          <div className="mt-4">
            <ErrorMessage
              error={error}
              data-testid="product-error-message"
            />
          </div>
        )}
      </div>
    </article>
  )
}

export default Item
