export const unixTimestampNow = () => Math.floor(Date.now() / 1000)

export function numberWithCommas(x: any) {
  if (!x) {
    return '...'
  }
  const parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
