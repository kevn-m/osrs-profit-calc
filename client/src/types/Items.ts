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

export interface LatestPriceResponse {
  data: { [key: string]: LatestPrices }
}

export interface LatestPrices {
  high: number | null
  highTime: number | null
  low: number | null
  lowTime: number | null
}

export interface TransformedItems {
  id: number
  name: string
  examine: string
  highAlch: number
  limit: number
  icon: string
  prices: {
    avgHighPrice: number | null
    highPriceVolume: number
    avgLowPrice: number | null
    lowPriceVolume: number
    highPrice: number | null
    highPriceTime: number | null
    lowPrice: number | null
    lowPriceTime: number | null
  }
}
