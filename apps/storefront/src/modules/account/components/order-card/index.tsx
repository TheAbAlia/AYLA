import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const quantity =
    order.items?.reduce((total, item) => total + item.quantity, 0) ?? 0

  const date = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(order.created_at))

  return (
    <LocalizedClientLink
      href={`/account/orders/details/${order.id}`}
      className="group block border-b border-[#191816]/20 py-6 md:py-7"
      data-testid="order-card"
    >
      <div className="grid grid-cols-2 gap-x-5 gap-y-6 md:grid-cols-12 md:items-center md:gap-6">
        <div className="md:col-span-2">
          <div className="mb-2 text-[7px] uppercase tracking-[0.18em] opacity-40 md:hidden">
            Order
          </div>

          <div
            className="font-serif text-[24px] leading-none tracking-[-0.03em]"
            data-testid="order-display-id"
          >
            #{order.display_id}
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="mb-2 text-[7px] uppercase tracking-[0.18em] opacity-40 md:hidden">
            Date
          </div>

          <div
            className="text-[9px] uppercase tracking-[0.14em]"
            data-testid="order-created-at"
          >
            {date}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="mb-2 text-[7px] uppercase tracking-[0.18em] opacity-40 md:hidden">
            Items
          </div>

          <div className="text-[9px] uppercase tracking-[0.14em]">
            {quantity} {quantity === 1 ? "Item" : "Items"}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="mb-2 text-[7px] uppercase tracking-[0.18em] opacity-40 md:hidden">
            Total
          </div>

          <div
            className="text-[9px] uppercase tracking-[0.14em]"
            data-testid="order-amount"
          >
            {convertToLocale({
              amount: order.total,
              currency_code: order.currency_code,
            })}
          </div>
        </div>

        <div className="col-span-2 flex justify-end md:col-span-3">
          <span
            className="border-b border-[#191816]/40 pb-1 text-[8px] uppercase tracking-[0.2em] transition-opacity group-hover:opacity-45"
            data-testid="order-details-link"
          >
            View order
          </span>
        </div>
      </div>
    </LocalizedClientLink>
  )
}

export default OrderCard
