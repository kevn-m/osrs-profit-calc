import React, { useState, useEffect } from "react"
import Axios, { AxiosResponse } from "axios"
import { Searchbar } from "../components/Searchbar"
import * as types from "../types"

/**
 * TODO:
 * [] Add dropdown from searchbar to select item
 * [] When clicked, pull the ID of item and search with prices api for latest
 * [] Create a table to store all the items and their prices
 */

export const HomePage = () => {
  const [allItems, setAllItems] = useState<types.Item[]>()
  const [allPrices, setAllPrices] = useState<types.PriceResponse | undefined>(
    undefined
  )

  const getAllItems = () => {
    Axios.get("http://localhost:3001/api/items").then(
      (res: AxiosResponse<types.Item[]>) => {
        setAllItems(res.data)
      }
    )
  }

  const setLatestPrices = () => {
    Axios.get("http://localhost:3001/api/prices").then(
      (res: AxiosResponse<types.PriceResponse>) => {
        setAllPrices(res.data)
      }
    )
  }

  useEffect(() => {
    getAllItems()
    setLatestPrices()
  }, [])

  return (
    <div>
      <Searchbar items={allItems} />
    </div>
  )
}
