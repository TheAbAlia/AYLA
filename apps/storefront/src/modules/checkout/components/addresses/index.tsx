"use client"

import { useActionState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import { setAddresses } from "@lib/data/cart"
import useToggleState from "@lib/hooks/use-toggle-state"
import compareAddresses from "@lib/util/compare-addresses"

import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } =
    useToggleState(
      cart?.shipping_address && cart?.billing_address
        ? compareAddresses(cart.shipping_address, cart.billing_address)
        : true
    )

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <section className="border-b border-[#191816]/25 pb-12">
      <div className="flex items-start justify-between">
        <div className="flex items-baseline gap-5">
          <span className="text-[8px] uppercase tracking-[0.28em] opacity-35">
            01
          </span>

          <h2 className="font-serif text-[32px] font-normal leading-none tracking-[-0.035em] md:text-[38px]">
            Information
          </h2>
        </div>

        {!isOpen && cart?.shipping_address && (
          <button
            type="button"
            onClick={() => router.push(pathname + "?step=address")}
            data-testid="edit-address-button"
            className="text-[8px] uppercase tracking-[0.22em] opacity-45 transition-opacity hover:opacity-100"
          >
            Edit
          </button>
        )}
      </div>

      {isOpen ? (
        <form action={formAction} className="pt-12">
          <ShippingAddress
            customer={customer}
            checked={sameAsBilling}
            onChange={toggleSameAsBilling}
            cart={cart}
          />

          {!sameAsBilling && (
            <div className="mt-12 border-t border-[#191816]/20 pt-9">
              <p className="mb-8 text-[8px] uppercase tracking-[0.24em] opacity-45">
                Billing address
              </p>

              <BillingAddress cart={cart} />
            </div>
          )}

          <SubmitButton
            className="mt-12 !flex !h-[56px] !w-full !items-center !justify-center !rounded-none !border-0 !bg-[#191816] !text-[9px] !uppercase !tracking-[0.24em] !text-[#EEEAE1] hover:!opacity-80 md:!w-[280px]"
            data-testid="submit-address-button"
          >
            Continue to delivery →
          </SubmitButton>

          <ErrorMessage
            error={message}
            data-testid="address-error-message"
          />
        </form>
      ) : cart?.shipping_address ? (
        <div className="mt-9 grid grid-cols-1 gap-8 pl-0 text-[9px] leading-[1.7] md:grid-cols-3 md:pl-[42px]">
          <div data-testid="shipping-address-summary">
            <p className="mb-2 text-[7px] uppercase tracking-[0.22em] opacity-35">
              Delivery
            </p>
            <p>
              {cart.shipping_address.first_name}{" "}
              {cart.shipping_address.last_name}
            </p>
            <p>{cart.shipping_address.address_1}</p>
            <p>
              {cart.shipping_address.postal_code}{" "}
              {cart.shipping_address.city}
            </p>
            <p>{cart.shipping_address.country_code?.toUpperCase()}</p>
          </div>

          <div data-testid="shipping-contact-summary">
            <p className="mb-2 text-[7px] uppercase tracking-[0.22em] opacity-35">
              Contact
            </p>
            <p>{cart.email}</p>
            <p>{cart.shipping_address.phone}</p>
          </div>

          <div data-testid="billing-address-summary">
            <p className="mb-2 text-[7px] uppercase tracking-[0.22em] opacity-35">
              Billing
            </p>
            <p className="opacity-60">
              {sameAsBilling ? "Same as delivery" : "Separate billing address"}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default Addresses
