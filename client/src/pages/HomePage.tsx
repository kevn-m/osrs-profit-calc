import React, { useState, useEffect } from "react"
import Axios, { AxiosResponse } from "axios"
import { Searchbar } from "../components/Searchbar"

/**
 * TODO:
 * [x] Figure out how to bypass CORS - potentially proxying
 * [] Develop a search bar - search for GE items
 * [] Develop a way to add to page/state - likely in a table
 */

export interface Item {
  examine: string
  id: number
  members: boolean
  lowalch?: number
  limit?: number
  value: number
  highalch?: number
  icon: string
  name: string
}

export const HomePage = () => {
  const [allItems, setAllItems] = useState<Item[]>()
  const [filteredItems, setFilteredItems] = useState<Item[]>()

  useEffect(() => {
    Axios.get("http://localhost:3001/api/items").then(
      (res: AxiosResponse<Item[]>) => {
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
      <div>
        {filteredItems &&
          filteredItems.map((item) => {
            return (
              <div key={item.id}>
                <h1>{item.name}</h1>
                <p>{item.value}</p>
                <p>{item.examine}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}
