import type { AiResult, StrategyKey } from "./types";

export type StrategyCard = {
  key: StrategyKey;
  label: string;
  spots: number;
  recommended: boolean;
};

export type StrategyImpact = {
  key: StrategyKey;
  predictedPeakOccupancyPct: number;
  guestZone: { available: number; take: number; level: string; zone: string };
  employeeZone: { available: number; take: number; level: string; zone: string };
  signals: Array<{ icon: "rain" | "holidays"; label: string; highlight: string; suffix: string }>;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(n, max));

export function getRecommendedStrategy(ai: AiResult): StrategyKey {
  if (ai.risk === "high") return "safe";
  return "balanced";
}

export function buildStrategies(ai: AiResult) {
  const base = ai.recommendedSpots;

  const safe = Math.max(base + 2, Math.round(base * 1.1));
  const balanced = base;
  const aggressive = Math.max(1, Math.min(base - 2, Math.round(base * 0.9)));

  const recommendedKey = getRecommendedStrategy(ai);

  const cards: StrategyCard[] = [
    { key: "safe", label: "Safe", spots: safe, recommended: recommendedKey === "safe" },
    { key: "balanced", label: "Balanced", spots: balanced, recommended: recommendedKey === "balanced" },
    { key: "aggressive", label: "Aggressive", spots: aggressive, recommended: recommendedKey === "aggressive" },
  ];

  const guestAvailable = 14;
  const employeeAvailable = 52;

  const impactByKey = (k: StrategyKey): StrategyImpact => {
    const spots = cards.find((c) => c.key === k)?.spots ?? base;

    const takeGuest = clamp(Math.min(spots, guestAvailable), 0, guestAvailable);
    const remaining = spots - takeGuest;
    const takeEmployee = clamp(remaining, 0, employeeAvailable);

    const delta = spots - base;
    const predicted = clamp(ai.predictedPeakOccupancyPct + Math.round(delta * 0.6), 0, 99);

    return {
      key: k,
      predictedPeakOccupancyPct: predicted,
      guestZone: { available: guestAvailable, take: takeGuest, level: "-2", zone: "B" },
      employeeZone: { available: employeeAvailable, take: takeEmployee, level: "-1", zone: "A" },
      signals: [
        { icon: "rain", label: "Rain", highlight: "+15%", suffix: "car usage" },
        { icon: "holidays", label: "School Holidays", highlight: "-20%", suffix: "employees" },
      ],
    };
  };

  const impacts: Record<StrategyKey, StrategyImpact> = {
    safe: impactByKey("safe"),
    balanced: impactByKey("balanced"),
    aggressive: impactByKey("aggressive"),
  };

  return { cards, impacts, recommendedKey };
}
