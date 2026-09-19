"use client"

import { HttpTypes } from "@medusajs/types"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import DeleteButton from "@modules/common/components/delete-button"
import { getAylaProductImages } from "@lib/util/ayla-product-images"

type CartDropdownProps = {
  cart?: HttpTypes.StoreCart | null
}

const DARK = "#191816"
const BONE = "#EEEAE1"
const CTA_TEXT = "#F1EDE5"

const formatPrice = (
  amount: number,
  currencyCode: string
) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: currencyCode,
  }).format(amount)

export default function CartDropdown({
  cart,
}: CartDropdownProps) {
  const [open, setOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const items = cart?.items ?? []

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const currencyCode =
    cart?.currency_code?.toUpperCase() ?? "EUR"

  // Close dropdown after navigation
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      )
    }
  }, [])

  // Close dropdown with Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative flex h-full items-center"
    >
      {/* BAG TRIGGER */}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label="Open shopping bag"
        className="relative z-[110] flex h-full items-center text-[10px] font-normal uppercase tracking-[0.28em] text-inherit transition-opacity duration-300 hover:opacity-55"
      >
        BAG
        {itemCount > 0 && (
          <span className="ml-1">
            ({itemCount})
          </span>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 top-full z-[100] pt-4">
          <div
            className="w-[420px] max-w-[calc(100vw-32px)] border border-[#191816]/15 bg-[#EEEAE1] shadow-[0_24px_60px_rgba(25,24,22,0.10)]"
            style={{
              color: DARK,
              backgroundColor: BONE,
            }}
          >
            {/* HEADER */}
            <div
              className="flex items-end justify-between border-b border-[#191816]/15 px-6 py-5"
              
            >
              <div >
                <p
                  className="mb-2 text-[8px] uppercase tracking-[0.26em] opacity-40"
                  
                >
                  AYLA
                </p>

                <p
                  className="font-serif text-[25px] leading-none"
                  
                >
                  Bag
                </p>
              </div>

              <span
                className="text-[8px] uppercase tracking-[0.22em] opacity-40"
                
              >
                {itemCount}{" "}
                {itemCount === 1 ? "item" : "items"}
              </span>
            </div>

            {items.length > 0 ? (
              <>
                {/* ITEMS */}
                <div className="max-h-[390px] overflow-y-auto">
                  {items.map((item) => {
                    const handle =
                      item.product_handle ?? ""

                    const aylaImages =
                      getAylaProductImages(handle)

                    const image =
                      aylaImages?.front ||
                      item.thumbnail ||
                      undefined

                    const size =
                      item.variant?.options?.find(
                        (option) =>
                          option.option?.title === "Size"
                      )?.value ||
                      item.variant_title ||
                      ""

                    const lineTotal =
                      item.total ??
                      item.unit_price * item.quantity

                    return (
                      <article
                        key={item.id}
                        className="grid grid-cols-[82px_minmax(0,1fr)_auto] gap-4 border-b border-[#191816]/10 px-6 py-5"
                        
                      >
                        {/* IMAGE */}
                        <LocalizedClientLink
                          href={`/products/${handle}`}
                          onClick={() => setOpen(false)}
                          className="block"
                        >
                          <div className="aspect-[4/5] overflow-hidden bg-[#E4DED4]">
                            {image && (
                              <img
                                src={image}
                                alt={
                                  item.product_title ??
                                  "AYLA product"
                                }
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                        </LocalizedClientLink>

                        {/* PRODUCT DETAILS */}
                        <div
                          className="flex min-w-0 flex-col"
                          
                        >
                          <LocalizedClientLink
                            href={`/products/${handle}`}
                            onClick={() => setOpen(false)}
                            className="font-serif text-[15px] leading-[1.15] transition-opacity hover:opacity-50"
                            
                          >
                            {item.product_title}
                          </LocalizedClientLink>

                          <div
                            className="mt-3 flex gap-4"
                            
                          >
                            {size && (
                              <span
                                className="text-[8px] uppercase tracking-[0.2em] opacity-45"
                                >
                                Size {size}
                              </span>
                            )}

                            <span
                              className="text-[8px] uppercase tracking-[0.2em] opacity-45"
                              
                            >
                              Qty {item.quantity}
                            </span>
                          </div>

                          <div className="mt-auto pt-3">
                            <DeleteButton
                              id={item.id}
                              className="text-[8px] uppercase tracking-[0.18em] opacity-40 transition-opacity hover:opacity-100"
                              
                            >
                              Remove
                            </DeleteButton>
                          </div>
                        </div>

                        {/* PRICE */}
                        <span
                          className="whitespace-nowrap text-[10px]"
                          
                        >
                          {formatPrice(
                            lineTotal,
                            currencyCode
                          )}
                        </span>
                      </article>
                    )
                  })}
                </div>

                {/* SUBTOTAL */}
                <div
                  className="flex items-end justify-between px-6 py-5"
                  
                >
                  <div >
                    <p
                      className="text-[8px] uppercase tracking-[0.22em] opacity-40"
                      
                    >
                      Subtotal
                    </p>

                    <p
                      className="mt-1 text-[7px] uppercase tracking-[0.16em] opacity-30"
                      
                    >
                      Excl. shipping
                    </p>
                  </div>

                  <p
                    className="font-serif text-[20px] leading-none"
                    
                  >
                    {formatPrice(
                      cart?.subtotal ?? 0,
                      currencyCode
                    )}
                  </p>
                </div>

                {/* VIEW BAG */}
                <div className="px-6 pb-6">
                  <LocalizedClientLink
                    href="/cart"
                    onClick={() => setOpen(false)}
                    className="flex h-[54px] w-full items-center justify-center bg-[#191816] transition-opacity duration-300 hover:opacity-80"
                    style={{
                      backgroundColor: DARK,
                      color: CTA_TEXT,
                    }}
                  >
                    <span
                      className="text-[9px] font-normal uppercase tracking-[0.28em]"
                      style={{ color: CTA_TEXT }}
                    >
                      View bag →
                    </span>
                  </LocalizedClientLink>
                </div>

                {/* FOOTER */}
                <div
                  className="flex items-center justify-between border-t border-[#191816]/10 px-6 py-3"
                  
                >
                  <span
                    className="text-[6px] uppercase tracking-[0.22em] opacity-30"
                    
                  >
                    Secure checkout
                  </span>

                  <span
                    className="text-[6px] uppercase tracking-[0.22em] opacity-30"
                    
                  >
                    Complimentary returns
                  </span>
                </div>
              </>
            ) : (
              /* EMPTY BAG */
              <div
                className="px-6 py-12 text-center"
                
              >
                <p
                  className="font-serif text-[21px]"
                  
                >
                  Your bag is empty.
                </p>

                <LocalizedClientLink
                  href="/store"
                  onClick={() => setOpen(false)}
                  className="mt-7 inline-block border-b border-[#191816] pb-1 text-[8px] uppercase tracking-[0.24em]"
                  
                >
                  Explore collection
                </LocalizedClientLink>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}