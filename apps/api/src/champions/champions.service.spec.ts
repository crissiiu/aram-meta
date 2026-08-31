import { NotFoundException } from "@nestjs/common";
import { ChampionsService } from "./champions.service";
import {
  CHAMPIONS_REPOSITORY,
  type ChampionsRepository,
} from "./repositories/champions.repository";

const championsRepository: ChampionsRepository = {
  findAll: () => [
    {
      slug: "jinx",
      name: "Jinx",
      role: "Xạ thủ carry",
      tier: "S",
      stats: {
        winRate: 54.2,
        pickRate: 12.1,
        sampleSize: 18000,
      },
      recommendedBuild: [{ slot: "core", name: "Cuồng Đao Guinsoo" }],
      notes: ["Giữ vị trí sau tuyến trước."],
    },
  ],
  findBySlug: (slug) =>
    slug === "jinx"
      ? {
          slug: "jinx",
          name: "Jinx",
          role: "Xạ thủ carry",
          tier: "S",
          stats: {
            winRate: 54.2,
            pickRate: 12.1,
            sampleSize: 18000,
          },
          recommendedBuild: [{ slot: "core", name: "Cuồng Đao Guinsoo" }],
          notes: ["Giữ vị trí sau tuyến trước."],
        }
      : undefined,
};

describe("ChampionsService", () => {
  let service: ChampionsService;

  beforeEach(() => {
    service = new ChampionsService(championsRepository);
  });

  it("returns demo champion list with customer-facing metadata", () => {
    expect(service.getDemoChampions()).toEqual({
      data: [
        {
          slug: "jinx",
          name: "Jinx",
          role: "Xạ thủ carry",
          tier: "S",
          winRate: 54.2,
          pickRate: 12.1,
          sampleSize: 18000,
        },
      ],
      meta: {
        patch: "16.17",
        region: "VN",
        source: "demo",
        lastUpdatedAt: "2026-08-31T00:00:00.000Z",
        sampleSize: 18000,
      },
    });
  });

  it("returns one demo champion by slug", () => {
    expect(service.getDemoChampionBySlug("JINX").data).toMatchObject({
      slug: "jinx",
      name: "Jinx",
      recommendedBuild: [{ slot: "core", name: "Cuồng Đao Guinsoo" }],
    });
  });

  it("throws a safe not found error for unknown demo champion", () => {
    expect(() => service.getDemoChampionBySlug("unknown")).toThrow(NotFoundException);
  });
});
