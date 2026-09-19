import React from "react"

import AddAddress from "../address-card/add-address"
import EditAddress from "../address-card/edit-address-modal"
import { HttpTypes } from "@medusajs/types"

type AddressBookProps = {
  customer: HttpTypes.StoreCustomer
  region: HttpTypes.StoreRegion
}

const AddressBook: React.FC<AddressBookProps> = ({
  customer,
  region,
}) => {
  const { addresses } = customer

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border-b border-[#191816]/20 py-7 md:odd:border-r md:odd:pr-8 md:even:pl-8"
          >
            <EditAddress
              region={region}
              address={address}
            />
          </div>
        ))}

        <div className="border-b border-[#191816]/20 py-7 md:odd:border-r md:odd:pr-8 md:even:pl-8">
          <AddAddress
            region={region}
            addresses={addresses}
          />
        </div>
      </div>
    </section>
  )
}

export default AddressBook
