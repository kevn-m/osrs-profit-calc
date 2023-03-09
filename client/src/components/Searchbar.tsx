import React from "react"

interface Props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Searchbar = (props: Props) => {
  const { handleChange } = props

  return (
    <input
      className="border-solid"
      onChange={handleChange}
      placeholder="Search an item"
    ></input>
  )
}
