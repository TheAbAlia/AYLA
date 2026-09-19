"use client"

import React from "react"
import { HttpTypes } from "@medusajs/types"

import { applyPromotions } from "@lib/data/cart"
import ErrorMessage from "../error-message"

const DiscountCode = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  const { promotions = [] } = cart

  const addPromotionCode = async (formData: FormData) => {
    setErrorMessage("")

    const code = formData.get("code")

    if (!code) return

    const codes = promotions
      .filter((promotion) => promotion.code)
      .map((promotion) => promotion.code!)

    codes.push(code.toString())

    try {
      await applyPromotions(codes)
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : String(e))
    }
  }

  const removePromotionCode = async (code: string) => {
    await applyPromotions(
      promotions
        .filter((promotion) => promotion.code && promotion.code !== code)
        .map((promotion) => promotion.code!)
    )
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        data-testid="add-discount-button"
        className="flex w-full items-center justify-between text-[8px] uppercase tracking-[0.22em] opacity-55 transition-opacity hover:opacity-100"
      >
        <span>Promotion code</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <form action={addPromotionCode} className="mt-5">
          <div className="flex items-end gap-4">
            <input
              id="promotion-input"
              name="code"
              type="text"
              data-testid="discount-input"
              placeholder="Code"
              className="min-w-0 flex-1 rounded-none border-0 border-b border-[#191816]/30 bg-transparent px-0 py-3 text-[11px] uppercase tracking-[0.12em] outline-none placeholder:opacity-35 focus:border-[#191816] focus:ring-0"
            />

            <button
              type="submit"
              data-testid="discount-apply-button"
              className="border-b border-[#191816] py-3 text-[8px] uppercase tracking-[0.2em]"
            >
              Apply
            </button>
          </div>

          <ErrorMessage
            error={errorMessage}
            data-testid="discount-error-message"
          />
        </form>
      )}

      {promotions.length > 0 && (
        <div className="mt-5 space-y-3">
          {promotions.map((promotion) => (
            <div
              key={promotion.id}
              className="flex items-center justify-between text-[8px] uppercase tracking-[0.18em]"
              data-testid="discount-row"
            >
              <span data-testid="discount-code">{promotion.code}</span>

              {!promotion.is_automatic && promotion.code && (
                <button
                  type="button"
                  onClick={() => removePromotionCode(promotion.code!)}
                  data-testid="remove-discount-button"
                  className="opacity-40 transition-opacity hover:opacity-100"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DiscountCode
