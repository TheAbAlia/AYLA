"use client"

import { Radio, RadioGroup } from "@headlessui/react"
import { setShippingMethod } from "@lib/data/cart"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const PICKUP_OPTION_ON = "__PICKUP_ON"
const PICKUP_OPTION_OFF = "__PICKUP_OFF"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

function formatAddress(address: HttpTypes.StoreCartAddress) {
  if (!address) return ""

  return [
    address.address_1,
    address.address_2,
    [address.postal_code, address.city].filter(Boolean).join(" "),
    address.country_code?.toUpperCase(),
  ]
    .filter(Boolean)
    .join(", ")
}

const Shipping = ({
  cart,
  availableShippingMethods,
}: ShippingProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)
  const [showPickupOptions, setShowPickupOptions] =
    useState(PICKUP_OPTION_OFF)

  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({})

  const [error, setError] = useState<string | null>(null)

  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const shippingMethods = availableShippingMethods?.filter(
    (method) =>
      (
        method as unknown as {
          service_zone?: {
            fulfillment_set?: {
              type?: string
              location?: {
                address: HttpTypes.StoreCartAddress
              }
            }
          }
        }
      ).service_zone?.fulfillment_set?.type !== "pickup"
  )

  const pickupMethods = availableShippingMethods?.filter(
    (method) =>
      (
        method as unknown as {
          service_zone?: {
            fulfillment_set?: {
              type?: string
              location?: {
                address: HttpTypes.StoreCartAddress
              }
            }
          }
        }
      ).service_zone?.fulfillment_set?.type === "pickup"
  )

  const hasPickupOptions = !!pickupMethods?.length

  useEffect(() => {
    setIsLoadingPrices(true)

    const calculated =
      shippingMethods?.filter(
        (method) => method.price_type === "calculated"
      ) || []

    if (!calculated.length) {
      setIsLoadingPrices(false)
    } else {
      Promise.allSettled(
        calculated.map((method) =>
          calculatePriceForShippingOption(method.id, cart.id)
        )
      ).then((results) => {
        const prices: Record<string, number> = {}

        results.forEach((result) => {
          if (result.status === "fulfilled" && result.value?.id) {
            prices[result.value.id] = result.value.amount ?? 0
          }
        })

        setCalculatedPricesMap(prices)
        setIsLoadingPrices(false)
      })
    }

    if (pickupMethods?.find((method) => method.id === shippingMethodId)) {
      setShowPickupOptions(PICKUP_OPTION_ON)
    }
  }, [availableShippingMethods])

  useEffect(() => {
    setError(null)
  }, [isOpen])

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const handleSetShippingMethod = async (
    id: string,
    variant: "shipping" | "pickup"
  ) => {
    setError(null)

    setShowPickupOptions(
      variant === "pickup" ? PICKUP_OPTION_ON : PICKUP_OPTION_OFF
    )

    const previousId = shippingMethodId

    setIsLoading(true)
    setShippingMethodId(id)

    try {
      await setShippingMethod({
        cartId: cart.id,
        shippingMethodId: id,
      })
    } catch (err) {
      setShippingMethodId(previousId)
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsLoading(false)
    }
  }

  const OptionMarker = ({ selected }: { selected: boolean }) => (
    <span
      className={`flex h-[13px] w-[13px] shrink-0 items-center justify-center rounded-full border ${
        selected
          ? "border-[#191816]"
          : "border-[#191816]/35"
      }`}
    >
      {selected && (
        <span className="h-[5px] w-[5px] rounded-full bg-[#191816]" />
      )}
    </span>
  )

  return (
    <section className="border-b border-[#191816]/25 py-10 md:py-12">
      <div className="flex items-start justify-between">
        <div className="flex items-baseline gap-4 md:gap-5">
          <span className="text-[8px] uppercase tracking-[0.28em] opacity-35">
            02
          </span>

          <h2
            className={`font-serif text-[28px] font-normal leading-none tracking-[-0.03em] md:text-[38px] md:tracking-[-0.035em] ${
              !isOpen && !cart.shipping_methods?.length
                ? "opacity-35"
                : ""
            }`}
          >
            Delivery
          </h2>
        </div>

        {!isOpen &&
          cart.shipping_address &&
          cart.billing_address &&
          cart.email && (
            <button
              type="button"
              onClick={handleEdit}
              data-testid="edit-delivery-button"
              className="text-[8px] uppercase tracking-[0.22em] opacity-45 transition-opacity hover:opacity-100"
            >
              Edit
            </button>
          )}
      </div>

      {isOpen ? (
        <div className="pt-10">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[8px] uppercase tracking-[0.22em] opacity-45">
              Delivery method
            </p>

            <p className="text-[7px] uppercase tracking-[0.2em] opacity-30">
              Select one
            </p>
          </div>

          <div data-testid="delivery-options-container">
            {hasPickupOptions && (
              <RadioGroup
                value={showPickupOptions}
                onChange={() => {
                  const id = pickupMethods?.find(
                    (option) => !option.insufficient_inventory
                  )?.id

                  if (id) {
                    handleSetShippingMethod(id, "pickup")
                  }
                }}
              >
                <Radio
                  value={PICKUP_OPTION_ON}
                  data-testid="delivery-option-radio"
                  className="flex cursor-pointer items-center justify-between border-t border-[#191816]/20 py-5"
                >
                  <div className="flex items-center gap-4">
                    <OptionMarker
                      selected={showPickupOptions === PICKUP_OPTION_ON}
                    />

                    <span className="text-[9px] uppercase tracking-[0.16em]">
                      Pick up your order
                    </span>
                  </div>

                  <span className="text-[9px]">—</span>
                </Radio>
              </RadioGroup>
            )}

            <RadioGroup
              value={shippingMethodId}
              onChange={(value) => {
                if (value) {
                  handleSetShippingMethod(value, "shipping")
                }
              }}
            >
              {shippingMethods?.map((option) => {
                const calculatedPrice = calculatedPricesMap[option.id]

                const disabled =
                  option.price_type === "calculated" &&
                  !isLoadingPrices &&
                  typeof calculatedPrice !== "number"

                return (
                  <Radio
                    key={option.id}
                    value={option.id}
                    disabled={disabled}
                    data-testid="delivery-option-radio"
                    className={`flex items-center justify-between border-t border-[#191816]/20 py-5 ${
                      disabled
                        ? "cursor-not-allowed opacity-30"
                        : "cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <OptionMarker
                        selected={option.id === shippingMethodId}
                      />

                      <span className="text-[9px] uppercase tracking-[0.16em]">
                        {option.name}
                      </span>
                    </div>

                    <span className="text-[10px]">
                      {option.price_type === "flat"
                        ? convertToLocale({
                            amount: option.amount!,
                            currency_code: cart.currency_code,
                          })
                        : typeof calculatedPrice === "number"
                        ? convertToLocale({
                            amount: calculatedPrice,
                            currency_code: cart.currency_code,
                          })
                        : isLoadingPrices
                        ? "Calculating"
                        : "—"}
                    </span>
                  </Radio>
                )
              })}
            </RadioGroup>

            <div className="border-t border-[#191816]/20" />
          </div>

          {showPickupOptions === PICKUP_OPTION_ON && (
            <div className="mt-10">
              <p className="mb-6 text-[8px] uppercase tracking-[0.22em] opacity-45">
                Collection point
              </p>

              <RadioGroup
                value={shippingMethodId}
                onChange={(value) => {
                  if (value) {
                    handleSetShippingMethod(value, "pickup")
                  }
                }}
              >
                {pickupMethods?.map((option) => {
                  const address = (
                    option as unknown as {
                      service_zone?: {
                        fulfillment_set?: {
                          location?: {
                            address: HttpTypes.StoreCartAddress
                          }
                        }
                      }
                    }
                  ).service_zone?.fulfillment_set?.location?.address

                  return (
                    <Radio
                      key={option.id}
                      value={option.id}
                      disabled={option.insufficient_inventory}
                      data-testid="delivery-option-radio"
                      className="flex cursor-pointer items-start justify-between border-t border-[#191816]/20 py-5 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <div className="flex items-start gap-4">
                        <OptionMarker
                          selected={option.id === shippingMethodId}
                        />

                        <div>
                          <p className="text-[9px] uppercase tracking-[0.16em]">
                            {option.name}
                          </p>

                          {address && (
                            <p className="mt-2 max-w-[380px] text-[8px] uppercase leading-[1.6] tracking-[0.12em] opacity-45">
                              {formatAddress(address)}
                            </p>
                          )}
                        </div>
                      </div>

                      <span className="text-[10px]">
                        {convertToLocale({
                          amount: option.amount!,
                          currency_code: cart.currency_code,
                        })}
                      </span>
                    </Radio>
                  )
                })}
              </RadioGroup>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="delivery-option-error-message"
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              isLoading || !(cart.shipping_methods?.length ?? 0)
            }
            data-testid="submit-delivery-option-button"
            className="mt-10 flex h-[56px] w-full items-center justify-between bg-[#191816] px-6 text-[#EEEAE1] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-30 md:w-[280px]"
          >
            <span className="text-[8px] uppercase tracking-[0.24em]">
              {isLoading ? "Updating" : "Continue to payment"}
            </span>

            <span>→</span>
          </button>
        </div>
      ) : (
        (cart.shipping_methods?.length ?? 0) > 0 && (
          <div className="mt-8 pl-0 md:pl-[42px]">
            <p className="mb-2 text-[7px] uppercase tracking-[0.22em] opacity-35">
              Method
            </p>

            <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.14em]">
              <span>{cart.shipping_methods!.at(-1)!.name}</span>

              <span className="opacity-35">/</span>

              <span>
                {convertToLocale({
                  amount: cart.shipping_methods!.at(-1)!.amount!,
                  currency_code: cart.currency_code,
                })}
              </span>
            </div>
          </div>
        )
      )}
    </section>
  )
}

export default Shipping
