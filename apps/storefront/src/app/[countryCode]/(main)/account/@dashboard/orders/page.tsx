import { Metadata } from "next"
import { notFound } from "next/navigation"

import { listOrders } from "@lib/data/orders"
import OrderOverview from "@modules/account/components/order-overview"
import TransferRequestForm from "@modules/account/components/transfer-request-form"

export const metadata: Metadata = {
  title: "Orders — AYLA",
  description: "Your AYLA order archive.",
}

export default async function Orders() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <header className="grid grid-cols-1 gap-8 border-b border-[#191816]/25 pb-8 md:grid-cols-12 md:pb-10">
        <div className="md:col-span-7">
          <div className="text-[9px] uppercase tracking-[0.2em] opacity-45">
            Account / 03
          </div>

          <h1 className="mt-4 font-serif text-[clamp(42px,5vw,72px)] font-normal leading-[0.9] tracking-[-0.045em]">
            Orders
          </h1>
        </div>

        <div className="flex items-end md:col-span-4 md:col-start-9">
          <p className="max-w-sm text-[10px] leading-[1.7] tracking-[0.04em] opacity-60">
            A record of your AYLA purchases, delivery information and order
            details.
          </p>
        </div>
      </header>

      <section className="mt-8 md:mt-10">
        <OrderOverview orders={orders} />
      </section>

      <section className="mt-16 border-t border-[#191816]/20 pt-8 md:mt-20">
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-[8px] uppercase tracking-[0.2em] opacity-45">
              Existing order
            </div>

            <h2 className="mt-3 font-serif text-[28px] leading-none tracking-[-0.03em]">
              Transfer an order
            </h2>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <p className="text-[9px] leading-[1.7] tracking-[0.04em] opacity-55">
              Associate an existing order with this account using its order
              details.
            </p>
          </div>
        </div>

        <TransferRequestForm />
      </section>
    </div>
  )
}
