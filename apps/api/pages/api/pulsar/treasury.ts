import type { NextApiRequest, NextApiResponse } from "next";
import { ChainKeys } from 'pulsar_sdk_js';
import {TreasuryDetails} from "../../../interfaces";
import axios from 'axios';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<TreasuryDetails>,
) {
  switch (req.method) {
    case "GET":
      // Get data from your dat
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

      res.status(200).json({ totalValue: +arbResponse.data.stats.current_networth + (+avalacheResponse.data.stats.current_networth) });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
