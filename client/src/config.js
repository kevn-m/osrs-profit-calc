const isProduction = process.env.NODE_ENV === "production"

export const apiUrl = isProduction
  ? "https://osrs-profit-calc.vercel.app"
  : "http://localhost:3001"
