import React, { useState, useEffect } from "react"
import Axios, { AxiosResponse } from "axios"
import { Searchbar } from "../components/Searchbar"
import * as types from "../types"

export const HomePage = () => {
  const [allItems, setAllItems] = useState<types.Item[]>()
  const [allPrices, setAllPrices] = useState<types.PriceResponse | undefined>(
    undefined
  )
  const [selectedItems, setSelectedItems] = useState<types.Item[]>()

  const getAllItems = () => {
    Axios.get("http://localhost:3001/api/items").then(
      (res: AxiosResponse<types.Item[]>) => {
        setAllItems(res.data)
      }
    )
  }

  const getLatestPrices = () => {
    Axios.get("http://localhost:3001/api/prices").then(
      (res: AxiosResponse<types.PriceResponse>) => {
        setAllPrices(res.data)
      }
    )
  }

  const transformItems = (
    items: types.Item[] | undefined,
    prices: types.PriceResponse | undefined
  ): types.TransformedItems[] => {
    const transformedItems = items?.map((item) => {
      const { id, name, examine, highalch: highAlch, limit, icon } = item
      const itemPrices = prices?.data[id.toString()]

      return {
        id,
        name,
        examine,
        highAlch: highAlch ?? 0,
        limit: limit ?? 0,
        icon,
        prices: {
          avgHighPrice: itemPrices?.avgHighPrice ?? null,
          highPriceVolume: itemPrices?.highPriceVolume ?? 0,
          avgLowPrice: itemPrices?.avgLowPrice ?? null,
          lowPriceVolume: itemPrices?.lowPriceVolume ?? 0,
        },
      }
    })
    return transformedItems ?? []
  }

  const handleClick = (item: types.Item) => {
    setSelectedItems((prev) => {
      if (prev) {
        return [...prev, item]
      } else {
        return [item]
      }
    })
  }

  const buildSelectedItems = () => {
    const transformedSelectedItems = transformItems(selectedItems, allPrices)
    return transformedSelectedItems
  }

  useEffect(() => {
    getAllItems()
    getLatestPrices()
  }, [])

  useEffect(() => {
    buildSelectedItems()
  }, [selectedItems])

  return (
    <div>
      <Searchbar items={allItems} handleClick={handleClick} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Examine</th>
            <th>High Alch</th>
            <th>Limit</th>
            <th>Avg High Price</th>
            <th>Avg Low Price</th>
          </tr>
        </thead>
        <tbody>
          {buildSelectedItems()?.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.examine}</td>
              <td>{item.highAlch}</td>
              <td>{item.limit}</td>
              <td>{item.prices.avgHighPrice ?? "-"}</td>
              <td>{item.prices.avgLowPrice ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
