import React from "react"
import osrsItemLogo from "../assets/osrsItemLogo.png"

export const Logo = () => {
  return (
    <div>
      <img
        src={osrsItemLogo}
        alt="OSRS Item Logo"
        className="mx-auto w-52 rounded-full pt-3 shadow-lg"
      />
    </div>
  )
}
