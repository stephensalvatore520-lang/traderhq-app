import { NextResponse } from "next/server";
import type { AssetRow, MarketType } from "@/lib/types";

const STOCKS: AssetRow[] = [
  { id: "AAPL", market: "stocks", symbol: "AAPL", name: "Apple", price: 196.12, change24h: 0.8, volume24h: 8.2e9, marketCap: 3.04e12 },
  { id: "TSLA", market: "stocks", symbol: "TSLA", name: "Tesla", price: 244.55, change24h: -1.2, volume24h: 6.1e9, marketCap: 7.8e11 },
];

const CRYPTO: AssetRow[] = [
  { id: "ETH", market: "crypto", symbol: "ETH", name: "Ethereum", price: 3480.5, change24h: 2.1, volume24h: 12.5e9, marketCap: 4.2e11, liquidity: 0 },
  { id: "BONK", market: "crypto", symbol: "BONK", name: "Bonk", price: 0.000031, change24h: -4.3, volume24h: 3.9e8, marketCap: 2.1e9, liquidity: 5.6e7 },
];

function applyFilters(rows: AssetRow[], params: URLSearchParams) {
  const q = (params.get("q") || "").toLowerCase();
  const minMcap = Number(params.get("minMcap") || "0");
  const minVol = Number(params.get("minVol") || "0");
  const minLiq = Number(params.get("minLiq") || "0");

  return rows.filter(r => {
    const matchesQ = !q || r.symbol.toLowerCase().includes(q) || r.name.toLowerCase().includes(q);
    const matchesMcap = r.marketCap >= minMcap;
    const matchesVol = r.volume24h >= minVol;
    const matchesLiq = (r.liquidity ?? 0) >= minLiq;
    return matchesQ && matchesMcap && matchesVol && matchesLiq;
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const market = (url.searchParams.get("market") as MarketType) || "stocks";

  const base = market === "crypto" ? CRYPTO : STOCKS;
  const filtered = applyFilters(base, url.searchParams);

  return NextResponse.json({ rows: filtered });
}
