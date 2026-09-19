"use client"

import { HttpTypes } from "@medusajs/types"
import { useSearchParams } from "next/navigation"

import PaymentButton from "../payment-button"

const Review = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const searchParams = useSearchParams()
  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard = !!(
    (cart as unknown as Record<string, unknown>)?.gift_cards &&
    (
      (cart as unknown as Record<string, unknown>).gift_cards as unknown[]
    )?.length > 0 &&
    cart.total === 0
  )

  const previousStepsCompleted =
    cart.shipping_address &&
    (cart.shipping_methods?.length ?? 0) > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <section className="py-10 md:py-12">
      <div className="flex items-baseline gap-4 md:gap-5">
        <span className="text-[8px] uppercase tracking-[0.28em] opacity-35">
          04
        </span>

        <h2
          className={`font-serif text-[28px] font-normal leading-none tracking-[-0.03em] md:text-[38px] md:tracking-[-0.035em] ${
            !isOpen ? "opacity-35" : ""
          }`}
        >
          Review
        </h2>
      </div>

      {isOpen && previousStepsCompleted && (
        <div className="pt-10">
          <div className="border-t border-[#191816]/20 pt-6">
            <p className="max-w-[520px] text-[8px] uppercase leading-[1.9] tracking-[0.15em] opacity-45">
              By placing your order, you confirm that you have read and accept
              AYLA&apos;s Terms of Use, Terms of Sale, Returns Policy and
              Privacy Policy.
            </p>
          </div>

          <div className="mt-9 [&_button]:!flex [&_button]:!h-[58px] [&_button]:!w-full [&_button]:!items-center [&_button]:!justify-center [&_button]:!rounded-none [&_button]:!border-0 [&_button]:!bg-[#191816] [&_button]:!text-[8px] [&_button]:!uppercase [&_button]:!tracking-[0.26em] [&_button]:!text-[#EEEAE1] md:[&_button]:!w-[280px]">
            <PaymentButton
              cart={cart}
              data-testid="submit-order-button"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Review
