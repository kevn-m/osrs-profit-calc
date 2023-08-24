const isProduction = process.env.NODE_ENV === "production"

export const apiUrl = isProduction
  ? "https://osrs-item-prices-backend.vercel.app"
  : "http://localhost:3001"
