export type ChampionTier = "S+" | "S" | "A" | "B";

export type ChampionBuildItem = {
  slot: "starter" | "core" | "situational" | "boots";
  name: string;
};

export type ChampionStats = {
  winRate: number;
  pickRate: number;
  sampleSize: number;
};

export type Champion = {
  slug: string;
  name: string;
  role: string;
  tier: ChampionTier;
  stats: ChampionStats;
  recommendedBuild: ChampionBuildItem[];
  notes: string[];
};
