import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ProductImage = ({
  image,
  index,
  total,
  sizes,
}: {
  image: HttpTypes.StoreProductImage
  index: number
  total: number
  sizes: string
}) => {
  return (
    <figure
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
            sizes={sizes}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.008]"
          />
        )}

        <div className="pointer-events-none absolute bottom-4 left-4">
          <span className="text-[8px] uppercase tracking-[0.25em] text-[#F1EDE5] drop-shadow-sm">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </figure>
  )
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <>
      {/* Mobile / tablet — horizontal editorial gallery */}
      <div
        className="
          -mx-5
          flex
          snap-x
          snap-mandatory
          gap-2
          overflow-x-auto
          px-5
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
          md:-mx-[4.7vw]
          md:gap-3
          md:px-[4.7vw]
          lg:hidden
        "
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className="
              w-[86%]
              shrink-0
              snap-start
              md:w-[58%]
            "
          >
            <ProductImage
              image={image}
              index={index}
              total={images.length}
              sizes="(max-width: 767px) 86vw, 58vw"
            />
          </div>
        ))}
      </div>

      {/* Desktop — vertical editorial gallery */}
      <div className="hidden w-full flex-col gap-6 lg:flex">
        {images.map((image, index) => (
          <ProductImage
            key={image.id}
            image={image}
            index={index}
            total={images.length}
            sizes="50vw"
          />
        ))}
      </div>
    </>
  )
}

export default ImageGallery
