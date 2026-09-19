import { HttpTypes } from "@medusajs/types"

import Item from "@modules/cart/components/item"

type ItemsPreviewTemplateProps = {
  cart: HttpTypes.StoreCart
}

const ItemsPreviewTemplate = ({
  cart,
}: ItemsPreviewTemplateProps) => {
  return (
    <div
      className="w-full"
      data-testid="items-table"
    >
      <div className="flex flex-col">
        {cart.items
          ?.slice()
          .sort((a, b) => {
            return (a.created_at ?? "") > (b.created_at ?? "")
              ? -1
              : 1
          })
          .map((item) => (
            <Item
              key={item.id}
              item={item}
              type="preview"
              currencyCode={cart.currency_code}
            />
          ))}
      </div>
    </div>
  )
}

export default ItemsPreviewTemplate
