"use client"

import { useEffect, useMemo, useState } from "react"

type ProductImageCarouselProps = {
  images: string[]
  alt: string
}

export default function ProductImageCarousel({
  images,
  alt,
}: ProductImageCarouselProps) {
  const cleanImages = useMemo(
    () => Array.from(new Set(images.filter(Boolean))),
    [images]
  )

  const [activeIndex, setActiveIndex] = useState(0)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!hovered || cleanImages.length <= 1) {
      return
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % cleanImages.length)
    }, 1250)

    return () => window.clearInterval(interval)
  }, [hovered, cleanImages.length])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (cleanImages.length <= 1) {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    const position = (event.clientX - bounds.left) / bounds.width

    const nextIndex = Math.min(
      cleanImages.length - 1,
      Math.floor(position * cleanImages.length)
    )

    setActiveIndex(nextIndex)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setActiveIndex(0)
  }

  if (!cleanImages.length) {
    return null
  }

  return (
    <div
      className="relative h-full w-full cursor-e-resize overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Crossfading image stack */}
      {cleanImages.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={index === 0 ? alt : ""}
          aria-hidden={index !== 0}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
            index === activeIndex
              ? "scale-100 opacity-100"
              : "scale-[1.015] opacity-0"
          }`}
        />
      ))}

      {/* Very subtle hover shade */}
      <div
        className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-500 ${
          hovered ? "opacity-[0.035]" : "opacity-0"
        }`}
      />

      {/* Image counter */}
      <div
        className={`pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between transition-all duration-500 ${
          hovered
            ? "translate-y-0 opacity-100"
            : "translate-y-2 opacity-0"
        }`}
      >
        {/* Dots */}
        <div className="flex items-center gap-[7px]">
          {cleanImages.map((_, index) => (
            <span
              key={index}
              className={`block rounded-full border border-white/80 transition-all duration-300 ${
                index === activeIndex
                  ? "h-[5px] w-[5px] bg-white"
                  : "h-[5px] w-[5px] bg-transparent"
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <span className="text-[8px] uppercase tracking-[0.22em] text-white">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(cleanImages.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  )
}
