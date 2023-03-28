import React, { useState } from "react"
import * as types from "../types"

interface Props {
  items: types.Item[] | undefined
}

export const Searchbar = (props: Props) => {
  const { items } = props

  const [filteredItems, setFilteredItems] = useState<types.Item[]>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase()

    if (searchValue === "") {
      setFilteredItems(undefined)
    } else {
      setFilteredItems(
        items?.filter((item) => {
          return item.name.toLowerCase().includes(searchValue)
        })
      )
    }
  }

  return (
    <div>
      <input
        className="border"
        onChange={handleChange}
        placeholder="Search an item"
      />
      {filteredItems && (
        <div className="absolute top-12 bg-white border border-gray-300 z-10 max-h-60 overflow-y-auto">
          {filteredItems.map((item) => (
            <div
              onClick={() => console.log(item)}
              key={item.id}
              className="px-4 py-2 hover:bg-gray-200"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
