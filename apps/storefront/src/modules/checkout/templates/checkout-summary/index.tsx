import { HttpTypes } from "@medusajs/types"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"

const CheckoutSummary = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const itemCount =
    cart.items?.reduce((total, item) => total + item.quantity, 0) ?? 0

  return (
    <div className="border-t border-[#191816]/25 pt-8 lg:sticky lg:top-8 lg:border-t-0 lg:pt-0">
      <div className="flex items-end justify-between border-b border-[#191816]/20 pb-5">
        <div>
          <p className="mb-3 text-[8px] uppercase tracking-[0.26em] opacity-45">
            Order
          </p>

          <h2 className="font-serif text-[32px] font-normal leading-none tracking-[-0.03em]">
            Summary
          </h2>
        </div>

        <span className="text-[8px] uppercase tracking-[0.22em] opacity-40">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="border-b border-[#191816]/15 py-6">
        <ItemsPreviewTemplate cart={cart} />
      </div>

      <div className="border-b border-[#191816]/15 py-6">
        <DiscountCode cart={cart} />
      </div>

      <div className="pt-6">
        <CartTotals totals={cart} />
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-[#191816]/15 pt-4">
        <span className="text-[7px] uppercase tracking-[0.22em] opacity-35">
          Secure checkout
        </span>

        <span className="text-[7px] uppercase tracking-[0.22em] opacity-35">
          AYLA
        </span>
      </div>
    </div>
  )
}

export default CheckoutSummary
