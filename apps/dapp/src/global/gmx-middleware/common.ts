import { intervalTimeMap } from './constant'
import { unixTimestampNow } from './utils'

const intervals = [
  { label: 'year', seconds: intervalTimeMap.MONTH * 12 },
  { label: 'month', seconds: intervalTimeMap.MONTH },
  { label: 'day', seconds: intervalTimeMap.HR24 },
  { label: 'hr', seconds: intervalTimeMap.MIN * 60 },
  { label: 'min', seconds: intervalTimeMap.MIN },
  { label: 'sec', seconds: intervalTimeMap.SEC },
] as const

export function timeSince(time: number) {
  const timeDelta = Math.abs(unixTimestampNow() - time)
  const interval = intervals.find((i) => i.seconds < timeDelta)

  if (!interval) {
    return 'now'
  }

  const count = Math.floor(timeDelta / interval.seconds)
  return `${count} ${interval.label}${count !== 1 ? 's' : ''}`
}

export const displayDate = (unixTime: number) => {
  return `${new Date(unixTime * 1000).toDateString()} ${new Date(
    unixTime * 1000,
  ).toLocaleTimeString()}`
}

