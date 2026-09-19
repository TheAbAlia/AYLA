import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Checkout — AYLA",
  description: "Complete your AYLA order.",
}

export default async function Checkout() {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer().catch(() => null)

  return (
    <main className="bg-[#EEEAE1] text-[#191816]">
      <div className="px-5 pb-20 pt-8 md:px-[4.7%] md:pb-32 md:pt-14">
        <div className="flex items-center justify-between border-t border-[#191816]/25 pt-4">
          <span className="text-[8px] uppercase tracking-[0.28em] opacity-45">
            AYLA / Checkout
          </span>

          <span className="text-[8px] uppercase tracking-[0.28em] opacity-45">
            Collection 001
          </span>
        </div>

        <div className="mt-10 md:mt-20">
          <h1 className="font-serif text-[48px] font-normal leading-[0.88] tracking-[-0.045em] sm:text-[56px] md:text-[clamp(64px,8vw,138px)] md:leading-[0.8] md:tracking-[-0.055em]">
            Checkout
          </h1>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-14 border-t border-[#191816]/20 pt-7 md:mt-14 md:pt-8 lg:mt-20 lg:grid-cols-12 lg:gap-12 xl:gap-20">
          <div className="lg:col-span-7">
            <PaymentWrapper cart={cart}>
              <CheckoutForm cart={cart} customer={customer} />
            </PaymentWrapper>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <CheckoutSummary cart={cart} />
          </aside>
        </div>
      </div>
    </main>
  )
}
