"use client"

import { RadioGroup } from "@headlessui/react"
import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer, {
  StripePaymentContainer,
} from "@modules/checkout/components/payment-container"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: HttpTypes.StoreCart
  availablePaymentMethods: { id: string }[]
}) => {
  const activeSession =
    cart.payment_collection?.payment_sessions?.find(
      (session) => session.status === "pending"
    )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentComplete, setPaymentComplete] = useState(false)

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState(activeSession?.provider_id ?? "")

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const paidByGiftcard = !!(
    (cart as unknown as Record<string, unknown>)?.gift_cards &&
    (
      (cart as unknown as Record<string, unknown>)
        .gift_cards as unknown[]
    )?.length > 0 &&
    cart.total === 0
  )

  const paymentReady =
    (activeSession &&
      (cart.shipping_methods?.length ?? 0) !== 0) ||
    paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)

    if (isStripeLike(method)) {
      await initiatePaymentSession(cart, {
        provider_id: method,
      })
    }
  }

  const handleEdit = () => {
    router.push(
      pathname + "?" + createQueryString("step", "payment"),
      { scroll: false }
    )
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      const shouldInputPaymentDetails =
        isStripeLike(selectedPaymentMethod) && !activeSession

      const sessionMatches =
        activeSession?.provider_id === selectedPaymentMethod

      if (!sessionMatches) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      if (!shouldInputPaymentDetails) {
        router.push(
          pathname + "?" + createQueryString("step", "review"),
          { scroll: false }
        )
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <section className="border-b border-[#191816]/25 py-12">
      <div className="flex items-start justify-between">
        <div className="flex items-baseline gap-5">
          <span className="text-[8px] uppercase tracking-[0.28em] opacity-35">
            03
          </span>

          <h2
            className={`font-serif text-[32px] font-normal leading-none tracking-[-0.035em] md:text-[38px] ${
              !isOpen && !paymentReady ? "opacity-35" : ""
            }`}
          >
            Payment
          </h2>
        </div>

        {!isOpen && paymentReady && (
          <button
            type="button"
            onClick={handleEdit}
            data-testid="edit-payment-button"
            className="text-[8px] uppercase tracking-[0.22em] opacity-45 transition-opacity hover:opacity-100"
          >
            Edit
          </button>
        )}
      </div>

      {isOpen && (
        <div className="pt-10">
          {!paidByGiftcard &&
            availablePaymentMethods?.length > 0 && (
              <>
                <p className="mb-6 text-[8px] uppercase tracking-[0.22em] opacity-45">
                  Payment method
                </p>

                <RadioGroup
                  value={selectedPaymentMethod}
                  onChange={(value: string) =>
                    setPaymentMethod(value)
                  }
                >
                  {availablePaymentMethods.map((method) =>
                    isStripeLike(method.id) ? (
                      <StripePaymentContainer
                        key={method.id}
                        paymentProviderId={method.id}
                        selectedPaymentOptionId={
                          selectedPaymentMethod
                        }
                        paymentInfoMap={paymentInfoMap}
                        setError={setError}
                        setPaymentComplete={setPaymentComplete}
                      />
                    ) : (
                      <PaymentContainer
                        key={method.id}
                        paymentInfoMap={paymentInfoMap}
                        paymentProviderId={method.id}
                        selectedPaymentOptionId={
                          selectedPaymentMethod
                        }
                      />
                    )
                  )}
                </RadioGroup>
              </>
            )}

          {paidByGiftcard && (
            <p className="text-[9px] uppercase tracking-[0.16em]">
              Gift card
            </p>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              isLoading ||
              (isStripeLike(selectedPaymentMethod) &&
                !paymentComplete) ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            data-testid="submit-payment-button"
            className="mt-10 flex h-[56px] w-full items-center justify-between bg-[#191816] px-6 text-[#EEEAE1] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-30 md:w-[280px]"
          >
            <span className="text-[8px] uppercase tracking-[0.24em]">
              {isLoading
                ? "Updating"
                : !activeSession &&
                  isStripeLike(selectedPaymentMethod)
                ? "Enter payment details"
                : "Continue to review"}
            </span>

            <span>→</span>
          </button>
        </div>
      )}

      {!isOpen && paymentReady && (
        <div className="mt-8 pl-0 md:pl-[42px]">
          <p className="mb-2 text-[7px] uppercase tracking-[0.22em] opacity-35">
            Method
          </p>

          <p
            className="text-[9px] uppercase tracking-[0.14em]"
            data-testid="payment-method-summary"
          >
            {paidByGiftcard
              ? "Gift card"
              : paymentInfoMap[activeSession?.provider_id || ""]
                  ?.title ||
                activeSession?.provider_id}
          </p>
        </div>
      )}
    </section>
  )
}

export default Payment
