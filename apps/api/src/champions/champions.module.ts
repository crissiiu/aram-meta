import { Module } from "@nestjs/common";
import { ChampionsController } from "./champions.controller";
import { ChampionsService } from "./champions.service";
import {
  CHAMPIONS_REPOSITORY,
  DemoChampionsRepository,
} from "./repositories/champions.repository";

@Module({
  controllers: [ChampionsController],
  providers: [
    ChampionsService,
    {
      provide: CHAMPIONS_REPOSITORY,
      useClass: DemoChampionsRepository,
    },
  ],
})
export class ChampionsModule {}
