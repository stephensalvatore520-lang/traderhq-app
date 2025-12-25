export type MarketType = "stocks" | "crypto";

export type AssetRow = {
  id: string;
  market: MarketType;
  symbol: string;
  name: string;
  price: number;
  change24h: number;   // percent
  volume24h: number;   // dollars
  marketCap: number;   // dollars
  liquidity?: number;  // crypto only
};
