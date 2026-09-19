import { Metadata } from "next"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import { getAylaProductImages } from "@lib/util/ayla-product-images"
import ProductTemplate from "@modules/products/templates"

type Props = {
  params: Promise<{
    countryCode: string
    handle: string
  }>
  searchParams: Promise<{
    v_id?: string
    audience?: string
  }>
}

export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    if (!countryCodes) {
      return []
    }

    const promises = countryCodes.map(async (country) => {
      const { response } = await listProducts({
        countryCode: country,
        queryParams: {
          limit: 100,
          fields: "handle",
        },
      })

      return {
        country,
        products: response.products,
      }
    })

    const countryProducts = await Promise.all(promises)

    return countryProducts
      .flatMap((countryData) =>
        countryData.products.map((product) => ({
          countryCode: countryData.country,
          handle: product.handle,
        }))
      )
      .filter((param) => param.handle)
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${
        error instanceof Error ? error.message : "Unknown error"
      }.`
    )

    return []
  }
}

function getImagesForVariant(
  product: HttpTypes.StoreProduct,
  selectedVariantId?: string
) {
  if (!selectedVariantId || !product.variants) {
    return product.images
  }

  const variant = product.variants.find(
    (variant) => variant.id === selectedVariantId
  )

  if (!variant || !variant.images?.length) {
    return product.images
  }

  const imageIdsMap = new Map(
    variant.images.map((image) => [image.id, true])
  )

  return (
    product.images?.filter((image) =>
      imageIdsMap.has(image.id)
    ) ?? null
  )
}

function getAylaPdpImages(
  handle: string | null | undefined,
  audience?: "men" | "women"
): HttpTypes.StoreProductImage[] | null {
  const aylaImages = getAylaProductImages(handle)

  if (!aylaImages) {
    return null
  }

  /*
   * Strict storefront presentation:
   *
   * MEN:
   * male / front / detail
   *
   * WOMEN:
   * female / front / detail
   *
   * ALL:
   * front / detail / female / male
   */
  const urls =
    audience === "men"
      ? [
          aylaImages.male,
          aylaImages.front,
          aylaImages.detail,
        ]
      : audience === "women"
        ? [
            aylaImages.female,
            aylaImages.front,
            aylaImages.detail,
          ]
        : [
            aylaImages.front,
            aylaImages.detail,
            aylaImages.female,
            aylaImages.male,
          ]

  return urls.map((url, index) => ({
    id: `ayla-${handle}-${audience ?? "all"}-${index}`,
    url,
  })) as HttpTypes.StoreProductImage[]
}

export async function generateMetadata(
  props: Props
): Promise<Metadata> {
  const params = await props.params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: {
      handle: params.handle,
    },
  }).then(({ response }) => response.products[0])

  if (!product) {
    notFound()
  }

  const aylaImages = getAylaProductImages(product.handle)

  return {
    title: `${product.title} — AYLA`,
    description:
      product.description ||
      `${product.title} — Collection 001, Before Language.`,
    openGraph: {
      title: `${product.title} — AYLA`,
      description:
        product.description ||
        `${product.title} — Collection 001, Before Language.`,
      images: aylaImages?.front
        ? [aylaImages.front]
        : product.thumbnail
          ? [product.thumbnail]
          : [],
    },
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams

  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    queryParams: {
      handle: params.handle,
    },
  }).then(({ response }) => response.products[0])

  if (!pricedProduct) {
    notFound()
  }

  const audience: "men" | "women" | undefined =
    searchParams.audience === "men" ||
    searchParams.audience === "women"
      ? searchParams.audience
      : undefined

  const aylaPdpImages = getAylaPdpImages(
    pricedProduct.handle,
    audience
  )

  const medusaImages = getImagesForVariant(
    pricedProduct,
    searchParams.v_id
  )

  const images = aylaPdpImages ?? medusaImages ?? []

  return (
    <ProductTemplate
      product={pricedProduct}
      region={region}
      countryCode={params.countryCode}
      images={images}
    />
  )
}
