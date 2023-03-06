import React, { useState, useEffect } from "react"
import Axios from "axios"

/**
 * TODO:
 * [x] Figure out how to bypass CORS - potentially proxying
 * [] Develop a search bar - search for GE items
 * [] Develop a way to add to page/state - likely in a table
 */

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
    Axios.get("http://localhost:3001/api/items").then((res) => {
      setAllItems(res.data.items)
      console.log(res.data.items)
    })
  }, [])

  return (
    <div>
      {allItems &&
        allItems.map((item, key) => {
          return (
            <div key={key}>
              <h1>{item.name}</h1>
              <p>{item.description}</p>
              <p>{item.current.price}</p>
            </div>
          )
        })}
    </div>
  )
}
