"use client";
import type { MarketType } from "@/lib/types";

export default function MarketSelector({
  market,
  onChange,
}: {
  market: MarketType;
  onChange: (m: MarketType) => void;
}) {
  return (
    <div className="segment">
      <button
        className={`segBtn ${market === "stocks" ? "segBtnActive" : ""}`}
        onClick={() => onChange("stocks")}
      >
        Stocks
      </button>
      <button
        className={`segBtn ${market === "crypto" ? "segBtnActive" : ""}`}
        onClick={() => onChange("crypto")}
      >
        Crypto
      </button>
    </div>
  );
}
