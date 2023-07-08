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
    <div className="container mx-auto flex flex-col justify-center p-4 w-full gap-3">
      <Searchbar items={allItems} handleClick={handleClick} />
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Examine</th>
              <th className="px-4 py-2">High Alch</th>
              <th className="px-4 py-2">Limit</th>
              <th className="px-4 py-2">Avg High Price</th>
              <th className="px-4 py-2">Avg Low Price</th>
            </tr>
          </thead>
          <tbody>
            {buildSelectedItems()?.map((item, index) => (
              <tr
                key={item.id}
                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.examine}</td>
                <td className="border px-4 py-2">{item.highAlch}</td>
                <td className="border px-4 py-2">{item.limit}</td>
                <td className="border px-4 py-2">
                  {item.prices.avgHighPrice ?? "-"}
                </td>
                <td className="border px-4 py-2">
                  {item.prices.avgLowPrice ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
