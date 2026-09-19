import { HttpTypes } from "@medusajs/types"
import Item from "@modules/order/components/item"

type ItemsProps = {
  order: HttpTypes.StoreOrder
}

const Items = ({ order }: ItemsProps) => {
  const items = order.items

  if (!items?.length) {
    return (
      <div className="border-b border-[#191816]/20 py-8 text-[8px] uppercase tracking-[0.18em] opacity-45">
        No items
      </div>
    )
  }

  return (
    <div className="flex flex-col" data-testid="products-table">
      {items
        .slice()
        .sort((a, b) =>
          (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
        )
        .map((item) => (
          <Item
            key={item.id}
            item={item}
            currencyCode={order.currency_code}
          />
        ))}
    </div>
  )
}

export default Items
