export function formatNumber(num?: number | null): string | null {
  if (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return null
}
