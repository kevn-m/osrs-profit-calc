import React from "react"
import osrsItemLogo from "../assets/osrsItemLogo.png"

export const Logo = () => {
  return (
    <div>
      <img
        src={osrsItemLogo}
        alt="OSRS Item Logo"
        className="mx-auto w-60 pt-3"
      />
    </div>
  )
}
