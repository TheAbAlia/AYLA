"use client"

import {
  SelectHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react"

type NativeSelectProps = {
  placeholder?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">

const CartItemSelect = forwardRef<
  HTMLSelectElement,
  NativeSelectProps
>(
  (
    {
      placeholder = "Select...",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null)

    useImperativeHandle(
      ref,
      () => innerRef.current as HTMLSelectElement
    )

    return (
      <div className="relative inline-flex items-center">
        <select
          ref={innerRef}
          {...props}
          className={`
            h-10
            min-w-[72px]
            appearance-none
            border
            border-[#191816]/30
            bg-transparent
            px-3
            pr-8
            text-[8px]
            uppercase
            tracking-[0.2em]
            outline-none
            transition-colors
            duration-300
            hover:border-[#191816]
            focus:border-[#191816]
            ${className}
          `}
        >
          <option disabled value="">
            {placeholder}
          </option>

          {children}
        </select>

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[8px]">
          ↓
        </span>
      </div>
    )
  }
)

CartItemSelect.displayName = "CartItemSelect"

export default CartItemSelect
