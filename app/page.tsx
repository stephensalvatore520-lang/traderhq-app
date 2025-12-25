"use client";

import { useEffect, useMemo, useState } from "react";
import MarketSelector from "@/components/MarketSelector";
import FilterBar from "@/components/FilterBar";
import ScreenerTable from "@/components/ScreenerTable";
import type { AssetRow, MarketType } from "@/lib/types";

export default function Home() {
  const [market, setMarket] = useState<MarketType>("stocks");

  const [q, setQ] = useState("");
  const [minMcap, setMinMcap] = useState("");
  const [minVol, setMinVol] = useState("");
  const [minLiq, setMinLiq] = useState("");

  const [rows, setRows] = useState<AssetRow[]>([]);
  const showLiquidity = market === "crypto";

  const query = useMemo(() => {
    const p = new URLSearchParams();
    p.set("market", market);
    if (q) p.set("q", q);
    if (minMcap) p.set("minMcap", minMcap);
    if (minVol) p.set("minVol", minVol);
    if (showLiquidity && minLiq) p.set("minLiq", minLiq);
    return p.toString();
  }, [market, q, minMcap, minVol, minLiq, showLiquidity]);

  useEffect(() => {
    fetch(`/api/assets?${query}`)
      .then(r => r.json())
      .then(d => setRows(d.rows))
      .catch(() => setRows([]));
  }, [query]);

 return (
  <main className="container">
    <div className="header">
      <div>
        <div className="h1">TraderHQ Scanner</div>
        <div className="sub">Stocks + Crypto screening in one dashboard (Phase 1 UI polish)</div>
      </div>
      <MarketSelector market={market} onChange={setMarket} />
    </div>

    <div className="card">
      <FilterBar
        q={q} setQ={setQ}
        minMcap={minMcap} setMinMcap={setMinMcap}
        minVol={minVol} setMinVol={setMinVol}
        minLiq={minLiq} setMinLiq={setMinLiq}
        showLiquidity={showLiquidity}
      />

      <ScreenerTable rows={rows} showLiquidity={showLiquidity} />
    </div>
  </main>
);
}
