"use client";
import type { AssetRow } from "@/lib/types";

function fmtMoney(n: number) {
  if (n >= 1e12) return `$${(n/1e12).toFixed(2)}T`;
  if (n >= 1e9)  return `$${(n/1e9).toFixed(2)}B`;
  if (n >= 1e6)  return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3)  return `$${(n/1e3).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
}
function fmtPrice(n: number) {
  if (n >= 1000) return n.toFixed(2);
  if (n >= 1) return n.toFixed(2);
  return n.toPrecision(6);
}

export default function ScreenerTable({ rows, showLiquidity }: { rows: AssetRow[]; showLiquidity: boolean }) {
  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th className="right">Price</th>
            <th className="right">24h %</th>
            <th className="right">Volume 24h</th>
            <th className="right">Market Cap</th>
            {showLiquidity && <th className="right">Liquidity</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const isPos = r.change24h >= 0;
            return (
              <tr key={r.id}>
                <td className="mono">
                  <span className="badge">{r.symbol}</span>
                </td>
                <td>{r.name}</td>
                <td className="right mono">{fmtPrice(r.price)}</td>
                <td className={`right mono ${isPos ? "pos" : "neg"}`}>
                  {isPos ? "+" : ""}{r.change24h.toFixed(2)}%
                </td>
                <td className="right mono">{fmtMoney(r.volume24h)}</td>
                <td className="right mono">{fmtMoney(r.marketCap)}</td>
                {showLiquidity && <td className="right mono">{fmtMoney(r.liquidity ?? 0)}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
