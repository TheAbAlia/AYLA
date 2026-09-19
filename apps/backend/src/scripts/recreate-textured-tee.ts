import { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createInventoryLevelsWorkflow,
  createProductsWorkflow,
} from "@medusajs/medusa/core-flows"

const HANDLE = "textured-tee-001"

export default async function recreateTexturedTee({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const productModuleService = container.resolve(Modules.PRODUCT)

  logger.info("AYLA: rebuilding Textured Tee 001...")

  /*
   * 1. Find the existing Tee.
   */
  const { data: existingProducts } = await query.graph({
    entity: "product",
    fields: ["id", "title", "handle"],
    filters: {
      handle: HANDLE,
    },
  })

  /*
   * 2. Delete only the old Tee.
   */
  if (existingProducts.length) {
    logger.info(
      `AYLA: deleting existing ${HANDLE} (${existingProducts[0].id})`
    )

    await productModuleService.deleteProducts(
      existingProducts.map((product) => product.id)
    )
  } else {
    logger.info("AYLA: no existing Textured Tee found.")
  }

  /*
   * 3. Find AYLA collection.
   */
  const { data: collections } = await query.graph({
    entity: "product_collection",
    fields: ["id", "title", "handle"],
  })

  const collection = collections.find(
    (item) =>
      item.handle === "before-language" ||
      item.title?.toLowerCase() === "before language"
  )

  if (!collection) {
    throw new Error(
      'AYLA: collection "Before Language" was not found.'
    )
  }

  /*
   * 4. Find Default Sales Channel.
   */
  const { data: salesChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  })

  const defaultSalesChannel = salesChannels.find(
    (channel) => channel.name === "Default Sales Channel"
  )

  if (!defaultSalesChannel) {
    throw new Error(
      'AYLA: "Default Sales Channel" was not found.'
    )
  }

  /*
   * 5. Find shipping profile.
   *
   * AYLA only needs an existing shipping profile here.
   */
  const { data: shippingProfiles } = await query.graph({
    entity: "shipping_profile",
    fields: ["id", "name"],
  })

  const shippingProfile =
    shippingProfiles.find(
      (profile) =>
        profile.name?.toLowerCase() === "default"
    ) ?? shippingProfiles[0]

  if (!shippingProfile) {
    throw new Error(
      "AYLA: no shipping profile was found."
    )
  }

  /*
   * 6. Create a completely clean Tee.
   *
   * IMPORTANT:
   * Exactly ONE option:
   *
   * Size -> S / M / L
   */
  const { result: createdProducts } =
    await createProductsWorkflow(container).run({
      input: {
        products: [
          {
            title: "AYLA Textured Tee 001",

            handle: HANDLE,

            subtitle: "Collection 001 — Before Language",

            description:
              "A heavyweight relaxed tee shaped around simplicity, texture and permanence.",

            material: "Heavyweight Cotton",

            status: ProductStatus.PUBLISHED,

            collection_id: collection.id,

            shipping_profile_id: shippingProfile.id,

            options: [
              {
                title: "Size",
                values: ["S", "M", "L"],
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

                manage_inventory: true,
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

                manage_inventory: true,
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

                manage_inventory: true,
              },
            ],

            sales_channels: [
              {
                id: defaultSalesChannel.id,
              },
            ],
          },
        ],
      },
    })

  const createdProduct = createdProducts[0]

  logger.info(
    `AYLA: created ${createdProduct.title} (${createdProduct.id})`
  )

  /*
   * 7. Find the new variants + their inventory items.
   */
  const { data: variants } = await query.graph({
    entity: "product_variant",
    fields: [
      "id",
      "title",
      "sku",
      "inventory_items.inventory_item_id",
    ],
    filters: {
      product_id: createdProduct.id,
    },
  })

  /*
   * 8. Find a stock location.
   */
  const { data: stockLocations } = await query.graph({
    entity: "stock_location",
    fields: ["id", "name"],
  })

  const stockLocation = stockLocations[0]

  if (!stockLocation) {
    throw new Error(
      "AYLA: no stock location was found."
    )
  }

  /*
   * 9. Give each new variant inventory.
   */
  const inventoryLevels = variants.flatMap((variant: any) =>
    (variant.inventory_items ?? [])
      .filter((link: any) => link.inventory_item_id)
      .map((link: any) => ({
        location_id: stockLocation.id,
        inventory_item_id: link.inventory_item_id,
        stocked_quantity: 20,
      }))
  )

  if (inventoryLevels.length) {
    await createInventoryLevelsWorkflow(container).run({
      input: {
        inventory_levels: inventoryLevels,
      },
    })
  }

  /*
   * 10. Verify what was created.
   */
  const { data: verification } = await query.graph({
    entity: "product",
    fields: [
      "id",
      "title",
      "handle",
      "status",
      "options.id",
      "options.title",
      "options.values.id",
      "options.values.value",
      "variants.id",
      "variants.title",
      "variants.sku",
      "variants.options.value",
    ],
    filters: {
      handle: HANDLE,
    },
  })

  logger.info(
    `AYLA: verification:\n${JSON.stringify(
      verification,
      null,
      2
    )}`
  )

  logger.info("AYLA: Textured Tee 001 rebuild complete.")
}
