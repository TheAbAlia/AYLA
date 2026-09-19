"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState<LOGIN_VIEW>(
    LOGIN_VIEW.SIGN_IN
  )

  return (
    <main className="min-h-[calc(100svh-88px)] bg-[#EEEAE1] text-[#191816]">
      <div className="px-5 pb-24 pt-10 md:px-[4.7%] md:pb-32 md:pt-12">
        {/* TOP RULE */}
        <div className="flex items-center justify-between border-t border-[#191816]/25 pt-4">
          <span className="text-[8px] uppercase tracking-[0.28em] opacity-45">
            AYLA / Account
          </span>

          <span className="text-[8px] uppercase tracking-[0.28em] opacity-45">
            001
          </span>
        </div>

        {/* PAGE TITLE */}
        <div className="mt-14 md:mt-20">
          <h1 className="font-serif text-[clamp(64px,8vw,138px)] font-normal leading-[0.8] tracking-[-0.055em]">
            Account
          </h1>
        </div>

        {/* CONTENT */}
        <div className="mt-16 grid grid-cols-1 border-t border-[#191816]/20 pt-7 md:mt-20 md:grid-cols-12 md:pt-8">
          {/* LEFT */}
          <div className="md:col-span-5">
            <p className="text-[8px] uppercase tracking-[0.26em] opacity-45">
              Client area
            </p>

            <p className="mt-8 max-w-[270px] text-[9px] uppercase leading-[1.8] tracking-[0.18em] opacity-55">
              Access your orders,
              <br />
              addresses and personal details.
            </p>
          </div>

          {/* FORM */}
          <div className="mt-14 md:col-span-4 md:col-start-8 md:mt-0 lg:col-span-3 lg:col-start-9">
            {currentView === LOGIN_VIEW.SIGN_IN ? (
              <Login setCurrentView={setCurrentView} />
            ) : (
              <Register setCurrentView={setCurrentView} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginTemplate
