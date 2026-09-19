"use client"

import { useActionState } from "react"

import { signup } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction, pending] = useActionState(signup, null)

  const inputClass =
    "w-full rounded-none border-0 border-b border-[#191816]/35 bg-transparent px-0 pb-3 text-[13px] text-[#191816] outline-none transition-colors focus:border-[#191816] focus:ring-0"

  const labelClass =
    "mb-3 block text-[8px] uppercase tracking-[0.24em] opacity-50"

  return (
    <div className="w-full" data-testid="register-page">
      <div className="border-b border-[#191816]/20 pb-5">
        <p className="text-[8px] uppercase tracking-[0.28em] opacity-45">
          New customer
        </p>

        <h2 className="mt-3 font-serif text-[36px] font-normal leading-none tracking-[-0.025em] md:text-[42px]">
          Create account
        </h2>
      </div>

      <p className="mt-6 max-w-[340px] text-[9px] uppercase leading-[1.8] tracking-[0.17em] opacity-50">
        Create an AYLA account to keep track of orders and save your details.
      </p>

      {message?.state === "verification_required" && (
        <div
          className="mt-8 border-y border-[#191816]/15 py-4 text-[9px] uppercase leading-[1.7] tracking-[0.14em]"
          data-testid="register-verification-message"
        >
          A verification link was sent to{" "}
          <span className="normal-case tracking-normal">
            {message.email}
          </span>
          . Check your inbox before signing in.
        </div>
      )}

      <form action={formAction} className="mt-10 w-full">
        <div className="grid grid-cols-2 gap-x-5 gap-y-8">
          <label className="block">
            <span className={labelClass}>First name</span>
            <input
              name="first_name"
              required
              autoComplete="given-name"
              data-testid="first-name-input"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className={labelClass}>Last name</span>
            <input
              name="last_name"
              required
              autoComplete="family-name"
              data-testid="last-name-input"
              className={inputClass}
            />
          </label>

          <label className="col-span-2 block">
            <span className={labelClass}>Email</span>
            <input
              name="email"
              required
              type="email"
              autoComplete="email"
              data-testid="email-input"
              className={inputClass}
            />
          </label>

          <label className="col-span-2 block">
            <span className={labelClass}>
              Phone{" "}
              <span className="opacity-50">/ Optional</span>
            </span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              data-testid="phone-input"
              className={inputClass}
            />
          </label>

          <label className="col-span-2 block">
            <span className={labelClass}>Password</span>
            <input
              name="password"
              required
              type="password"
              autoComplete="new-password"
              data-testid="password-input"
              className={inputClass}
            />
          </label>
        </div>

        <div className="mt-5">
          <ErrorMessage
            error={message?.state === "error" ? message.error : null}
            data-testid="register-error"
          />
        </div>

        <p className="mt-7 text-[7px] uppercase leading-[1.8] tracking-[0.16em] opacity-40">
          By creating an account, you agree to AYLA&apos;s{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="border-b border-[#191816]"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="border-b border-[#191816]"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </p>

        <button
          type="submit"
          disabled={pending}
          data-testid="register-button"
          className="mt-8 flex h-[56px] w-full items-center justify-between bg-[#191816] px-5 text-[#EEEAE1] transition-opacity duration-300 hover:opacity-80 disabled:cursor-wait disabled:opacity-50"
        >
          <span className="text-[9px] uppercase tracking-[0.28em] text-[#EEEAE1]">
            {pending ? "Creating account" : "Create account"}
          </span>

          <span
            aria-hidden="true"
            className="text-[14px] text-[#EEEAE1]"
          >
            →
          </span>
        </button>
      </form>

      <div className="mt-10 border-t border-[#191816]/15 pt-5">
        <p className="text-[8px] uppercase tracking-[0.22em] opacity-40">
          Already have an account?
        </p>

        <button
          type="button"
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="mt-3 border-b border-[#191816] pb-1 text-[9px] uppercase tracking-[0.22em] transition-opacity hover:opacity-50"
        >
          Sign in
        </button>
      </div>
    </div>
  )
}

export default Register
