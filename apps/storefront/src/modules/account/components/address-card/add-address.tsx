"use client"

import { useActionState, useEffect, useState } from "react"

import { addCustomerAddress } from "@lib/data/customer"
import useToggleState from "@lib/hooks/use-toggle-state"
import { HttpTypes } from "@medusajs/types"
import CountrySelect from "@modules/checkout/components/country-select"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"

const AddAddress = ({
  region,
}: {
  region: HttpTypes.StoreRegion
  addresses: HttpTypes.StoreCustomerAddress[]
}) => {
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(addCustomerAddress, {
    success: false,
    error: null,
  } as { success: boolean; error: string | null })

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  return (
    <>
      <button
        type="button"
        className="group flex min-h-[180px] h-full w-full flex-col justify-between text-left"
        onClick={open}
        data-testid="add-address-button"
      >
        <div>
          <div className="text-[8px] uppercase tracking-[0.2em] opacity-45">
            Address book
          </div>

          <div className="mt-4 font-serif text-[26px] leading-none tracking-[-0.03em]">
            Add new address
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-[#191816]/20 pt-4">
          <span className="text-[8px] uppercase tracking-[0.2em]">
            New address
          </span>

          <span className="text-[18px] font-light leading-none transition-transform duration-300 group-hover:rotate-90">
            +
          </span>
        </div>
      </button>

      <Modal isOpen={state} close={close} data-testid="add-address-modal">
        <Modal.Title>
          <div className="border-b border-[#191816]/20 pb-5">
            <div className="text-[8px] uppercase tracking-[0.2em] opacity-45">
              AYLA / Account
            </div>

            <h2 className="mt-3 font-serif text-[32px] font-normal leading-none tracking-[-0.035em] text-[#191816]">
              Add address
            </h2>
          </div>
        </Modal.Title>

        <form action={formAction}>
          <Modal.Body>
            <div className="grid grid-cols-1 gap-y-3 pt-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input
                  label="First name"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  data-testid="first-name-input"
                />

                <Input
                  label="Last name"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  data-testid="last-name-input"
                />
              </div>

              <Input
                label="Company"
                name="company"
                autoComplete="organization"
                data-testid="company-input"
              />

              <Input
                label="Address"
                name="address_1"
                required
                autoComplete="address-line1"
                data-testid="address-1-input"
              />

              <Input
                label="Apartment, suite, etc."
                name="address_2"
                autoComplete="address-line2"
                data-testid="address-2-input"
              />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[144px_1fr]">
                <Input
                  label="Postal code"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  data-testid="postal-code-input"
                />

                <Input
                  label="City"
                  name="city"
                  required
                  autoComplete="locality"
                  data-testid="city-input"
                />
              </div>

              <Input
                label="Province / State"
                name="province"
                autoComplete="address-level1"
                data-testid="state-input"
              />

              <CountrySelect
                region={region}
                name="country_code"
                required
                autoComplete="country"
                data-testid="country-select"
              />

              <Input
                label="Phone"
                name="phone"
                autoComplete="phone"
                data-testid="phone-input"
              />
            </div>

            {formState.error && (
              <div
                className="mt-4 border-t border-[#191816]/20 pt-3 text-[8px] uppercase tracking-[0.16em]"
                data-testid="address-error"
              >
                {formState.error}
              </div>
            )}
          </Modal.Body>

          <Modal.Footer>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="reset"
                onClick={close}
                className="border border-[#191816] px-6 py-4 text-[8px] uppercase tracking-[0.2em] text-[#191816] transition-opacity hover:opacity-60"
                data-testid="cancel-button"
              >
                Cancel
              </button>

              <SubmitButton
                className="rounded-none bg-[#191816] px-6 py-4 text-[8px] uppercase tracking-[0.2em] text-[#EEEAE1]"
                data-testid="save-button"
              >
                Save address
              </SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AddAddress
