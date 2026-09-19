import { Disclosure } from "@headlessui/react"
import { clx } from "@modules/common/components/ui"
import { useEffect } from "react"
import { useFormStatus } from "react-dom"

import useToggleState from "@lib/hooks/use-toggle-state"

type AccountInfoProps = {
  label: string
  currentInfo: string | React.ReactNode
  isSuccess?: boolean
  isError?: boolean
  errorMessage?: string
  clearState: () => void
  children?: React.ReactNode
  "data-testid"?: string
}

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  errorMessage = "An error occurred, please try again",
  children,
  "data-testid": dataTestid,
}: AccountInfoProps) => {
  const { state, close, toggle } = useToggleState()
  const { pending } = useFormStatus()

  const handleToggle = () => {
    clearState()
    setTimeout(() => toggle(), 100)
  }

  useEffect(() => {
    if (isSuccess) {
      close()
    }
  }, [isSuccess, close])

  return (
    <div
      className="border-b border-[#191816]/20"
      data-testid={dataTestid}
    >
      <div className="grid grid-cols-[1fr_auto] gap-8 py-6 md:grid-cols-12 md:items-start md:py-7">
        <div className="md:col-span-3">
          <span className="text-[8px] uppercase tracking-[0.2em] opacity-45">
            {label}
          </span>
        </div>

        <div className="min-w-0 md:col-span-7">
          <div
            className="text-[10px] leading-[1.65] tracking-[0.08em]"
            data-testid="current-info"
          >
            {currentInfo}
          </div>
        </div>

        <div className="flex justify-end md:col-span-2">
          <button
            className="border-b border-[#191816]/50 pb-1 text-[8px] uppercase tracking-[0.2em] transition-opacity hover:opacity-50"
            onClick={handleToggle}
            type={state ? "reset" : "button"}
            data-testid="edit-button"
            data-active={state}
          >
            {state ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>

      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
            {
              "max-h-[200px] opacity-100": isSuccess,
              "max-h-0 opacity-0": !isSuccess,
            }
          )}
          data-testid="success-message"
        >
          <div className="border-t border-[#191816]/10 py-3 text-[8px] uppercase tracking-[0.18em] opacity-60">
            {label} updated successfully
          </div>
        </Disclosure.Panel>
      </Disclosure>

      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
            {
              "max-h-[200px] opacity-100": isError,
              "max-h-0 opacity-0": !isError,
            }
          )}
          data-testid="error-message"
        >
          <div className="border-t border-[#191816]/10 py-3 text-[8px] uppercase tracking-[0.18em]">
            {errorMessage}
          </div>
        </Disclosure.Panel>
      </Disclosure>

      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
            {
              "max-h-[1400px] opacity-100": state,
              "max-h-0 opacity-0": !state,
            }
          )}
        >
          <div className="border-t border-[#191816]/15 pb-8 pt-6">
            <div className="max-w-3xl">{children}</div>

            <div className="mt-6 flex justify-end">
              <button
                disabled={pending}
                className="min-w-[160px] bg-[#191816] px-7 py-4 text-[8px] uppercase tracking-[0.2em] text-[#EEEAE1] transition-opacity hover:opacity-80 disabled:opacity-40"
                type="submit"
                data-testid="save-button"
              >
                {pending ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}

export default AccountInfo
