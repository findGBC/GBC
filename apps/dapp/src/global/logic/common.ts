import type { Op } from '@aelea/core'
// import { $svg, attr, style } from '@aelea/dom'
// import { colorAlpha, pallete, theme } from '@aelea/ui-components-theme'
import type { ContractFactory } from '@ethersproject/contracts'
import type { BaseProvider } from '@ethersproject/providers'
import { Web3Provider } from '@ethersproject/providers'
import {
  awaitPromises,
  continueWith,
  map,
  now,
  switchLatest,
  takeWhile,
} from '@most/core'
import { curry2 } from '@most/prelude'
import type { Stream } from '@most/types'

import type { CHAIN, IToken } from '../middleware'
import { getLabItemTupleIndex } from '../middleware'

export type TContractMapping<T> = {
  [P in CHAIN]?: {
    [Z in keyof T]: T[Z]
  }
}

export function takeUntilLast<T>(fn: (t: T) => boolean, s: Stream<T>) {
  let last: T

  return continueWith(
    () => now(last),
    takeWhile((x) => {
      const res = !fn(x)
      last = x

      return res
    }, s),
  )
}

export function getContractAddress<T, Z extends TContractMapping<T>>(
  contractMap: Z,
  chain: CHAIN,
  contractName: keyof T,
): T[keyof T] | null {
  const addressMapping = contractMap[chain]

  if (!addressMapping) {
    return null
  }

  const newLocal = addressMapping[contractName]
  return newLocal
}

// export function readContractMapping<
//   TProvider extends BaseProvider,
//   TMap,
//   TCmap extends TContractMapping<TMap>,
//   TContract extends typeof ContractFactory,
// >(
//   contractMap: TCmap,
//   contractCtr: TContract,
//   connect: Stream<TProvider>,
//   contractName: keyof TMap,
// ) {
//   // @ts-ignore
//   type RetContract = ReturnType<TContract['connect']>

//   const contract = filterNull(
//     map((provider): RetContract | null => {
//       if (!provider || !provider.network?.chainId) {
//         return null
//       }

//       const chainId = provider.network.chainId as CHAIN

//       const address = getContractAddress(contractMap, chainId, contractName)

//       if (address === null) {
//         return null
//       }

//       // @ts-ignore
//       const contract = contractCtr.connect(
//         address,
//         provider instanceof Web3Provider ? provider.getSigner() : provider,
//       )

//       return contract
//     }, connect),
//   )

//   const run = <R>(op: Op<RetContract, Promise<R>>) => {
//     const switchOp = switchLatest(
//       map((c) => {
//         const internalOp = awaitPromises(op(now(c)))
//         const recoverOpError = recoverWith((err) => {
//           console.warn(err)
//           return empty()
//         }, internalOp)

//         return recoverOpError
//       }, contract),
//     )

//     return switchOp
//   }

//   const readInt = (op: Op<RetContract, Promise<BigNumber>>): Stream<bigint> => {
//     const newLocal = O(
//       op,
//       map(async (n) => {
//         return (await n).toBigInt()
//       }),
//     )

//     return run(newLocal)
//   }

//   // @ts-ignore
//   const _listen = <
//     T extends RetContract,
//     Name extends keyof T['filters'],
//     ET extends GetEventFilterType<T, Name>,
//   >(
//     name: Name extends string ? Name : never,
//   ): Stream<ET & { __event: Event }> =>
//     switchLatest(
//       map((res) => {
//         if (res === null) {
//           return never()
//         }

//         // @ts-ignore
//         return multicast(listen(res, name))
//       }, contract),
//     )

//   return { contract, listen: _listen, readInt, run }
// }

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
      const signerOrProvider =
        provider instanceof Web3Provider ? provider.getSigner() : provider
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
  const seedObj = { background: 0, badge: 0, custom: 0, }

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