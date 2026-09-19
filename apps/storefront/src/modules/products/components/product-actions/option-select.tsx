import { HttpTypes } from "@medusajs/types"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const ALLOWED_SIZES = ["S", "M", "L"]

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const values = (option.values ?? [])
    .map((item) => item.value?.trim().toUpperCase())
    .filter(
      (value): value is string =>
        !!value && ALLOWED_SIZES.includes(value)
    )
    .filter(
      (value, index, array) =>
        array.indexOf(value) === index
    )
    .sort(
      (a, b) =>
        ALLOWED_SIZES.indexOf(a) -
        ALLOWED_SIZES.indexOf(b)
    )

  return (
    <div className="w-full border-b border-[#191816]/25 pb-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[8px] uppercase tracking-[0.26em] text-[#191816]/50">
          Size
        </span>

        {current && (
          <span className="text-[8px] uppercase tracking-[0.22em] text-[#191816]">
            {current}
          </span>
        )}
      </div>

      <div
        className="grid w-full grid-cols-3 gap-[6px]"
        data-testid={dataTestId}
      >
        {values.map((value) => {
          const selected =
            current?.trim().toUpperCase() === value

          return (
            <button
              key={value}
              type="button"
              onClick={() =>
                updateOption(option.id, value)
              }
              disabled={disabled}
              aria-pressed={selected}
              data-testid="option-button"
              className={`
                flex
                h-[44px]
                items-center
                justify-center
                border
                text-[9px]
                uppercase
                tracking-[0.16em]
                transition-all
                duration-300
                ${
                  selected
                    ? "border-[#191816] bg-[#191816] text-[#EEEAE1]"
                    : "border-[#191816]/30 bg-transparent text-[#191816] hover:border-[#191816]"
                }
                ${
                  disabled
                    ? "cursor-not-allowed opacity-30"
                    : "cursor-pointer"
                }
              `}
            >
              {value}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
