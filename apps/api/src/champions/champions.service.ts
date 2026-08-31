import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
  DEMO_LAST_UPDATED_AT,
  DEMO_PATCH,
  DEMO_REGION,
} from "./data/demo-champions";
import {
  toChampionDemoDetailDto,
  toChampionDemoListItemDto,
  type ChampionDemoDetailResponseDto,
  type ChampionDemoListResponseDto,
  type ChampionDemoMetaDto,
} from "./dto/champion-demo-response.dto";
import {
  CHAMPIONS_REPOSITORY,
  type ChampionsRepository,
} from "./repositories/champions.repository";

@Injectable()
export class ChampionsService {
  constructor(
    @Inject(CHAMPIONS_REPOSITORY)
    private readonly championsRepository: ChampionsRepository,
  ) {}

  getDemoChampions(): ChampionDemoListResponseDto {
    const champions = this.championsRepository.findAll();

    return {
      data: champions.map(toChampionDemoListItemDto),
      meta: this.getDemoMeta(champions.reduce((total, champion) => total + champion.stats.sampleSize, 0)),
    };
  }

  getDemoChampionBySlug(slug: string): ChampionDemoDetailResponseDto {
    const champion = this.championsRepository.findBySlug(slug.toLowerCase());

    if (!champion) {
      throw new NotFoundException({
        code: "DEMO_CHAMPION_NOT_FOUND",
        message: "Không tìm thấy tướng demo.",
      });
    }

    return {
      data: toChampionDemoDetailDto(champion),
      meta: this.getDemoMeta(champion.stats.sampleSize),
    };
  }

  private getDemoMeta(sampleSize: number): ChampionDemoMetaDto {
    return {
      patch: DEMO_PATCH,
      region: DEMO_REGION,
      source: "demo",
      lastUpdatedAt: DEMO_LAST_UPDATED_AT,
      sampleSize,
    };
  }
}
