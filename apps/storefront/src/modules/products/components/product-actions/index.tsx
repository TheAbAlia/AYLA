"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce(
    (acc: Record<string, string>, varopt) => {
      if (varopt.option_id) {
        acc[varopt.option_id] = varopt.value
      }

      return acc
    },
    {}
  )
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<
    Record<string, string | undefined>
  >({})

  const [isAdding, setIsAdding] = useState(false)

  const countryCode = useParams().countryCode as string

  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(
        product.variants[0].options
      )

      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants?.length) {
      return
    }

    return product.variants.find((variant) => {
      const variantOptions = optionsAsKeymap(variant.options)

      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const setOptionValue = (
    optionId: string,
    value: string
  ) => {
    setOptions((previous) => ({
      ...previous,
      [optionId]: value,
    }))
  }

  const isValidVariant = useMemo(() => {
    return product.variants?.some((variant) => {
      const variantOptions = optionsAsKeymap(variant.options)

      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  /*
   * Keep existing search params.
   * This is important because audience=men / audience=women
   * must survive when v_id changes.
   */
  useEffect(() => {
    const params = new URLSearchParams(
      searchParams.toString()
    )

    const value = isValidVariant
      ? selectedVariant?.id
      : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    const query = params.toString()

    router.replace(
      query ? `${pathname}?${query}` : pathname,
      {
        scroll: false,
      }
    )
  }, [
    selectedVariant,
    isValidVariant,
    pathname,
    router,
    searchParams,
  ])

  const inStock = useMemo(() => {
    if (
      selectedVariant &&
      !selectedVariant.manage_inventory
    ) {
      return true
    }

    if (selectedVariant?.allow_backorder) {
      return true
    }

    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant.inventory_quantity || 0) > 0
    ) {
      return true
    }

    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(
    actionsRef,
    "0px"
  )

const handleAddToCart = async () => {
  if (!selectedVariant?.id) {
    return null
  }

  setIsAdding(true)

  try {
    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })

    const params = new URLSearchParams(searchParams.toString())
    params.set("bag", "open")

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    })

    router.refresh()
  } finally {
    setIsAdding(false)
  }
}

  const buttonLabel = !selectedVariant
    ? "Select size"
    : !inStock || !isValidVariant
      ? "Unavailable"
      : isAdding
        ? "Adding"
        : "Add to bag"

  return (
    <>
      <div
        ref={actionsRef}
        className="flex flex-col"
      >
        {(product.variants?.length ?? 0) > 1 && (
  <div className="flex flex-col gap-y-6">
    {(product.options || [])
      .filter((option) => {
        const title = (option.title || "").toLowerCase()

        return title === "size" || title.includes("size")
      })
      .map((option) => (
        <OptionSelect
          key={option.id}
          option={option}
          current={options[option.id]}
          updateOption={setOptionValue}
          title={option.title ?? "Size"}
          data-testid="product-options"
          disabled={!!disabled || isAdding}
        />
      ))}
  </div>
)}

        <ProductPrice
          product={product}
          variant={selectedVariant}
        />

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            isAdding ||
            !isValidVariant
          }
          data-testid="add-product-button"
          className="
            group
            flex
            min-h-[58px]
            lg:min-h-[54px]
            w-full
            items-center
            justify-between
            bg-[#191816]
            px-6
            lg:px-5
            text-[#F1EDE5]
            transition-all
            duration-300
            enabled:hover:bg-[#2B2925]
            disabled:cursor-not-allowed
            disabled:bg-[#191816]/30
          "
        >
          <span className="text-[9px] uppercase tracking-[0.26em]">
            {buttonLabel}
          </span>

          <span
            className="
              text-[15px]
              transition-transform
              duration-300
              group-enabled:group-hover:translate-x-1
            "
          >
            →
          </span>
        </button>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[7px] uppercase tracking-[0.2em] opacity-40">
            Secure checkout
          </span>

          <span className="text-[7px] uppercase tracking-[0.2em] opacity-40">
            Complimentary returns
          </span>
        </div>

        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
