import { HttpTypes } from "@medusajs/types"
import { mapKeys } from "lodash"
import React, { useEffect, useMemo, useState } from "react"

import AddressSelect from "../address-select"

const ShippingAddress = ({
  customer,
  cart,
  checked,
  onChange,
}: {
  customer: HttpTypes.StoreCustomer | null
  cart: HttpTypes.StoreCart | null
  checked: boolean
  onChange: () => void
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    "shipping_address.first_name": cart?.shipping_address?.first_name || "",
    "shipping_address.last_name": cart?.shipping_address?.last_name || "",
    "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
    "shipping_address.company": cart?.shipping_address?.company || "",
    "shipping_address.postal_code": cart?.shipping_address?.postal_code || "",
    "shipping_address.city": cart?.shipping_address?.city || "",
    "shipping_address.country_code": cart?.shipping_address?.country_code || "",
    "shipping_address.province": cart?.shipping_address?.province || "",
    "shipping_address.phone": cart?.shipping_address?.phone || "",
    email: cart?.email || "",
  })

  const countriesInRegion = useMemo(
    () => cart?.region?.countries?.map((c) => c.iso_2),
    [cart?.region]
  )

  const addressesInRegion = useMemo(
    () =>
      customer?.addresses.filter(
        (a) => a.country_code && countriesInRegion?.includes(a.country_code)
      ),
    [customer?.addresses, countriesInRegion]
  )

  const setFormAddress = (
    address?: HttpTypes.StoreCartAddress,
    email?: string
  ) => {
    if (address) {
      setFormData((prev) => ({
        ...prev,
        "shipping_address.first_name": address.first_name || "",
        "shipping_address.last_name": address.last_name || "",
        "shipping_address.address_1": address.address_1 || "",
        "shipping_address.company": address.company || "",
        "shipping_address.postal_code": address.postal_code || "",
        "shipping_address.city": address.city || "",
        "shipping_address.country_code": address.country_code || "",
        "shipping_address.province": address.province || "",
        "shipping_address.phone": address.phone || "",
      }))
    }

    if (email) {
      setFormData((prev) => ({ ...prev, email }))
    }
  }

  useEffect(() => {
    if (cart?.shipping_address) {
      setFormAddress(cart.shipping_address, cart.email)
    }

    if (cart && !cart.email && customer?.email) {
      setFormAddress(undefined, customer.email)
    }
  }, [cart])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const inputClass =
    "mt-3 w-full rounded-none border-0 border-b border-[#191816]/30 bg-transparent px-0 pb-3 pt-1 text-[13px] text-[#191816] outline-none transition-colors placeholder:text-transparent focus:border-[#191816] focus:ring-0"

  const labelClass =
    "block text-[7px] uppercase tracking-[0.24em] opacity-45"

  const Field = ({
    label,
    name,
    type = "text",
    autoComplete,
    required = false,
    testId,
  }: {
    label: string
    name: string
    type?: string
    autoComplete?: string
    required?: boolean
    testId?: string
  }) => (
    <label className="block">
      <span className={labelClass}>
        {label}
        {required && <span className="ml-1 opacity-50">*</span>}
      </span>

      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        data-testid={testId}
        className={inputClass}
      />
    </label>
  )

  return (
    <>
      {customer && (addressesInRegion?.length || 0) > 0 && (
        <div className="mb-10 border-y border-[#191816]/15 py-5">
          <p className="mb-4 text-[8px] uppercase tracking-[0.2em] opacity-50">
            Saved address
          </p>

          <AddressSelect
            addresses={customer.addresses}
            addressInput={
              mapKeys(formData, (_, key) =>
                key.replace("shipping_address.", "")
              ) as unknown as HttpTypes.StoreCartAddress
            }
            onSelect={setFormAddress}
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        <Field
          label="First name"
          name="shipping_address.first_name"
          autoComplete="given-name"
          required
          testId="shipping-first-name-input"
        />

        <Field
          label="Last name"
          name="shipping_address.last_name"
          autoComplete="family-name"
          required
          testId="shipping-last-name-input"
        />

        <Field
          label="Address"
          name="shipping_address.address_1"
          autoComplete="address-line1"
          required
          testId="shipping-address-input"
        />

        <Field
          label="Company / Optional"
          name="shipping_address.company"
          autoComplete="organization"
          testId="shipping-company-input"
        />

        <Field
          label="Postal code"
          name="shipping_address.postal_code"
          autoComplete="postal-code"
          required
          testId="shipping-postal-code-input"
        />

        <Field
          label="City"
          name="shipping_address.city"
          autoComplete="address-level2"
          required
          testId="shipping-city-input"
        />

        <label className="block">
          <span className={labelClass}>Country *</span>

          <div className="relative">
            <select
              name="shipping_address.country_code"
              autoComplete="country"
              value={formData["shipping_address.country_code"]}
              onChange={handleChange}
              required
              data-testid="shipping-country-select"
              className={`${inputClass} appearance-none pr-8`}
            >
              <option value="">Select country</option>

              {cart?.region?.countries?.map((country) => (
                <option key={country.iso_2} value={country.iso_2}>
                  {country.display_name}
                </option>
              ))}
            </select>

            <span className="pointer-events-none absolute bottom-3 right-0 text-[10px] opacity-45">
              ↓
            </span>
          </div>
        </label>

        <Field
          label="State / Province"
          name="shipping_address.province"
          autoComplete="address-level1"
          testId="shipping-province-input"
        />
      </div>

      <label className="my-10 flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          name="same_as_billing"
          checked={checked}
          onChange={onChange}
          data-testid="billing-address-checkbox"
          className="peer sr-only"
        />

        <span className="flex h-[13px] w-[13px] items-center justify-center border border-[#191816]/50 text-[9px] peer-checked:bg-[#191816] peer-checked:text-[#EEEAE1]">
          {checked ? "✓" : ""}
        </span>

        <span className="text-[8px] uppercase tracking-[0.18em] opacity-60">
          Billing address same as delivery address
        </span>
      </label>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          testId="shipping-email-input"
        />

        <Field
          label="Phone / Optional"
          name="shipping_address.phone"
          autoComplete="tel"
          testId="shipping-phone-input"
        />
      </div>
    </>
  )
}

export default ShippingAddress
