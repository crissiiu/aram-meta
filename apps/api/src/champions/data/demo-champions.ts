import type { Champion } from "../models/champion.model";

export const DEMO_PATCH = "16.17";
export const DEMO_REGION = "VN";
export const DEMO_LAST_UPDATED_AT = "2026-08-31T00:00:00.000Z";

export const demoChampions: Champion[] = [
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
    recommendedBuild: [
      { slot: "starter", name: "Kiếm Doran" },
      { slot: "core", name: "Cuồng Đao Guinsoo" },
      { slot: "core", name: "Móc Diệt Thủy Quái" },
      { slot: "situational", name: "Vô Cực Kiếm" },
      { slot: "boots", name: "Giày Cuồng Nộ" },
    ],
    notes: [
      "Giữ vị trí sau tuyến trước và ưu tiên mục tiêu thấp máu.",
      "Đổi sang item xuyên giáp khi đội địch có nhiều chống chịu.",
    ],
  },
  {
    slug: "lux",
    name: "Lux",
    role: "Pháp sư cấu rỉa",
    tier: "S",
    stats: {
      winRate: 53.1,
      pickRate: 11.3,
      sampleSize: 17000,
    },
    recommendedBuild: [
      { slot: "starter", name: "Nhẫn Doran" },
      { slot: "core", name: "Bão Tố Luden" },
      { slot: "core", name: "Kính Nhắm Ma Pháp" },
      { slot: "situational", name: "Mũ Phù Thủy Rabadon" },
      { slot: "boots", name: "Giày Pháp Sư" },
    ],
    notes: [
      "Ưu tiên cấu rỉa trước giao tranh để mở lợi thế máu.",
      "Giữ khống chế cho mục tiêu lao vào carry của đội.",
    ],
  },
  {
    slug: "varus",
    name: "Varus",
    role: "Poke / DPS",
    tier: "A",
    stats: {
      winRate: 52.6,
      pickRate: 10,
      sampleSize: 15000,
    },
    recommendedBuild: [
      { slot: "starter", name: "Kiếm Dài" },
      { slot: "core", name: "Kiếm Manamune" },
      { slot: "core", name: "Thần Kiếm Muramana" },
      { slot: "situational", name: "Thương Phục Hận Serylda" },
      { slot: "boots", name: "Giày Khai Sáng Ionia" },
    ],
    notes: [
      "Dùng poke để ép đội địch mất máu trước khi all-in.",
      "Chuyển sang DPS nếu đội thiếu sát thương theo thời gian.",
    ],
  },
];
