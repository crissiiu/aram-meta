import { Test, type TestingModule } from "@nestjs/testing";
import { ChampionsController } from "./champions.controller";
import { ChampionsService } from "./champions.service";
import {
  CHAMPIONS_REPOSITORY,
  DemoChampionsRepository,
} from "./repositories/champions.repository";

describe("ChampionsController", () => {
  let controller: ChampionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChampionsController],
      providers: [
        ChampionsService,
        {
          provide: CHAMPIONS_REPOSITORY,
          useClass: DemoChampionsRepository,
        },
      ],
    }).compile();

    controller = module.get<ChampionsController>(ChampionsController);
  });

  it("returns demo champions", () => {
    const response = controller.getDemoChampions();

    expect(response.data).toHaveLength(3);
    expect(response.data[0]).toMatchObject({
      slug: "jinx",
      name: "Jinx",
      tier: "S",
    });
    expect(response.meta).toMatchObject({
      patch: "16.17",
      region: "VN",
      source: "demo",
    });
  });
});
