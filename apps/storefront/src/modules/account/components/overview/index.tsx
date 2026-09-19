import { HttpTypes } from "@medusajs/types"

import { convertToLocale } from "@lib/util/money"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

const Overview = ({ customer, orders }: OverviewProps) => {
  const firstName = customer?.first_name?.trim() || "Client"
  const addressesCount = customer?.addresses?.length || 0
  const orderCount = orders?.length || 0
  const recentOrder = orders?.[0]

  return (
    <div data-testid="overview-page-wrapper">
      <section className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="text-[9px] uppercase tracking-[0.2em] opacity-50">
            Overview
          </div>

          <h2
            className="mt-5 font-serif text-[clamp(48px,6vw,92px)] font-normal uppercase leading-[0.82] tracking-[-0.05em]"
            data-testid="welcome-message"
            data-value={customer?.first_name}
          >
            Welcome,
            <br />
            {firstName}.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-x-8 border-t border-[#191816]/20 pt-5 md:col-span-4 md:col-start-9 md:self-end">
          <div>
            <div className="text-[9px] uppercase tracking-[0.18em] opacity-45">
              01 / Orders
            </div>

            <div className="mt-5 font-serif text-[42px] leading-none tracking-[-0.04em]">
              {String(orderCount).padStart(2, "0")}
            </div>
          </div>

          <div>
            <div className="text-[9px] uppercase tracking-[0.18em] opacity-45">
              02 / Addresses
            </div>

            <div
              className="mt-5 font-serif text-[42px] leading-none tracking-[-0.04em]"
              data-testid="addresses-count"
              data-value={addressesCount}
            >
              {String(addressesCount).padStart(2, "0")}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20 md:mt-28">
        <div className="flex items-end justify-between border-b border-[#191816]/25 pb-4">
          <div>
            <div className="text-[9px] uppercase tracking-[0.2em] opacity-45">
              Archive / 001
            </div>

            <h3 className="mt-3 font-serif text-[32px] font-normal tracking-[-0.035em] md:text-[42px]">
              Recent order
            </h3>
          </div>

          <LocalizedClientLink
            href="/account/orders"
            className="hidden text-[9px] uppercase tracking-[0.18em] opacity-55 transition-opacity hover:opacity-100 sm:block"
          >
            View all orders →
          </LocalizedClientLink>
        </div>

        {recentOrder ? (
          <LocalizedClientLink
            href={`/account/orders/details/${recentOrder.id}`}
            className="group grid grid-cols-2 gap-x-4 gap-y-6 border-b border-[#191816]/15 py-6 transition-opacity hover:opacity-60 md:grid-cols-12 md:items-center md:py-7"
            data-testid="order-wrapper"
            data-value={recentOrder.id}
          >
            <div className="md:col-span-2">
              <div className="text-[8px] uppercase tracking-[0.18em] opacity-45">
                Order
              </div>

              <div
                className="mt-2 text-[10px] uppercase tracking-[0.14em]"
                data-testid="order-id"
                data-value={recentOrder.display_id}
              >
                #{String(recentOrder.display_id).padStart(4, "0")}
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="text-[8px] uppercase tracking-[0.18em] opacity-45">
                Date
              </div>

              <div
                className="mt-2 text-[10px] uppercase tracking-[0.14em]"
                data-testid="order-created-date"
              >
                {formatDate(recentOrder.created_at)}
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="text-[8px] uppercase tracking-[0.18em] opacity-45">
                Pieces
              </div>

              <div className="mt-2 text-[10px] uppercase tracking-[0.14em]">
                {recentOrder.items?.length || 0}{" "}
                {(recentOrder.items?.length || 0) === 1 ? "item" : "items"}
              </div>
            </div>

            <div className="md:col-span-2 md:text-right">
              <div className="text-[8px] uppercase tracking-[0.18em] opacity-45">
                Total
              </div>

              <div
                className="mt-2 text-[10px] uppercase tracking-[0.14em]"
                data-testid="order-amount"
              >
                {convertToLocale({
                  amount: recentOrder.total,
                  currency_code: recentOrder.currency_code,
                })}
              </div>
            </div>

            <div className="flex items-end justify-end md:col-span-2">
              <span className="text-[9px] uppercase tracking-[0.18em]">
                View order →
              </span>
            </div>
          </LocalizedClientLink>
        ) : (
          <div
            className="border-b border-[#191816]/15 py-12"
            data-testid="no-orders-message"
          >
            <p className="text-[10px] uppercase tracking-[0.16em] opacity-50">
              No orders yet.
            </p>

            <LocalizedClientLink
              href="/store"
              className="mt-5 inline-block border-b border-[#191816] pb-1 text-[9px] uppercase tracking-[0.18em]"
            >
              Explore collection
            </LocalizedClientLink>
          </div>
        )}

        <LocalizedClientLink
          href="/account/orders"
          className="mt-5 inline-block text-[9px] uppercase tracking-[0.18em] sm:hidden"
        >
          View all orders →
        </LocalizedClientLink>
      </section>

      <section className="mt-20 md:mt-28">
        <div className="border-b border-[#191816]/25 pb-4">
          <div className="text-[9px] uppercase tracking-[0.2em] opacity-45">
            Account / Details
          </div>

          <h3 className="mt-3 font-serif text-[32px] font-normal tracking-[-0.035em] md:text-[42px]">
            Personal details
          </h3>
        </div>

        <div className="grid grid-cols-1 border-b border-[#191816]/15 md:grid-cols-3">
          <LocalizedClientLink
            href="/account/profile"
            className="border-b border-[#191816]/15 py-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0"
          >
            <div className="text-[8px] uppercase tracking-[0.18em] opacity-45">
              Name
            </div>

            <div className="mt-3 text-[10px] uppercase tracking-[0.14em]">
              {[customer?.first_name, customer?.last_name]
                .filter(Boolean)
                .join(" ") || "—"}
            </div>
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/account/profile"
            className="border-b border-[#191816]/15 py-6 md:border-b-0 md:border-r md:px-6"
          >
            <div className="text-[8px] uppercase tracking-[0.18em] opacity-45">
              Email
            </div>

            <div
              className="mt-3 break-all text-[10px] tracking-[0.08em]"
              data-testid="customer-email"
              data-value={customer?.email}
            >
              {customer?.email || "—"}
            </div>
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/account/profile"
            className="py-6 md:pl-6"
          >
            <div className="text-[8px] uppercase tracking-[0.18em] opacity-45">
              Phone
            </div>

            <div className="mt-3 text-[10px] uppercase tracking-[0.14em]">
              {customer?.phone || "—"}
            </div>
          </LocalizedClientLink>
        </div>
      </section>
    </div>
  )
}

export default Overview
