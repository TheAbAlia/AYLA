import { Radio as RadioGroupOption } from "@headlessui/react"
import React, { useContext, type JSX } from "react"

import { isManual } from "@lib/constants"
import SkeletonCardDetails from "@modules/skeletons/components/skeleton-card-details"
import { PaymentElement } from "@stripe/react-stripe-js"
import PaymentTest from "../payment-test"
import { StripeContext } from "../payment-wrapper/stripe-wrapper"

type PaymentContainerProps = {
  paymentProviderId: string
  selectedPaymentOptionId: string | null
  disabled?: boolean
  paymentInfoMap: Record<
    string,
    { title: string; icon: JSX.Element }
  >
  children?: React.ReactNode
}

const PaymentContainer = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  children,
}: PaymentContainerProps) => {
  const selected =
    selectedPaymentOptionId === paymentProviderId

  const isDevelopment =
    process.env.NODE_ENV === "development"

  return (
    <RadioGroupOption
      value={paymentProviderId}
      disabled={disabled}
      className="cursor-pointer border-t border-[#191816]/20 py-5 outline-none disabled:cursor-not-allowed disabled:opacity-30"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span
            className={`flex h-[13px] w-[13px] items-center justify-center rounded-full border ${
              selected
                ? "border-[#191816]"
                : "border-[#191816]/35"
            }`}
          >
            {selected && (
              <span className="h-[5px] w-[5px] rounded-full bg-[#191816]" />
            )}
          </span>

          <span className="text-[9px] uppercase tracking-[0.16em]">
            {paymentInfoMap[paymentProviderId]?.title ||
              paymentProviderId}
          </span>

          {isManual(paymentProviderId) &&
            isDevelopment && (
              <PaymentTest className="hidden md:block" />
            )}
        </div>

        <span className="opacity-55">
          {paymentInfoMap[paymentProviderId]?.icon}
        </span>
      </div>

      {isManual(paymentProviderId) &&
        isDevelopment && (
          <PaymentTest className="mt-3 text-[8px] md:hidden" />
        )}

      {children}
    </RadioGroupOption>
  )
}

export default PaymentContainer

export const StripePaymentContainer = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  setError,
  setPaymentComplete,
}: Omit<PaymentContainerProps, "children"> & {
  setError: (error: string | null) => void
  setPaymentComplete: (complete: boolean) => void
}) => {
  const stripeReady = useContext(StripeContext)

  return (
    <PaymentContainer
      paymentProviderId={paymentProviderId}
      selectedPaymentOptionId={selectedPaymentOptionId}
      paymentInfoMap={paymentInfoMap}
      disabled={disabled}
    >
      {selectedPaymentOptionId === paymentProviderId &&
        (stripeReady ? (
          <div className="mt-6 border-t border-[#191816]/15 pt-6">
            <p className="mb-5 text-[7px] uppercase tracking-[0.22em] opacity-45">
              Payment details
            </p>

            <PaymentElement
              options={{ layout: "accordion" }}
              onChange={(event) => {
                setError(null)
                setPaymentComplete(event.complete)
              }}
              onLoadError={(event) => {
                setPaymentComplete(false)
                setError(
                  event.error?.message ??
                    "Could not load the payment methods."
                )
              }}
            />
          </div>
        ) : (
          <div className="mt-6">
            <SkeletonCardDetails />
          </div>
        ))}
    </PaymentContainer>
  )
}
