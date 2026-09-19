import { HttpTypes } from "@medusajs/types"

import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"

type CartTemplateProps = {
  cart: HttpTypes.StoreCart
  customer: HttpTypes.StoreCustomer | null
}

const CartTemplate = ({
  cart,
  customer,
}: CartTemplateProps) => {
  return (
    <div className="min-h-screen bg-[#EEEAE1] text-[#191816]">
      <div className="mx-auto w-full max-w-[1600px] px-5 pb-24 pt-16 md:px-10 md:pt-24 lg:px-16">
        {!cart?.items?.length ? (
          <EmptyCartMessage />
        ) : (
          <>
            {/* Editorial header */}
            <div className="mb-14 border-b border-[#191816]/15 pb-8 md:mb-20">
              <p className="mb-4 text-[9px] uppercase tracking-[0.28em] opacity-45">
                AYLA / Your selection
              </p>

              <div className="flex items-end justify-between gap-6">
                <h1 className="font-serif text-[clamp(52px,7vw,110px)] font-normal leading-[0.85] tracking-[-0.045em]">
                  Bag
                </h1>

                <p className="pb-1 text-[9px] uppercase tracking-[0.24em] opacity-45">
                  {cart.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}{" "}
                  {cart.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  ) === 1
                    ? "item"
                    : "items"}
                </p>
              </div>
            </div>

            {/* Cart */}
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12 xl:gap-20">
              {/* Products */}
              <div className="lg:col-span-8">
                {!customer && (
                  <>
                    <SignInPrompt />
                    <Divider />
                  </>
                )}

                <ItemsTemplate cart={cart} />
              </div>

              {/* Summary */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <Summary
                    cart={
                      cart as HttpTypes.StoreCart & {
                        promotions: HttpTypes.StorePromotion[]
                      }
                    }
                  />
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CartTemplate