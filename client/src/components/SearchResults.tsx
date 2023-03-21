import React from "react"
import * as types from "../types"

export interface Props {
  filteredItems: types.Item[] | undefined
}

export const SearchResults = (props: Props) => {
  const { filteredItems } = props

  return <div> Something </div>
}
