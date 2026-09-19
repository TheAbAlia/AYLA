import React from "react"
import { HttpTypes } from "@medusajs/types"

import AccountNav from "../components/account-nav"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <main
      className="min-h-screen bg-[#EEEAE1] text-[#191816]"
      data-testid="account-page"
    >
      <div className="mx-auto w-full max-w-[1680px] px-5 pb-20 pt-8 md:px-8 md:pb-32 md:pt-14 lg:px-12">
        {customer ? (
          <>
            <header className="border-b border-[#191816]/20 pb-5">
              <div className="flex items-start justify-between gap-8">
                <div className="text-[9px] uppercase tracking-[0.2em]">
                  AYLA / Account
                </div>

                <div className="text-right text-[9px] uppercase tracking-[0.2em]">
                  Client Area
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-7 md:mt-20 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-7">
                  <h1 className="font-serif text-[48px] font-normal uppercase leading-[0.82] tracking-[-0.05em] sm:text-[56px] md:text-[clamp(52px,7vw,112px)] md:leading-[0.78] md:tracking-[-0.055em]">
                    Account
                  </h1>
                </div>

                <div className="flex flex-col justify-end md:col-span-4 md:col-start-9">
                  <div className="text-[9px] uppercase tracking-[0.18em] opacity-55">
                    Signed in as
                  </div>

                  <div className="mt-2 text-[11px] uppercase tracking-[0.14em]">
                    {[customer.first_name, customer.last_name]
                      .filter(Boolean)
                      .join(" ") || "AYLA Client"}
                  </div>

                  <div className="mt-1 text-[10px] tracking-[0.06em] opacity-60">
                    {customer.email}
                  </div>
                </div>
              </div>
            </header>

            <AccountNav customer={customer} />

            <div
  className="
    pt-9 md:pt-16

    [&_input]:rounded-none
    [&_input]:border-x-0
    [&_input]:border-t-0
    [&_input]:border-b
    [&_input]:border-[#191816]/30
    [&_input]:bg-transparent
    [&_input]:shadow-none

    [&_select]:rounded-none
    [&_select]:border-x-0
    [&_select]:border-t-0
    [&_select]:border-b
    [&_select]:border-[#191816]/30
    [&_select]:bg-transparent
    [&_select]:shadow-none

    [&_button]:rounded-none
  "
>
  {children}
</div>
          </>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </main>
  )
}

export default AccountLayout
