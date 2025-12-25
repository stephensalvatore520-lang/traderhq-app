"use client";

export default function FilterBar({
  q, setQ,
  minMcap, setMinMcap,
  minVol, setMinVol,
  minLiq, setMinLiq,
  showLiquidity,
}: {
  q: string; setQ: (v: string) => void;
  minMcap: string; setMinMcap: (v: string) => void;
  minVol: string; setMinVol: (v: string) => void;
  minLiq: string; setMinLiq: (v: string) => void;
  showLiquidity: boolean;
}) {
  return (
    <div className="row" style={{ marginTop: 12 }}>
      <input className="input" placeholder="Search symbol or name" value={q} onChange={(e) => setQ(e.target.value)} />
      <input className="input" placeholder="Min Market Cap" value={minMcap} onChange={(e) => setMinMcap(e.target.value)} />
      <input className="input" placeholder="Min Volume (24h)" value={minVol} onChange={(e) => setMinVol(e.target.value)} />
      {showLiquidity && (
        <input className="input" placeholder="Min Liquidity" value={minLiq} onChange={(e) => setMinLiq(e.target.value)} />
      )}
    </div>
  );
}
