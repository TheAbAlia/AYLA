const AYLA_PRODUCT_FOLDERS: Record<string, string> = {
  "textured-tee-001": "textured-tee",
  "long-sleeve-001": "long-sleeve",
  "heavy-hoodie-001": "heavy-hoodie",
  "structured-crew-001": "structured-crew",
}

export function getAylaProductImages(handle?: string | null) {
  if (!handle) {
    return null
  }

  const folder = AYLA_PRODUCT_FOLDERS[handle]

  if (!folder) {
    return null
  }

  const base = `/ayla/collection/001/prods/${folder}`

  return {
    front: `${base}/front.png`,
    detail: `${base}/detail.png`,
    female: `${base}/model-female.png`,
    male: `${base}/model-male.png`,
    all: [
      `${base}/front.png`,
      `${base}/detail.png`,
      `${base}/model-female.png`,
      `${base}/model-male.png`,
    ],
  }
}
