import type {NextApiRequest, NextApiResponse} from "next";
import {ChainKeys, PulsarSDK, WalletIntegration} from 'pulsar_sdk_js';
import {initializeApp} from "firebase/app";
import {doc, getDoc, setDoc, getFirestore} from "firebase/firestore";
import {Asset, TreasuryDetails} from "../../../interfaces";
import axios from 'axios';
import dayjs from "dayjs";
import { getAuth, signInAnonymously } from "firebase/auth";

const dateFormat = "DD-MM-YYYY";
export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<TreasuryDetails>,
) {
  switch (req.method) {
    case "GET":
      const firebaseConfig = {
        apiKey: "AIzaSyDVg3bmAYvvhCI09eup8ejdln4IS8T5Q10",
        authDomain: "gbc-cache.firebaseapp.com",
        projectId: "gbc-cache",
        storageBucket: "gbc-cache.appspot.com",
        messagingSenderId: "786414618504",
        appId: "1:786414618504:web:c868e236809a1e06341c3d"
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
    async function getWalletBalances() {
      /*
      * "stats": [
            {
                "token": {
                    "name": "Ethereum",
                    "denom": "ETH",
                    "id": "6536aae7e88d67ced04b72ee",
                    "display_id": "6536aae7e88d67ced04b72ee",
                    "image": "https://pulsar-images.s3.eu-west-1.amazonaws.com/tokens/Ethereum.png",
                    "latest_price": "2979.306448749154",
                    "price_24h_change": "-58.5823819457446",
                    "chain_properties": {
                        "chain": "ARBITRUM",
                        "id": {
                            "type": "native_token",
                            "value": "ETH"
                        },
                        "decimals": 18
                    }
                },
                "wallet": {
                    "address": "0xde2dbb7f1c893cc5e2f51cbfd2a73c8a016183a0",
                    "chain": "ARBITRUM"
                },
                "usd_value": "186777.3179040866",
                "balance": "62.69154285303685"
            }
        ],
        "errors": []
      * */

      // [].stats.token{}
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
        axios.request(avalancheOptions)
      ]);

      let arbitrumBalances: Array<Asset> = [];
      for await (const balance of arbitrumBalanceResponse) {
        if('stats' in balance) {
          for (const stats of balance?.stats) {
            if("token" in stats) {
              arbitrumBalances.push({
              address: stats?.wallet?.address ?? process.env.ARBITRUM_GBC_TREASURY_ADDRESS,
              symbol: stats?.token?.denom ?? stats?.token?.chain_properties?.id?.value,
              logo: stats?.token?.image,
              decimals: stats?.token?.chain_properties?.decimals ?? 0,
              chain: stats?.token?.chain_properties?.chain ?? stats?.wallet?.chain,
              name: stats?.token?.name,
              isNative: stats?.token?.chain_properties?.id?.type === 'native_token',
              price: Number(stats?.token?.latest_price),
              createdAt: dayjs().toDate(),
              updatedAt: dayjs().toDate(),
              balance: Number(stats?.balance),
              usdValue: Number(stats?.usd_value)
            });
          } else if('balances' in stats && 'integration' in stats) {
              for(const depositBalance of stats.balances) {
                arbitrumBalances.push({
                  address: depositBalance?.wallet?.address ?? process.env.ARBITRUM_GBC_TREASURY_ADDRESS,
                  symbol: depositBalance?.token?.denom ?? depositBalance?.token?.chain_properties?.id?.value,
                  logo: depositBalance?.token?.image,
                  decimals: depositBalance?.token?.chain_properties?.decimals ?? 0,
                  chain: depositBalance?.token?.chain_properties?.chain ?? depositBalance?.wallet?.chain,
                  name: depositBalance?.token?.name,
                  isNative: depositBalance?.token?.chain_properties?.id?.type === 'native_token',
                  price: Number(depositBalance?.token?.latest_price),
                  createdAt: dayjs().toDate(),
                  updatedAt: dayjs().toDate(),
                  balance: Number(depositBalance?.balance),
                  usdValue: Number(depositBalance?.usd_value)
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
              avalancheBalances.push({
                address: stats?.wallet?.address ?? process.env.ARBITRUM_GBC_TREASURY_ADDRESS,
                symbol: stats?.token?.denom ?? stats?.token?.chain_properties?.id?.value,
                logo: stats?.token?.image,
                decimals: stats?.token?.chain_properties?.decimals ?? 0,
                chain: stats?.token?.chain_properties?.chain ?? stats?.wallet?.chain,
                name: stats?.token?.name,
                isNative: stats?.token?.chain_properties?.id?.type === 'native_token',
                price: Number(stats?.token?.latest_price),
                createdAt: dayjs().toDate(),
                updatedAt: dayjs().toDate(),
                balance: Number(stats?.balance),
                usdValue: Number(stats?.usd_value)
              });
            } else if('balances' in stats && 'integration' in stats) {
              for(const depositBalance of stats.balances) {
                avalancheBalances.push({
                  address: depositBalance?.wallet?.address ?? process.env.ARBITRUM_GBC_TREASURY_ADDRESS,
                  symbol: depositBalance?.token?.denom ?? depositBalance?.token?.chain_properties?.id?.value,
                  logo: depositBalance?.token?.image,
                  decimals: depositBalance?.token?.chain_properties?.decimals ?? 0,
                  chain: depositBalance?.token?.chain_properties?.chain ?? depositBalance?.wallet?.chain,
                  name: depositBalance?.token?.name,
                  isNative: depositBalance?.token?.chain_properties?.id?.type === 'native_token',
                  price: Number(depositBalance?.token?.latest_price),
                  createdAt: dayjs().toDate(),
                  updatedAt: dayjs().toDate(),
                  balance: Number(depositBalance?.balance),
                  usdValue: Number(depositBalance?.usd_value)
                });
              }
            }
          }
        }
      }

      return {
        totalValue: +arbResponse.data.stats.current_networth + (+avalacheResponse.data.stats.current_networth),
        arbitrumBalances,
        avalancheBalances
      } as TreasuryDetails;
    }

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
