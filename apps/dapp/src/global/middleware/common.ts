import { IAccountSummaryV2 } from '../gmx-middleware'
import { getMarginFees } from '../gmx-middleware/gmxUtils'

import { BASIS_POINTS_DIVISOR } from './constant'
import svgParts from './mappings/svgParts'
import type {
  IAccountSummary,
  IBerryDisplayTupleMap,
  ICompetitionPrize,
  ICompetitionSchedule,
} from './types'
import {
  IAttributeBackground,
  IAttributeBadge,
  IAttributeBody,
  IAttributeClothes,
  IAttributeExpression,
  IAttributeFaceAccessory,
  IAttributeHat,
  intervalTimeMap,
} from './types'
import { unixTimestampNow } from './utils'
//const svgParts = importGlobal(import("@gambitdao/gbc-middleware/src/mappings/svgParts"))
export const USD_PERCISION = 10n ** 30n

export const labAttributeTuple = [
  IAttributeBackground,
  IAttributeClothes,
  IAttributeBody,
  IAttributeExpression,
  IAttributeFaceAccessory,
  IAttributeHat,
  IAttributeBadge,
] as const

export const getLabItemTupleIndex = (itemId: number) => {
  const attrMap =
    itemId in IAttributeBackground
      ? IAttributeBackground
      : itemId in IAttributeClothes
        ? IAttributeClothes
        : itemId in IAttributeBody
          ? IAttributeBody
          : itemId in IAttributeExpression
            ? IAttributeExpression
            : itemId in IAttributeFaceAccessory
              ? IAttributeFaceAccessory
              : itemId in IAttributeHat
                ? IAttributeHat
                : itemId in IAttributeBadge
                  ? IAttributeBadge
                  : null

  if (attrMap === null) {
    throw new Error(`item id: ${itemId} doesn't match any attribute`)
  }

  return labAttributeTuple.indexOf(attrMap)
}

export const berryPartsToSvg = ([
  background,
  clothes,
  body,
  expression,
  faceAccessory,
  hat,
  badge,
]: Partial<IBerryDisplayTupleMap>) => {
  return `
    ${background ? svgParts[0][background] : ''}
    ${svgParts[1][clothes ? clothes : IAttributeClothes.NUDE]}
    ${svgParts[2][body ? body : IAttributeBody.BLUEBERRY]}
    ${expression ? svgParts[3][expression] : ''}
    ${faceAccessory ? svgParts[4][faceAccessory] : ''}
    ${svgParts[5][hat ? hat : IAttributeHat.NUDE]}
    ${badge ? svgParts[6][badge] : ''}
  `
}

export const competitionStartEpoch = 2023 + 6 // year + month

export function getCompetitionSchedule(
  unixTime = unixTimestampNow(),
  history = 0,
): ICompetitionSchedule {
  const date = new Date(unixTime * 1000)

  const epoch = Math.abs(
    date.getUTCFullYear() + date.getUTCMonth() + history - competitionStartEpoch,
  )

  date.setMonth(date.getUTCMonth() - history)

  const competitionYear = date.getUTCFullYear()
  const competitionMonth = date.getUTCMonth()

  const start = Date.UTC(competitionYear, competitionMonth) / 1000
  const duration = intervalTimeMap.HR24 * 25 + intervalTimeMap.MIN60 * 16
  const end = start + duration

  const elapsed = Math.min(unixTime, end) - start
  const ended = duration === elapsed

  const previous =
    unixTime >= start ? Date.UTC(competitionYear, competitionMonth - 1, 1, 16) / 1000 : start
  const next =
    unixTime >= start ? Date.UTC(competitionYear, competitionMonth + 1, 1, 16) / 1000 : start

  return { date, duration, elapsed, end, ended, epoch, next, previous, start }
}

export function getCompetitionMetrics(
  size: bigint,
  competition: ICompetitionSchedule,
): ICompetitionPrize {
  const estSize = (size * BigInt(competition.duration)) / BigInt(competition.elapsed)
  const feeMultiplier = 2500n
  const feePool = (getMarginFees(size) * feeMultiplier) / BASIS_POINTS_DIVISOR
  const estFeePool = (feePool * BigInt(competition.duration)) / BigInt(competition.elapsed)

  return { estFeePool, estSize, feeMultiplier, feePool }
}

const MIN_PNL_THRESHOLD = USD_PERCISION * 1n

export function isWinner(summary: IAccountSummaryV2) {
  return summary.pnl > MIN_PNL_THRESHOLD
}

export function groupByKey<A, B extends string | symbol | number>(list: A[], getKey: (v: A) => B) {
  return groupByKeyMap(list, getKey, (x) => x)
}

export function groupByKeyMap<A, B extends string | symbol | number, R>(
  list: A[],
  getKey: (v: A) => B,
  mapFn: (v: A) => R,
) {
  const gmap = {} as { [P in B]: R }

  list.forEach((item) => {
    const key = getKey(item)

    if (gmap[key]) {
      // console.warn(new Error(`${groupByKey.name}() is overwriting property: ${String(key)}`))
    }

    gmap[key] = mapFn(item)
  })

  return gmap
}
