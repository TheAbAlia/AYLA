import { HttpTypes } from "@medusajs/types"

import Item from "@modules/cart/components/item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = [...(cart?.items ?? [])].sort((a, b) =>
    (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
  )

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[8px] uppercase tracking-[0.26em]">
          Pieces
        </span>

        <span className="text-[8px] uppercase tracking-[0.26em] opacity-45">
          Collection 001
        </span>
      </div>

      <div>
        {items.map((item, index) => (
          <Item
            key={item.id}
            item={item}
            currencyCode={cart?.currency_code || "eur"}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default ItemsTemplate
