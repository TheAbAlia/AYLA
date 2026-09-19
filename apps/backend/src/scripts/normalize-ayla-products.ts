import { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createProductsWorkflow,
  deleteProductsWorkflow,
} from "@medusajs/medusa/core-flows"

const COLLECTION_ID = "pcol_01M2WPN1RCQ6KZT4072YJ9Q5EP"

const PRODUCTS = [
  {
    title: "AYLA Long Sleeve 001",
    handle: "long-sleeve-001",
    subtitle: "Collection 001 — Before Language",
    description:
      "A refined long sleeve study in proportion and restraint. Built from substantial cotton jersey with a relaxed silhouette designed for everyday permanence.",
    material: "Heavyweight Cotton Jersey",
    price: 110,
    skuPrefix: "AYLA-LS-001",
  },
  {
    title: "AYLA Heavy Hoodie 001",
    handle: "heavy-hoodie-001",
    subtitle: "Collection 001 — Before Language",
    description:
      "A substantial hooded layer built around weight, structure and quiet utility. Cut generously in heavyweight cotton fleece with minimal AYLA detailing.",
    material: "Heavyweight Cotton Fleece",
    price: 180,
    skuPrefix: "AYLA-HOODIE-001",
  },
  {
    title: "AYLA Structured Crew 001",
    handle: "structured-crew-001",
    subtitle: "Collection 001 — Before Language",
    description:
      "A structured crewneck reduced to essential form and material presence. A substantial cotton construction gives the silhouette weight while preserving a clean, restrained finish.",
    material: "Heavyweight Cotton Fleece",
    price: 145,
    skuPrefix: "AYLA-CREW-001",
  },
]

const SIZES = ["S", "M", "L"]

export default async function normalizeAylaProducts({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(
    ContainerRegistrationKeys.LOGGER
  )

  const query = container.resolve(
    ContainerRegistrationKeys.QUERY
  )

  logger.info(
    "AYLA: starting normalization of remaining products..."
  )

  /*
   * Find the Default Sales Channel.
   */
  const { data: salesChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  })

  const defaultSalesChannel =
    salesChannels.find((channel: any) =>
      channel.name?.toLowerCase().includes("default")
    ) ?? salesChannels[0]

  if (!defaultSalesChannel) {
    throw new Error("AYLA: no sales channel found.")
  }

  logger.info(
    `AYLA: using sales channel ${defaultSalesChannel.name} (${defaultSalesChannel.id})`
  )

  /*
   * Find the existing versions of the three products.
   */
  const handles = PRODUCTS.map((product) => product.handle)

  const { data: existingProducts } = await query.graph({
    entity: "product",
    fields: ["id", "title", "handle"],
    filters: {
      handle: handles,
    },
  })

  /*
   * Delete only the products we're about to recreate.
   */
  if (existingProducts.length) {
    logger.info(
      `AYLA: deleting ${existingProducts.length} existing products...`
    )

    existingProducts.forEach((product: any) => {
      logger.info(
        `AYLA: deleting ${product.title} (${product.id})`
      )
    })

    await deleteProductsWorkflow(container).run({
      input: {
        ids: existingProducts.map(
          (product: any) => product.id
        ),
      },
    })

    logger.info(
      "AYLA: existing products deleted."
    )
  } else {
    logger.info(
      "AYLA: no existing matching products found."
    )
  }

  /*
   * Recreate all three products with one Size option
   * and exactly S / M / L variants.
   */
  logger.info(
    "AYLA: creating normalized products..."
  )

  const { result } = await createProductsWorkflow(
    container
  ).run({
    input: {
      products: PRODUCTS.map((product) => ({
        title: product.title,

        handle: product.handle,

        subtitle: product.subtitle,

        description: product.description,

        material: product.material,

        status: ProductStatus.PUBLISHED,

        discountable: true,

        collection_id: COLLECTION_ID,

        sales_channels: [
          {
            id: defaultSalesChannel.id,
          },
        ],

        options: [
          {
            title: "Size",
            values: SIZES,
          },
        ],

        variants: SIZES.map((size) => ({
          title: size,

          sku: `${product.skuPrefix}-${size}`,

          options: {
            Size: size,
          },

          prices: [
            {
              amount: product.price,
              currency_code: "eur",
            },
          ],

          manage_inventory: false,
          allow_backorder: false,
        })),
      })),
    },
  })

  logger.info(
    `AYLA: created products:\n${JSON.stringify(
      result.map((product: any) => ({
        id: product.id,
        title: product.title,
        handle: product.handle,
      })),
      null,
      2
    )}`
  )

  /*
   * Final verification.
   */
  const { data: verification } = await query.graph({
    entity: "product",

    fields: [
      "id",
      "title",
      "handle",
      "subtitle",
      "material",
      "status",

      "collection.id",
      "collection.title",

      "options.id",
      "options.title",
      "options.values.id",
      "options.values.value",

      "variants.id",
      "variants.title",
      "variants.sku",
      "variants.manage_inventory",
      "variants.allow_backorder",

      "variants.options.id",
      "variants.options.value",
      "variants.options.option_id",

      "variants.prices.amount",
      "variants.prices.currency_code",

      "sales_channels.id",
      "sales_channels.name",
    ],

    filters: {
      handle: handles,
    },
  })

  logger.info(
    `AYLA: FINAL VERIFICATION:\n${JSON.stringify(
      verification,
      null,
      2
    )}`
  )

  logger.info(
    "AYLA: remaining product normalization complete."
  )
}
