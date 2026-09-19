"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import useToggleState from "@lib/hooks/use-toggle-state"
import { ArrowRightMini } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@modules/common/components/ui"
import { Fragment } from "react"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { Locale } from "@lib/data/locales"

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  const links = [
    { name: "Shop", href: "/store" },
    { name: "Men", href: "/store?audience=men" },
    { name: "Women", href: "/store?audience=women" },
    { name: "About", href: "/about" },
  ]

  return (
    <div className="h-full">
      <Popover className="flex h-full">
        {({ open, close }) => (
          <>
            <Popover.Button
              data-testid="nav-menu-button"
              className="flex h-full items-center text-[10px] uppercase tracking-[0.22em] transition-opacity duration-300 hover:opacity-55 focus:outline-none"
            >
              Menu
            </Popover.Button>

            <Transition
              show={open}
              as={Fragment}
              enter="transition duration-500 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition duration-300 ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <PopoverPanel
                static
                className="fixed inset-0 z-[100] flex min-h-[100svh] flex-col bg-[#EEEAE1] text-[#191816]"
              >
                {/* Header */}
                <div className="flex h-[76px] items-center justify-between px-5">
                  <LocalizedClientLink
                    href="/"
                    onClick={close}
                    className="font-serif text-[22px] leading-none tracking-[-0.03em]"
                  >
                    AYLA
                  </LocalizedClientLink>

                  <button
                    type="button"
                    onClick={close}
                    data-testid="close-menu-button"
                    className="text-[10px] uppercase tracking-[0.22em] transition-opacity hover:opacity-50"
                  >
                    Close
                  </button>
                </div>

                {/* Main navigation */}
                <div className="flex flex-1 items-center px-5">
                  <nav>
                    <ul className="flex flex-col">
                      {links.map((link) => (
                        <li key={link.name}>
                          <LocalizedClientLink
                            href={link.href}
                            onClick={close}
                            className="font-serif text-[clamp(3.25rem,16vw,5.5rem)] leading-[0.98] tracking-[-0.055em] transition-opacity duration-300 hover:opacity-45"
                          >
                            {link.name}
                          </LocalizedClientLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* Utilities */}
                <div className="px-5 pb-6">
                  <div className="mb-8 border-t border-[#191816]/20 pt-5">
                    {!!locales?.length && (
                      <div
                        className="mb-4 flex items-center justify-between text-[9px] uppercase tracking-[0.2em]"
                        onMouseEnter={languageToggleState.open}
                        onMouseLeave={languageToggleState.close}
                      >
                        <LanguageSelect
                          toggleState={languageToggleState}
                          locales={locales}
                          currentLocale={currentLocale}
                        />

                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            languageToggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                    )}

                    <div
                      className="flex items-center justify-between text-[9px] uppercase tracking-[0.2em]"
                      onMouseEnter={countryToggleState.open}
                      onMouseLeave={countryToggleState.close}
                    >
                      {regions && (
                        <CountrySelect
                          toggleState={countryToggleState}
                          regions={regions}
                        />
                      )}

                      <ArrowRightMini
                        className={clx(
                          "transition-transform duration-150",
                          countryToggleState.state ? "-rotate-90" : ""
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex items-end justify-between text-[8px] uppercase tracking-[0.2em] text-[#191816]/55">
                    <span>© AYLA {new Date().getFullYear()}</span>
                    <span>Drop 01</span>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

export default SideMenu
