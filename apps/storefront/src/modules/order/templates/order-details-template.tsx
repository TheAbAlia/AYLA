"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderSummary from "@modules/order/components/order-summary"
import PaymentDetails from "@modules/order/components/payment-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import React from "react"

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(order.created_at))

  const quantity =
    order.items?.reduce((total, item) => total + item.quantity, 0) ?? 0

  return (
    <div className="w-full" data-testid="order-details-container">
      <header className="border-b border-[#191816]/25 pb-8 md:pb-10">
        <div className="flex items-start justify-between gap-8">
          <div className="text-[9px] uppercase tracking-[0.2em] opacity-45">
            Account / Order
          </div>

          <LocalizedClientLink
            href="/account/orders"
            className="border-b border-[#191816]/40 pb-1 text-[8px] uppercase tracking-[0.2em] transition-opacity hover:opacity-50"
            data-testid="back-to-overview-button"
          >
            Back to orders
          </LocalizedClientLink>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="text-[8px] uppercase tracking-[0.2em] opacity-45">
              Order
            </div>

            <h1 className="mt-3 font-serif text-[clamp(42px,5vw,72px)] font-normal leading-[0.9] tracking-[-0.045em]">
              #{order.display_id}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:col-span-4 md:col-start-9 md:self-end">
            <div>
              <div className="text-[7px] uppercase tracking-[0.18em] opacity-40">
                Placed
              </div>
              <div className="mt-2 text-[9px] uppercase tracking-[0.12em]">
                {date}
              </div>
            </div>

            <div>
              <div className="text-[7px] uppercase tracking-[0.18em] opacity-40">
                Items
              </div>
              <div className="mt-2 text-[9px] uppercase tracking-[0.12em]">
                {quantity}
              </div>
            </div>

            <div className="col-span-2">
              <div className="text-[7px] uppercase tracking-[0.18em] opacity-40">
                Email
              </div>
              <div className="mt-2 break-all text-[9px] tracking-[0.06em]">
                {order.email}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mt-10 md:mt-12">
        <div className="mb-5 flex items-end justify-between border-b border-[#191816]/20 pb-3">
          <div>
            <div className="text-[8px] uppercase tracking-[0.2em] opacity-45">
              Order contents
            </div>

            <h2 className="mt-2 font-serif text-[28px] leading-none tracking-[-0.03em]">
              Items
            </h2>
          </div>

          <div className="text-[8px] uppercase tracking-[0.18em] opacity-45">
            {quantity} {quantity === 1 ? "Item" : "Items"}
          </div>
        </div>

        <Items order={order} />
      </section>

      <div className="mt-14 md:mt-16">
        <ShippingDetails order={order} />
      </div>

      <div className="mt-14 md:mt-16">
        <PaymentDetails order={order} />
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 border-t border-[#191816]/20 pt-8 md:mt-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="text-[8px] uppercase tracking-[0.2em] opacity-45">
            Order total
          </div>

          <h2 className="mt-3 font-serif text-[28px] leading-none tracking-[-0.03em]">
            Summary
          </h2>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <OrderSummary order={order} />
        </div>
      </div>

      <div className="mt-16 md:mt-20">
        <Help />
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
