import { Metadata } from "next"
import { redirect } from "next/navigation"

import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import CartTemplate from "@modules/cart/templates"

export const metadata: Metadata = {
  title: "Bag — AYLA",
  description: "Your AYLA bag.",
}

type Props = {
  params: Promise<{
    countryCode: string
  }>
}

export default async function Cart({ params }: Props) {
  const { countryCode } = await params

  const cart = await retrieveCart()
  const customer = await retrieveCustomer()

  if (!cart) {
    redirect(`/${countryCode}/store`)
  }

  return <CartTemplate cart={cart} customer={customer} />
}
