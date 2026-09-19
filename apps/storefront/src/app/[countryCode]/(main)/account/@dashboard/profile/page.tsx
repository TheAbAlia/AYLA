import { Metadata } from "next"
import { notFound } from "next/navigation"

import ProfilePhone from "@modules/account/components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"

import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Profile — AYLA",
  description: "Manage your AYLA account details.",
}

export default async function Profile() {
  const customer = await retrieveCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <header className="grid grid-cols-1 gap-8 border-b border-[#191816]/25 pb-8 md:grid-cols-12 md:pb-10">
        <div className="md:col-span-7">
          <div className="text-[9px] uppercase tracking-[0.2em] opacity-45">
            Account / 01
          </div>

          <h1 className="mt-4 font-serif text-[clamp(42px,5vw,72px)] font-normal leading-[0.9] tracking-[-0.045em]">
            Profile
          </h1>
        </div>

        <div className="flex items-end md:col-span-4 md:col-start-9">
          <p className="max-w-sm text-[10px] leading-[1.7] tracking-[0.04em] opacity-60">
            Manage the personal information associated with your AYLA
            account.
          </p>
        </div>
      </header>

      <section className="mt-4">
        <ProfileName customer={customer} />
        <ProfileEmail customer={customer} />
        <ProfilePhone customer={customer} />
        <ProfileBillingAddress customer={customer} regions={regions} />
      </section>
    </div>
  )
}
