import type { NextApiRequest, NextApiResponse } from "next";
import { ChainKeys, PulsarSDK } from 'pulsar_sdk_js';
import { initializeApp } from "firebase/app";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { Asset, TreasuryDetails } from "../../../interfaces";
import axios from 'axios';
import dayjs from "dayjs";
import { getAuth, signInAnonymously } from "firebase/auth";

const dateFormat = "DD-MM-YYYY";

const mapIntegrationRecipeIdToSymbol = (value) => {
  switch(value) {
    case 'GLP_STAKE_ARBITRUM':
    case 'GLP_STAKE_AVALANCHE':
      return 'GLP';
    case 'GMX_STAKE_AVAX':
      return "GMX";
    case 'AVAX_GMX_GM_POOLS':
      return 'Wrapped AVAX / USDC';
    case 'GMX_STAKE_ARBITRUM':
      return "GMX";
    case 'ARB_GMX_GM_POOLS':
      return "WETH / USDC";
    default:
      return value;
  }
}

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<TreasuryDetails>,
) {
  switch (req.method) {
    case "GET":
      const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);

      const dataSnapshot = await getDoc(doc(db, 'data', `balance-${dayjs().format(dateFormat)}`));
      const data = dataSnapshot.data();


      console.log(data);

      if(data) {
        const result = {
          ...data,
          arbitrumBalances: data.arbitrumBalances?.map(asset => {return { ...asset, createdAt: asset.createdAt?.toDate() || null, updatedAt: asset.updatedAt?.toDate() || null};}) || [],
          avalancheBalances: data.avalancheBalances?.map(asset => {return { ...asset, createdAt: asset.createdAt?.toDate() || null, updatedAt: asset.updatedAt?.toDate() || null};}) || [],
        }
        return res.status(200).json(result);
      }

      const sdk = new PulsarSDK(process.env.PULSAR_API_KEY);
    const getWalletBalances = async () => {
      const arbitrumBalanceResponse = sdk.balances.getWalletBalances(process.env.ARBITRUM_GBC_TREASURY_ADDRESS, ChainKeys.ARBITRUM)

      const arbOptions = {
        method: 'GET',
        url: `https://qa-api.pulsar.finance/v1/thirdparty/wallet/${process.env.ARBITRUM_GBC_TREASURY_ADDRESS}/timeseries?chain=${ChainKeys.ARBITRUM}&tier=1d`,
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${process.env.PULSAR_API_KEY}`
        }
      };

      const avalancheOptions = {
        method: 'GET',
        url: `https://qa-api.pulsar.finance/v1/thirdparty/wallet/${process.env.AVALANCHE_GBC_TREASURY_ADDRESS}/timeseries?chain=${ChainKeys.AVALANCHE}&tier=1d`,
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${process.env.PULSAR_API_KEY}`
        }
      };

      const [arbResponse, avalacheResponse] = await Promise.all([
        axios.request(arbOptions),
        axios.request(avalancheOptions),
      ]);


      let arbitrumBalances: Array<Asset> = [];
      for await (const balance of arbitrumBalanceResponse) {
        if('stats' in balance) {
          const sortedByUsdValue = balance?.stats.sort((a, b) => Number(a.usd_value) - Number(b.usd_value));
          for (const stats of sortedByUsdValue) {
            if("token" in stats) {
              if (Number(stats.usd_value) > 1000) {
              arbitrumBalances.push({
              address: stats?.wallet?.address ?? process.env.ARBITRUM_GBC_TREASURY_ADDRESS,
              symbol: stats?.token?.denom ?? stats?.token?.chain_properties?.id?.value,
              logos: [stats?.token?.image],
              decimals: stats?.token?.chain_properties?.decimals ?? 0,
              chain: stats?.token?.chain_properties?.chain ?? stats?.wallet?.chain,
              name: stats?.token?.name || stats?.token?.denom,
              isNative: stats?.token?.chain_properties?.id?.type === 'native_token',
              price: Number(stats?.token?.latest_price),
              createdAt: dayjs().toDate(),
              updatedAt: dayjs().toDate(),
              balance: Number(stats?.balance),
              usdValue: Number(stats?.usd_value),
              type: 'asset',
            });
              }
          } else if('balances' in stats && 'integration' in stats) {
              const deposits = stats.balances.filter(balance => balance.balance_type==='DEPOSIT').sort((a, b) => Number(a.usd_value) - Number(b.usd_value));
              let depositEntry = null;
              for(const depositBalance of deposits) {
                if(deposits.length === 1) {

                  if((depositBalance?.token?.denom ?? depositBalance?.token?.chain_properties?.id?.value) === 'GMX') {
                    arbitrumBalances.push({
                      address: depositBalance?.wallet?.address ?? process.env.ARBITRUM_GBC_TREASURY_ADDRESS,
                      symbol: depositBalance?.token?.denom ?? depositBalance?.token?.chain_properties?.id?.value,
                      logos:  [depositBalance?.token?.image],
                      decimals: depositBalance?.token?.chain_properties?.decimals ?? 0,
                      chain: depositBalance?.token?.chain_properties?.chain ?? depositBalance?.wallet?.chain,
                      name: depositBalance?.token?.name,
                      isNative: depositBalance?.token?.chain_properties?.id?.type === 'native_token',
                      price: Number(depositBalance?.token?.latest_price),
                      createdAt: dayjs().toDate(),
                      updatedAt: dayjs().toDate(),
                      balance: Number(depositBalance?.balance) - Number(process.env.ARBITRUM_TREASURY_ESGMX_BALANCE),
                      usdValue: Number(depositBalance?.usd_value) - (Number(process.env.ARBITRUM_TREASURY_ESGMX_BALANCE) * Number(depositBalance?.token?.latest_price)),
                      type: 'staking',
                    });

                    arbitrumBalances.push({
                      address: depositBalance?.wallet?.address ?? process.env.ARBITRUM_GBC_TREASURY_ADDRESS,
                      symbol: 'esGMX',
                      logos:  [depositBalance?.token?.image],
                      decimals: depositBalance?.token?.chain_properties?.decimals ?? 0,
                      chain: depositBalance?.token?.chain_properties?.chain ?? depositBalance?.wallet?.chain,
                      name: 'esGMX',
                      isNative: depositBalance?.token?.chain_properties?.id?.type === 'native_token',
                      price: Number(depositBalance?.token?.latest_price),
                      createdAt: dayjs().toDate(),
                      updatedAt: dayjs().toDate(),
                      balance: Number(process.env.ARBITRUM_TREASURY_ESGMX_BALANCE),
                      usdValue: Number(process.env.ARBITRUM_TREASURY_ESGMX_BALANCE) * Number(depositBalance?.token?.latest_price),
                      type: 'staking',
                    });
                    continue;
                  }

                  arbitrumBalances.push({
                    address: depositBalance?.wallet?.address ?? process.env.ARBITRUM_GBC_TREASURY_ADDRESS,
                    symbol: depositBalance?.token?.denom ?? depositBalance?.token?.chain_properties?.id?.value,
                    logos:  [depositBalance?.token?.image],
                    decimals: depositBalance?.token?.chain_properties?.decimals ?? 0,
                    chain: depositBalance?.token?.chain_properties?.chain ?? depositBalance?.wallet?.chain,
                    name: depositBalance?.token?.name,
                    isNative: depositBalance?.token?.chain_properties?.id?.type === 'native_token',
                    price: Number(depositBalance?.token?.latest_price),
                    createdAt: dayjs().toDate(),
                    updatedAt: dayjs().toDate(),
                    balance: Number(depositBalance?.balance),
                    usdValue: Number(depositBalance?.usd_value),
                    type: 'staking',
                  });
                  break;
                }
                const symbol = mapIntegrationRecipeIdToSymbol(stats?.integration?.recipe_id);
                const usdValue = depositEntry?.usdValue ?? 0;
                depositEntry = {
                  address: depositBalance?.wallet?.address ?? process.env.ARBITRUM_GBC_TREASURY_ADDRESS,
                  symbol: symbol,
                  logos: depositEntry?.logos ? [...depositEntry.logos ,depositBalance?.token?.image] : [depositBalance?.token?.image],
                  decimals: depositBalance?.token?.chain_properties?.decimals ?? 0,
                  chain: depositBalance?.token?.chain_properties?.chain ?? depositBalance?.wallet?.chain,
                  name: symbol,
                  isNative: depositBalance?.token?.chain_properties?.id?.type === 'native_token',
                  price: Number(depositBalance?.token?.latest_price),
                  createdAt: dayjs().toDate(),
                  updatedAt: dayjs().toDate(),
                  balance: 0,
                  balances: depositEntry ? [...depositEntry.balances, { symbol: depositBalance?.token?.denom, balance: Number(depositBalance?.balance), usdValue: Number(depositBalance?.usd_value)}] : [{symbol: depositBalance?.token?.denom, balance: Number(depositBalance?.balance), usdValue: Number(depositBalance?.usd_value)}],
                  usdValue: usdValue + Number(depositBalance?.usd_value),
                  type: 'staking',
                };
              }
              if(depositEntry != null) {
                console.log(JSON.stringify(depositEntry));
                arbitrumBalances.push(depositEntry);
              }

              const pendingRewards = stats.balances.filter(balance => balance.balance_type==='PENDING_REWARD').sort((a, b) => Number(a.usd_value) - Number(b.usd_value));
              for(const reward of pendingRewards) {
                const symbol = reward?.token?.denom ?? reward?.token?.chain_properties?.id?.value;
                const usdValue = Number(reward?.usd_value);
                arbitrumBalances.push({
                  address: reward?.wallet?.address ?? process.env.ARBITRUM_GBC_TREASURY_ADDRESS,
                  symbol: symbol,
                  logos: [reward?.token?.image],
                  decimals: reward?.token?.chain_properties?.decimals ?? 0,
                  chain: reward?.token?.chain_properties?.chain ?? reward?.wallet?.chain,
                  name: reward?.token?.name,
                  isNative: reward?.token?.chain_properties?.id?.type === 'native_token',
                  price: Number(reward?.token?.latest_price),
                  createdAt: dayjs().toDate(),
                  updatedAt: dayjs().toDate(),
                  balance: Number(reward.balance),
                  usdValue: usdValue,
                  type: 'reward',
                });
              }
            }
          }
        }
      }
      const avalancheBalanceResponse = sdk.balances.getWalletBalances(process.env.AVALANCHE_GBC_TREASURY_ADDRESS, ChainKeys.AVALANCHE)

      let avalancheBalances: Array<Asset> = [];
      for await (const balance of avalancheBalanceResponse) {
        if('stats' in balance) {
          for (const stats of balance?.stats) {
            if("token" in stats) {
              if (Number(stats.usd_value) > 1000) {
                avalancheBalances.push({
                  address: stats?.wallet?.address ?? process.env.ARBITRUM_GBC_TREASURY_ADDRESS,
                  symbol: stats?.token?.denom ?? stats?.token?.chain_properties?.id?.value,
                  logos: [stats?.token?.image],
                  decimals: stats?.token?.chain_properties?.decimals ?? 0,
                  chain: stats?.token?.chain_properties?.chain ?? stats?.wallet?.chain,
                  name: stats?.token?.name,
                  isNative: stats?.token?.chain_properties?.id?.type === 'native_token',
                  price: Number(stats?.token?.latest_price),
                  createdAt: dayjs().toDate(),
                  updatedAt: dayjs().toDate(),
                  balance: Number(stats?.balance),
                  usdValue: Number(stats?.usd_value),
                  type: 'asset',
                });
              }
            } else if('balances' in stats && 'integration' in stats) {
              const deposits = stats.balances.filter(balance => balance.balance_type==='DEPOSIT').sort((a, b) => Number(a.usd_value) - Number(b.usd_value));
              let depositEntry = null;
              for(const depositBalance of deposits) {
                if(deposits.length === 1) {
                  avalancheBalances.push({
                    address: depositBalance?.wallet?.address ?? process.env.ARBITRUM_GBC_TREASURY_ADDRESS,
                    symbol: depositBalance?.token?.denom ?? depositBalance?.token?.chain_properties?.id?.value,
                    logos: [depositBalance?.token?.image],
                    decimals: depositBalance?.token?.chain_properties?.decimals ?? 0,
                    chain: depositBalance?.token?.chain_properties?.chain ?? depositBalance?.wallet?.chain,
                    name: depositBalance?.token?.name,
                    isNative: depositBalance?.token?.chain_properties?.id?.type === 'native_token',
                    price: Number(depositBalance?.token?.latest_price),
                    createdAt: dayjs().toDate(),
                    updatedAt: dayjs().toDate(),
                    balance: Number(depositBalance?.balance),
                    usdValue: Number(depositBalance?.usd_value),
                    type: 'staking',
                  });
                  break;
                }
                const symbol = mapIntegrationRecipeIdToSymbol(stats?.integration?.recipe_id);
                const usdValue = depositEntry?.usdValue ?? 0;
                depositEntry = {
                  address: depositBalance?.wallet?.address ?? process.env.ARBITRUM_GBC_TREASURY_ADDRESS,
                  symbol: symbol,
                  logos: depositEntry?.logos ? [...depositEntry.logos ,depositBalance?.token?.image] : [depositBalance?.token?.image],
                  decimals: depositBalance?.token?.chain_properties?.decimals ?? 0,
                  chain: depositBalance?.token?.chain_properties?.chain ?? depositBalance?.wallet?.chain,
                  name: symbol,
                  isNative: depositBalance?.token?.chain_properties?.id?.type === 'native_token',
                  price: Number(depositBalance?.token?.latest_price),
                  createdAt: dayjs().toDate(),
                  updatedAt: dayjs().toDate(),
                  balance: 0,
                  balances: depositEntry ? [...depositEntry.balances, { symbol: depositBalance?.token?.denom, balance: Number(depositBalance?.balance), usdValue: Number(depositBalance?.usd_value)}] : [{symbol: depositBalance?.token?.denom, balance: Number(depositBalance?.balance), usdValue: Number(depositBalance?.usd_value)}],
                  usdValue: usdValue + Number(depositBalance?.usd_value),
                  type: 'staking',
                };
              }
              if(depositEntry != null) {
                avalancheBalances.push(depositEntry);
              }

              const pendingRewards = stats.balances.filter(balance => balance.balance_type==='PENDING_REWARD').sort((a, b) => Number(a.usd_value) - Number(b.usd_value));
              for(const reward of pendingRewards) {
                const symbol = reward?.token?.denom ?? reward?.token?.chain_properties?.id?.value;
                const usdValue = Number(reward?.usd_value);
                avalancheBalances.push({
                  address: reward?.wallet?.address ?? process.env.ARBITRUM_GBC_TREASURY_ADDRESS,
                  symbol: symbol,
                  logos: [reward?.token?.image],
                  decimals: reward?.token?.chain_properties?.decimals ?? 0,
                  chain: reward?.token?.chain_properties?.chain ?? reward?.wallet?.chain,
                  name: reward?.token?.name,
                  isNative: reward?.token?.chain_properties?.id?.type === 'native_token',
                  price: Number(reward?.token?.latest_price),
                  createdAt: dayjs().toDate(),
                  updatedAt: dayjs().toDate(),
                  balance: Number(reward.balance),
                  usdValue: usdValue,
                  type: 'reward',
                });
              }

            }
          }
        }
      }

      const sortedArbitrumBalances = arbitrumBalances.sort((a, b) => a.usdValue - b.usdValue);
      const sortedAvalancheBalances = avalancheBalances.sort((a, b) => a.usdValue - b.usdValue);
      return {
        totalValue: +arbResponse.data.stats.current_networth + (+avalacheResponse.data.stats.current_networth),
        arbitrumBalances: sortedArbitrumBalances,
        avalancheBalances: sortedAvalancheBalances
      } as TreasuryDetails;
    };

      const treasuryDetails = await getWalletBalances();
      // Get data from your dat
      const auth = getAuth();
      const authResponse = await signInAnonymously(auth)
      if (authResponse) {
        setDoc(doc(db, "data", `balance-${dayjs().format(dateFormat)}`), {
          ...treasuryDetails
        });
      }

      res.status(200).json(treasuryDetails);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
