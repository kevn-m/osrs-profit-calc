const isProduction = process.env.NODE_ENV === "production"

export const apiUrl = isProduction
  ? "https://osrs-item-prices-backend-lrttjn986-kevn-m.vercel.app"
  : "http://localhost:3001"
