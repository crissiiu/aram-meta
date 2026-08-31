import { Injectable } from "@nestjs/common";
import { demoChampions } from "../data/demo-champions";
import type { Champion } from "../models/champion.model";

export const CHAMPIONS_REPOSITORY = Symbol("CHAMPIONS_REPOSITORY");

export interface ChampionsRepository {
  findAll(): Champion[];
  findBySlug(slug: string): Champion | undefined;
}

@Injectable()
export class DemoChampionsRepository implements ChampionsRepository {
  findAll(): Champion[] {
    return demoChampions;
  }

  findBySlug(slug: string): Champion | undefined {
    return demoChampions.find((champion) => champion.slug === slug);
  }
}
