import { Controller, Get, Param } from "@nestjs/common";
import { ChampionsService } from "./champions.service";
import type {
  ChampionDemoDetailResponseDto,
  ChampionDemoListResponseDto,
} from "./dto/champion-demo-response.dto";

@Controller("champions/demo")
export class ChampionsController {
  constructor(private readonly championsService: ChampionsService) {}

  @Get()
  getDemoChampions(): ChampionDemoListResponseDto {
    return this.championsService.getDemoChampions();
  }

  @Get(":slug")
  getDemoChampionBySlug(@Param("slug") slug: string): ChampionDemoDetailResponseDto {
    return this.championsService.getDemoChampionBySlug(slug);
  }
}
