import React, { useState, useEffect } from "react"
import Axios, { AxiosResponse } from "axios"

/**
 * TODO:
 * [] Figure out how to bypass CORS - potentially proxying
 * [] Develop a search bar - search for GE items
 * [] Develop a way to add to page/state - likely in a table
 */

const pricesBaseUrl = "prices.runescape.wiki/api/v1/osrs"
const itemsBaseUrl =
  "https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/items.json?category=1&"

export type Item = {
  icon: string
  icon_large: string
  id: number
  type: string
  typeIcon: string
  name: string
  description: string
  current: {
    trend: string
    price: string
  }
  today: {
    trend: string
    price: string
  }
  members: string
}

export const HomePage = () => {
  const [allItems, setAllItems] = useState<Item[]>()

  useEffect(() => {
    Axios.get(`${itemsBaseUrl}alpha=rune 2&page=1`).then((res) => {
      setAllItems(res.data.items)
      console.log(res.data)
    })
  })

  return (
    <div>
      {allItems &&
        allItems.map((item) => {
          return (
            <div>
              <h1>{item.name}</h1>
              <p>{item.description}</p>
              <p>{item.current.price}</p>
            </div>
          )
        })}
    </div>
  )
}
