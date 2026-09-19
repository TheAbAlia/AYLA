import { HttpTypes } from "@medusajs/types"

import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function Summary({ cart }: SummaryProps) {
  return (
    <section className="w-full text-[#191816]">
      {/* Heading */}
      <div className="border-b border-[#191816]/15 pb-6">
        <p className="mb-3 text-[9px] uppercase tracking-[0.28em] opacity-45">
          Order
        </p>

        <h2 className="font-serif text-[38px] font-normal leading-none tracking-[-0.02em]">
          Summary
        </h2>
      </div>

      {/* Promotion */}
      <div className="border-b border-[#191816]/15 py-7">
        <DiscountCode cart={cart} />
      </div>

      {/* Totals */}
      <div className="py-7">
        <CartTotals totals={cart} />
      </div>

      {/* Checkout */}
      <LocalizedClientLink
        href="/checkout?step=address"
        className="flex h-[58px] w-full items-center justify-center bg-[#191816] !text-[#F1EDE5] transition-opacity duration-300 hover:opacity-80"
        data-testid="checkout-button"
      >
        <span className="text-[10px] font-normal uppercase tracking-[0.28em]">
          Go to checkout →
        </span>
      </LocalizedClientLink>

      {/* Meta */}
      <div className="mt-5 flex items-center justify-between border-t border-[#191816]/15 pt-4">
        <span className="text-[7px] uppercase tracking-[0.24em] opacity-35">
          Secure checkout
        </span>

        <span className="text-[7px] uppercase tracking-[0.24em] opacity-35">
          Complimentary returns
        </span>
      </div>
    </section>
  )
}

export default Summary