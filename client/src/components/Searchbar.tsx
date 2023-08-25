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

  const [searchTerm, setSearchTerm] = useState<string>("")

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
    setSearchTerm(e.target.value.toLowerCase())

    if (searchTerm === "") {
      setFilteredItems(undefined)
    } else {
      setFilteredItems(
        items?.filter((item) => {
          return item.name.toLowerCase().includes(searchTerm)
        })
      )
      setIsDropdownOpen(true)
    }
  }

  const handleItemClick = (item: types.Item) => {
    handleClick(item)
    setIsDropdownOpen(false)
    setSearchTerm("")
  }

  const generateRandomItemName = () => {
    if (items) {
      const randomIndex = Math.floor(Math.random() * items?.length)
      return `e.g. ${items[randomIndex].name}`
    } else {
      return ""
    }
  }

  return (
    <div className="relative sm:w-full flex justify-center">
      <input
        className="border-none h-12 w-full px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        onChange={handleChange}
        value={searchTerm}
        placeholder={generateRandomItemName()}
      />
      {isDropdownOpen && filteredItems && (
        <div
          ref={dropdownRef}
          className="absolute w-full top-10 bg-white border border-gray-300 z-10 max-h-60 overflow-y-auto"
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
