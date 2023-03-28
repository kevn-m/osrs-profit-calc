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

export interface PriceResponse {
  data: {
    [key: string]: {
      avgHighPrice: number | null
      highPriceVolume: number
      avgLowPrice: number | null
      lowPriceVolume: number
    }
  }
  timestamp: number
}
