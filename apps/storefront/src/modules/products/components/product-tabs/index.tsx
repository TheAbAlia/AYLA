"use client"

import { HttpTypes } from "@medusajs/types"

import Accordion from "./accordion"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({
  product,
}: ProductTabsProps) => {
  const tabs = [
    {
      label: "Product Information",
      component: (
        <ProductInfoTab product={product} />
      ),
    },
    {
      label: "Shipping & Returns",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab) => (
          <Accordion.Item
            key={tab.label}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({
  product,
}: ProductTabsProps) => {
  const information = [
    ["Material", product.material || "—"],
    [
      "Origin",
      product.origin_country
        ? product.origin_country.toUpperCase()
        : "—",
    ],
    [
      "Weight",
      product.weight
        ? `${product.weight} G`
        : "—",
    ],
    [
      "Type",
      product.type?.value || "—",
    ],
  ]

  return (
    <div className="py-6">
      <div className="flex flex-col">
        {information.map(([label, value]) => (
          <div
            key={label}
            className="flex items-start justify-between gap-6 border-b border-[#191816]/15 py-3 last:border-b-0"
          >
            <span className="text-[7px] uppercase tracking-[0.22em] opacity-45">
              {label}
            </span>

            <span className="text-right text-[8px] uppercase tracking-[0.18em]">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="space-y-6 py-6">
      <div>
        <span className="text-[8px] uppercase tracking-[0.22em]">
          Delivery
        </span>

        <p className="mt-2 max-w-[280px] text-[9px] leading-[1.8] tracking-[0.06em] opacity-60">
          Orders are prepared with care and dispatched
          with tracked delivery.
        </p>
      </div>

      <div>
        <span className="text-[8px] uppercase tracking-[0.22em]">
          Returns
        </span>

        <p className="mt-2 max-w-[280px] text-[9px] leading-[1.8] tracking-[0.06em] opacity-60">
          Unworn pieces may be returned in their
          original condition in accordance with our
          returns policy.
        </p>
      </div>
    </div>
  )
}

export default ProductTabs
