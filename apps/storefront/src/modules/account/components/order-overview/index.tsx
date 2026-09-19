"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import OrderCard from "../order-card"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="w-full" data-testid="orders-wrapper">
        <div className="hidden border-b border-[#191816]/20 pb-3 md:grid md:grid-cols-12 md:gap-6">
          <div className="text-[8px] uppercase tracking-[0.2em] opacity-40 md:col-span-2">
            Order
          </div>
          <div className="text-[8px] uppercase tracking-[0.2em] opacity-40 md:col-span-3">
            Date
          </div>
          <div className="text-[8px] uppercase tracking-[0.2em] opacity-40 md:col-span-2">
            Items
          </div>
          <div className="text-[8px] uppercase tracking-[0.2em] opacity-40 md:col-span-2">
            Total
          </div>
          <div className="text-right text-[8px] uppercase tracking-[0.2em] opacity-40 md:col-span-3">
            Details
          </div>
        </div>

        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    )
  }

  return (
    <div
      className="border-b border-[#191816]/20 py-16 md:py-20"
      data-testid="no-orders-container"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="text-[8px] uppercase tracking-[0.2em] opacity-45">
            Order archive
          </div>

          <h2 className="mt-4 font-serif text-[34px] leading-none tracking-[-0.035em]">
            No orders yet
          </h2>
        </div>

        <div className="flex flex-col items-start justify-end md:col-span-4 md:col-start-9">
          <p className="max-w-xs text-[10px] leading-[1.7] tracking-[0.04em] opacity-60">
            Your AYLA orders will appear here once an order has been placed.
          </p>

          <LocalizedClientLink
            href="/store"
            className="mt-6 border-b border-[#191816]/50 pb-1 text-[8px] uppercase tracking-[0.2em] transition-opacity hover:opacity-50"
            data-testid="continue-shopping-button"
          >
            Continue shopping
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default OrderOverview
