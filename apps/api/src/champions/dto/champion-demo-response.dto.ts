import type { Champion, ChampionBuildItem, ChampionTier } from "../models/champion.model";

export type ChampionDemoMetaDto = {
  patch: string;
  region: string;
  source: "demo";
  lastUpdatedAt: string;
  sampleSize: number;
};

export type ChampionDemoListItemDto = {
  slug: string;
  name: string;
  role: string;
  tier: ChampionTier;
  winRate: number;
  pickRate: number;
  sampleSize: number;
};

export type ChampionDemoDetailDto = ChampionDemoListItemDto & {
  recommendedBuild: ChampionBuildItem[];
  notes: string[];
};

export type ChampionDemoListResponseDto = {
  data: ChampionDemoListItemDto[];
  meta: ChampionDemoMetaDto;
};

export type ChampionDemoDetailResponseDto = {
  data: ChampionDemoDetailDto;
  meta: ChampionDemoMetaDto;
};

export function toChampionDemoListItemDto(champion: Champion): ChampionDemoListItemDto {
  return {
    slug: champion.slug,
    name: champion.name,
    role: champion.role,
    tier: champion.tier,
    winRate: champion.stats.winRate,
    pickRate: champion.stats.pickRate,
    sampleSize: champion.stats.sampleSize,
  };
}

export function toChampionDemoDetailDto(champion: Champion): ChampionDemoDetailDto {
  return {
    ...toChampionDemoListItemDto(champion),
    recommendedBuild: champion.recommendedBuild,
    notes: champion.notes,
  };
}
