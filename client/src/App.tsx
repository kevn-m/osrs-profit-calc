import React from "react"
import { HomePage } from "./pages/HomePage"
import { Logo } from "./components/Logo"

export const App = () => {
  return (
    <div className="bg-slate-300 h-screen">
      <Logo />
      <HomePage />
    </div>
  )
}
