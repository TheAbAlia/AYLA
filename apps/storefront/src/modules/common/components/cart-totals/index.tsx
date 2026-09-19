import { convertToLocale } from "@lib/util/money"

type CartTotalsProps = {
  totals: {
    currency_code: string
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    shipping_total?: number | null
    discount_total?: number | null
    gift_card_total?: number | null
  }
}

const CartTotals = ({ totals }: CartTotalsProps) => {
  const {
    currency_code,
    total,
    subtotal,
    tax_total,
    shipping_total,
    discount_total,
    gift_card_total,
  } = totals

  const money = (amount?: number | null) =>
    convertToLocale({
      amount: amount ?? 0,
      currency_code,
    })

  const shippingResolved =
    shipping_total !== null && shipping_total !== undefined

  const taxesResolved =
    tax_total !== null && tax_total !== undefined

  const isEstimated = !shippingResolved || !taxesResolved

  const pendingLabel = (
    <span className="text-[8px] uppercase tracking-[0.14em] opacity-40">
      Calculated at checkout
    </span>
  )

  return (
    <div className="w-full text-[#191816]">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-6">
          <span className="text-[9px] uppercase tracking-[0.22em] opacity-55">
            Subtotal
          </span>

          <span className="text-[12px]">
            {money(subtotal)}
          </span>
        </div>

        {!!discount_total && (
          <div className="flex items-center justify-between gap-6">
            <span className="text-[9px] uppercase tracking-[0.22em] opacity-55">
              Discount
            </span>

            <span className="text-[12px]">
              − {money(discount_total)}
            </span>
          </div>
        )}

        {!!gift_card_total && (
          <div className="flex items-center justify-between gap-6">
            <span className="text-[9px] uppercase tracking-[0.22em] opacity-55">
              Gift card
            </span>

            <span className="text-[12px]">
              − {money(gift_card_total)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-6">
          <span className="text-[9px] uppercase tracking-[0.22em] opacity-55">
            Shipping
          </span>

          {shippingResolved ? (
            <span className="text-[12px]">
              {money(shipping_total)}
            </span>
          ) : (
            pendingLabel
          )}
        </div>

        <div className="flex items-center justify-between gap-6">
          <span className="text-[9px] uppercase tracking-[0.22em] opacity-55">
            Taxes
          </span>

          {taxesResolved ? (
            <span className="text-[12px]">
              {money(tax_total)}
            </span>
          ) : (
            pendingLabel
          )}
        </div>
      </div>

      <div className="mt-7 flex items-end justify-between gap-6 border-t border-[#191816]/15 pt-7">
        <div>
          <p className="text-[9px] uppercase tracking-[0.28em]">
            {isEstimated ? "Estimated total" : "Total"}
          </p>

          {isEstimated && (
            <p className="mt-2 max-w-[190px] text-[7px] uppercase leading-[1.6] tracking-[0.16em] opacity-35">
              Final total confirmed during checkout
            </p>
          )}
        </div>

        <span className="shrink-0 font-serif text-[28px] leading-none">
          {money(total)}
        </span>
      </div>
    </div>
  )
}

export default CartTotals
