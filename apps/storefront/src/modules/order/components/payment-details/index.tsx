import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0]?.payments?.[0]

  if (!payment) {
    return null
  }

  const paymentInfo = paymentInfoMap[payment.provider_id]

  return (
    <section className="border-t border-[#191816]/20 pt-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="md:col-span-3">
          <div className="text-[8px] uppercase tracking-[0.2em] opacity-45">
            Payment
          </div>

          <h2 className="mt-3 font-serif text-[28px] leading-none tracking-[-0.03em]">
            Payment
          </h2>
        </div>

        <div className="md:col-span-3">
          <div className="text-[8px] uppercase tracking-[0.18em] opacity-45">
            Method
          </div>

          <div
            className="mt-4 text-[9px] uppercase tracking-[0.12em]"
            data-testid="payment-method"
          >
            {paymentInfo?.title || payment.provider_id}
          </div>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <div className="text-[8px] uppercase tracking-[0.18em] opacity-45">
            Details
          </div>

          <div
            className="mt-4 text-[9px] leading-[1.8] tracking-[0.06em]"
            data-testid="payment-amount"
          >
            {isStripeLike(payment.provider_id) && payment.data?.card_last4
              ? `•••• •••• •••• ${payment.data.card_last4}`
              : `${convertToLocale({
                  amount: payment.amount,
                  currency_code: order.currency_code,
                })} paid`}
          </div>

          {payment.created_at && (
            <div className="mt-1 text-[8px] tracking-[0.06em] opacity-45">
              {new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(new Date(payment.created_at))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default PaymentDetails
