import type { Op } from '@aelea/core'
import type { ContractFactory } from '@ethersproject/contracts'
import type { BaseProvider } from '@ethersproject/providers'
import { Web3Provider } from '@ethersproject/providers'
import { awaitPromises, map, now, switchLatest } from '@most/core'
import { curry2 } from '@most/prelude'
import type { Stream } from '@most/types'

import type { IToken } from '../middleware'
import { getLabItemTupleIndex } from '../middleware'

interface ISwitchOpCurry2 {
  <T, R>(s: Stream<T>, oop: Op<T, Promise<R>>): Stream<R>
  <T, R>(s: Stream<T>): (oop: Op<T, Promise<R>>) => Stream<R>
}

export const switchOp: ISwitchOpCurry2 = curry2(function <T, R>(
  s: Stream<T>,
  oop: Op<T, Promise<R>>,
): Stream<R> {
  return awaitPromises(switchLatest(map((c) => oop(now(c)), s)))
})

export function readContract<
  T extends string,
  TContract extends typeof ContractFactory,
  TProvider extends BaseProvider,
>(contractCtr: TContract, provider: Stream<TProvider>, address: T) {
  // @ts-ignore
  type RetContract = ReturnType<TContract['connect']>

  const contract = awaitPromises(
    map(async (provider): Promise<RetContract> => {
      const signerOrProvider = provider instanceof Web3Provider ? provider.getSigner() : provider
      // @ts-ignore
      const contract = contractCtr.connect(address, signerOrProvider)

      return contract
    }, provider),
  )

  return contract
}

export function getBerryFromToken(token: IToken) {
  return getBerryFromItems(token.labItems.map((it) => Number(it.id)))
}

export function getBerryFromItems(items: number[]) {
  const seedObj = { background: 0, badge: 0, custom: 0 }

  return items.reduce((seed, next) => {
    const ndx = getLabItemTupleIndex(next)

    if (ndx === 0) {
      seed.background = next
    } else if (ndx === 6) {
      seed.badge = next
    } else {
      seed.custom = next
    }

    return seed
  }, seedObj)
}
