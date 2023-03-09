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

  useEffect(() => {
    Axios.get("http://localhost:3001/api/items").then(
      (res: AxiosResponse<Item[]>) => {
        setAllItems(res.data)
        console.log(res.data)
      }
    )
  }, [])

  return (
    <div>
      <Searchbar />
    </div>
  )
}
