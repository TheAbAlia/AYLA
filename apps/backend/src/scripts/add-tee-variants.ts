import { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createProductsWorkflow,
  deleteProductsWorkflow,
} from "@medusajs/medusa/core-flows"

const HANDLE = "textured-tee-001"
const COLLECTION_ID = "pcol_01M2WPN1RCQ6KZT4072YJ9Q5EP"

export default async function recreateTee({
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

  logger.info("AYLA: looking for existing Textured Tee...")

  /*
   * Find existing Tee.
   */
  const { data: existingProducts } = await query.graph({
    entity: "product",
    fields: [
      "id",
      "title",
      "handle",
    ],
    filters: {
      handle: HANDLE,
    },
  })

  /*
   * Delete only the current Tee.
   */
  if (existingProducts.length) {
    const existing = existingProducts[0]

    logger.info(
      `AYLA: deleting existing ${existing.title} (${existing.id})...`
    )

    await deleteProductsWorkflow(container).run({
      input: {
        ids: [existing.id],
      },
    })

    logger.info("AYLA: existing Tee deleted.")
  } else {
    logger.info(
      "AYLA: no existing Tee found. Creating fresh product."
    )
  }

  /*
   * Get the Default Sales Channel.
   */
  const { data: salesChannels } = await query.graph({
    entity: "sales_channel",
    fields: [
      "id",
      "name",
    ],
  })

  const defaultSalesChannel =
    salesChannels.find(
      (channel: any) =>
        channel.name
          ?.toLowerCase()
          .includes("default")
    ) ?? salesChannels[0]

  if (!defaultSalesChannel) {
    throw new Error(
      "AYLA: no sales channel found."
    )
  }

  logger.info(
    `AYLA: using sales channel ${defaultSalesChannel.name} (${defaultSalesChannel.id})`
  )

  /*
   * Create the product, Size option and all three
   * variants together.
   *
   * This prevents Medusa from creating a product
   * whose only option is "Default option".
   */
  logger.info(
    "AYLA: creating clean Textured Tee..."
  )

  const { result } = await createProductsWorkflow(
    container
  ).run({
    input: {
      products: [
        {
          title: "AYLA Textured Tee 001",

          handle: HANDLE,

          subtitle:
            "Collection 001 — Before Language",

          description:
            "A heavyweight relaxed tee shaped around simplicity, texture and permanence. Cut with a considered silhouette and finished with restrained AYLA detailing.",

          material: "Heavyweight Cotton",

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
              values: [
                "S",
                "M",
                "L",
              ],
            },
          ],

          variants: [
            {
              title: "S",

              sku: "AYLA-TEE-001-S",

              options: {
                Size: "S",
              },

              prices: [
                {
                  amount: 85,
                  currency_code: "eur",
                },
              ],

              manage_inventory: false,
              allow_backorder: false,
            },

            {
              title: "M",

              sku: "AYLA-TEE-001-M",

              options: {
                Size: "M",
              },

              prices: [
                {
                  amount: 85,
                  currency_code: "eur",
                },
              ],

              manage_inventory: false,
              allow_backorder: false,
            },

            {
              title: "L",

              sku: "AYLA-TEE-001-L",

              options: {
                Size: "L",
              },

              prices: [
                {
                  amount: 85,
                  currency_code: "eur",
                },
              ],

              manage_inventory: false,
              allow_backorder: false,
            },
          ],
        },
      ],
    },
  })

  logger.info(
    `AYLA: created product:\n${JSON.stringify(
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
   * Verify exactly what Medusa created.
   */
  const { data: verification } = await query.graph({
    entity: "product",

    fields: [
      "id",
      "title",
      "handle",

      "options.id",
      "options.title",
      "options.values.id",
      "options.values.value",

      "variants.id",
      "variants.title",
      "variants.sku",
      "variants.manage_inventory",

      "variants.options.id",
      "variants.options.value",
      "variants.options.option_id",

      "sales_channels.id",
      "sales_channels.name",
    ],

    filters: {
      handle: HANDLE,
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
    "AYLA: clean Textured Tee created successfully."
  )
}