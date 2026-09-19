import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex w-full flex-col gap-4 md:gap-6">
      {images.map((image, index) => (
        <figure
          key={image.id}
          id={image.id}
          className="group"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E3DED3]">
            {!!image.url && (
              <Image
                src={image.url}
                priority={index === 0}
                alt={`AYLA product view ${String(index + 1).padStart(2, "0")}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.008]"
              />
            )}

            {/* Image index */}
            <div className="pointer-events-none absolute bottom-4 left-4">
              <span className="text-[8px] uppercase tracking-[0.25em] text-[#F1EDE5] drop-shadow-sm">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </figure>
      ))}
    </div>
  )
}

export default ImageGallery
