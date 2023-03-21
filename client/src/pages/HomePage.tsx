import React, { useState, useEffect } from "react"
import Axios, { AxiosResponse } from "axios"
import { Searchbar } from "../components/Searchbar"
import * as types from "../types"
import { SearchResults } from "../components/SearchResults"

/**
 * TODO:
 * [] Add dropdown from searchbar to select item
 * [] When clicked, pull the ID of item and search with prices api for latest
 * [] Create a table to store all the items and their prices
 */

export const HomePage = () => {
  const [allItems, setAllItems] = useState<types.Item[]>()
  const [filteredItems, setFilteredItems] = useState<types.Item[]>()

  useEffect(() => {
    Axios.get("http://localhost:3001/api/items").then(
      (res: AxiosResponse<types.Item[]>) => {
        setAllItems(res.data)
      }
    )
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase()

    if (searchValue === "") {
      setFilteredItems(undefined)
    } else {
      setFilteredItems(
        allItems?.filter((item) => {
          return item.name.toLowerCase().includes(searchValue)
        })
      )
    }
  }

  return (
    <div>
      <Searchbar handleChange={handleChange} />
      <SearchResults filteredItems={filteredItems} />
    </div>
  )
}
