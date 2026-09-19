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

  return (
    <div className="w-full text-[#191816]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.22em] opacity-55">
            Subtotal
          </span>

          <span className="text-[12px]">
            {money(subtotal)}
          </span>
        </div>

        {!!discount_total && (
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.22em] opacity-55">
              Discount
            </span>

            <span className="text-[12px]">
              − {money(discount_total)}
            </span>
          </div>
        )}

        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.22em] opacity-55">
              Gift card
            </span>

            <span className="text-[12px]">
              − {money(gift_card_total)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.22em] opacity-55">
            Shipping
          </span>

          <span className="text-[12px]">
            {shipping_total ? money(shipping_total) : "—"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.22em] opacity-55">
            Taxes
          </span>

          <span className="text-[12px]">
            {tax_total ? money(tax_total) : "—"}
          </span>
        </div>
      </div>

      <div className="mt-7 flex items-end justify-between border-t border-[#191816]/15 pt-7">
        <div>
          <p className="text-[9px] uppercase tracking-[0.28em]">
            Total
          </p>

          <p className="mt-2 text-[7px] uppercase tracking-[0.18em] opacity-35">
            Shipping calculated at checkout
          </p>
        </div>

        <span className="font-serif text-[28px] leading-none">
          {money(total)}
        </span>
      </div>
    </div>
  )
}

export default CartTotals