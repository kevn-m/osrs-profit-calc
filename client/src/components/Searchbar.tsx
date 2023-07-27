import React, { useState, useRef, useEffect } from "react"
import * as types from "../types"

interface Props {
  items: types.Item[] | undefined
  handleClick: (item: types.Item) => void
}

export const Searchbar = (props: Props) => {
  const { items, handleClick } = props

  const [filteredItems, setFilteredItems] = useState<types.Item[]>()
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [])

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false)
    }
  }

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
      setIsDropdownOpen(true)
    }
  }

  const handleItemClick = (item: types.Item) => {
    handleClick(item)
    setIsDropdownOpen(false)
  }

  return (
    <div>
      <input
        className="border-none w-full h-12 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        onChange={handleChange}
        placeholder="Search an item"
      />
      {isDropdownOpen && filteredItems && (
        <div
          ref={dropdownRef}
          className="absolute top-12 bg-white border border-gray-300 z-10 max-h-60 overflow-y-auto"
        >
          {filteredItems?.map((item) => (
            <div
              onClick={() => handleItemClick(item)}
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
