"use client"

import { useActionState } from "react"

import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction, pending] = useActionState(login, null)

  return (
    <div className="w-full text-[#191816]" data-testid="login-page">
      <div className="flex items-end justify-between">
        <h2 className="font-serif text-[34px] font-normal leading-none tracking-[-0.035em]">
          Sign in
        </h2>

        <span className="pb-1 text-[7px] uppercase tracking-[0.24em] opacity-35">
          Returning
        </span>
      </div>

      <form action={formAction} className="mt-12">
        <label className="block">
          <span className="text-[8px] uppercase tracking-[0.24em] opacity-45">
            Email
          </span>

          <input
              name="email"
              type="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              required
              data-testid="email-input"
              className="mt-3 w-full rounded-none border-0 border-b border-[#191816]/35 bg-transparent px-0 py-3 text-[13px] text-[#191816] outline-none focus:border-[#191816] focus:ring-0"
            />
        </label>

        <label className="mt-8 block">
          <span className="text-[8px] uppercase tracking-[0.24em] opacity-45">
            Password
          </span>

          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
            className="mt-3 w-full rounded-none border-0 border-b border-[#191816]/35 bg-transparent px-0 py-3 text-[13px] text-[#191816] outline-none focus:border-[#191816] focus:ring-0"
          />
        </label>

        {message?.state === "verification_required" && (
          <p
            className="mt-6 border-t border-[#191816]/15 pt-4 text-[8px] uppercase leading-[1.7] tracking-[0.15em]"
            data-testid="login-verification-message"
          >
            Verification sent to {message.email}.
          </p>
        )}

        {message?.state === "error" && (
          <p
            className="mt-6 text-[8px] uppercase leading-[1.7] tracking-[0.15em]"
            data-testid="login-error-message"
          >
            {message.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          data-testid="sign-in-button"
          className="mt-10 flex h-[52px] w-full items-center justify-between bg-[#191816] px-5 transition-opacity hover:opacity-75 disabled:opacity-50"
        >
          <span
            className="text-[8px] uppercase tracking-[0.28em]"
            style={{ color: "#EEEAE1" }}
          >
            {pending ? "Signing in" : "Sign in"}
          </span>

          <span
            className="text-[13px]"
            style={{ color: "#EEEAE1" }}
          >
            →
          </span>
        </button>
      </form>

      <div className="mt-9 flex items-center justify-between border-t border-[#191816]/15 pt-4">
        <span className="text-[7px] uppercase tracking-[0.2em] opacity-40">
          New to AYLA
        </span>

        <button
          type="button"
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          data-testid="register-button"
          className="text-[8px] uppercase tracking-[0.2em] transition-opacity hover:opacity-50"
        >
          Create account →
        </button>
      </div>
    </div>
  )
}

export default Login
