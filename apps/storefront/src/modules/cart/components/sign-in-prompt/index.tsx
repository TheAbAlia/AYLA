import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="border-y border-[#191816]/20 py-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="flex items-center gap-5 sm:gap-8">
          <span className="text-[8px] uppercase tracking-[0.28em] opacity-40">
            Account
          </span>

          <span className="text-[8px] uppercase tracking-[0.24em]">
            Already have an account?
          </span>
        </div>

        <LocalizedClientLink
          href="/account"
          className="group flex w-fit items-center gap-3 text-[8px] uppercase tracking-[0.26em] transition-opacity duration-300 hover:opacity-50"
          data-testid="sign-in-button"
        >
          Sign in
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
