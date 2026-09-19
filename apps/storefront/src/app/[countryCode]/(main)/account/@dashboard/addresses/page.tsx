import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Addresses — AYLA",
  description: "Manage your AYLA shipping addresses.",
}

export default async function Addresses(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <header className="grid grid-cols-1 gap-8 border-b border-[#191816]/25 pb-8 md:grid-cols-12 md:pb-10">
        <div className="md:col-span-7">
          <div className="text-[9px] uppercase tracking-[0.2em] opacity-45">
            Account / 02
          </div>

          <h1 className="mt-4 font-serif text-[clamp(42px,5vw,72px)] font-normal leading-[0.9] tracking-[-0.045em]">
            Addresses
          </h1>
        </div>

        <div className="flex items-end md:col-span-4 md:col-start-9">
          <p className="max-w-sm text-[10px] leading-[1.7] tracking-[0.04em] opacity-60">
            Saved addresses are available automatically during checkout.
          </p>
        </div>
      </header>

      <AddressBook customer={customer} region={region} />
    </div>
  )
}
