export type TreasuryDetails = {
  totalValue: number;
  arbitrumBalances: Array<Asset>;
  avalancheBalances: Array<Asset>;
}

export interface Asset {
  address: string;
  symbol: string;
  logos?: string[];
  decimals: number;
  chain: string,
  name: string;
  isNative: boolean;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  balance: number;
  usdValue: number;
  type: string;
  balances?: { symbol: string; balance: number; usdValue: number; }[];
}