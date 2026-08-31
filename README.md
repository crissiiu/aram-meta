# ARAM Meta

Website guide ARAM cho người chơi Liên Minh Huyền Thoại, tập trung vào meta hiện tại, cách lên đồ, số liệu tướng/trang bị, và lộ trình mở rộng sang player stats, cộng đồng Discord, cùng desktop companion.

## Định Hướng Công Nghệ

- Frontend: React + TypeScript + Tailwind CSS.
- Backend: NestJS + TypeScript.
- Database: MySQL.
- Cache/Queue: Redis.

## Frontend Foundation

Frontend là React + TypeScript app trong `apps/web`. UI dùng Tailwind là chính và phải kế thừa từ:

- Architecture model: `docs/architecture/system-model.md`
- Design direction: `docs/design/design-direction.md`
- Design tokens: `docs/design/design-system.md`
- Layout rules: `docs/design/page-layouts.md`

Local commands:

```bash
npm install
npm run dev:web
npm run test:web
npm run build:web
```

Quy tắc:

- Không gọi Riot API từ browser code.
- Không hard-code Riot secrets trong frontend code.
- Không đặt raw color hex trong component; màu mới phải đi qua Tailwind `@theme` trong `apps/web/src/styles.css`.
- Copy UI tiếng Việt phải có dấu.
- Customer workflow phải nhanh: search và tier preview luôn là first-screen priority.

## Tài Liệu

- [Tổng quan docs](docs/README.md)
- [Roadmap tổng](docs/superpowers/plans/2026-08-27-aram-meta-roadmap.md)
- [Tầm nhìn sản phẩm](docs/product/vision.md)
- [Sitemap](docs/product/sitemap.md)
- [Tuân thủ Riot](docs/product/riot-compliance.md)
- [Tổng quan kiến trúc](docs/architecture/overview.md)
- [Mô hình hệ thống](docs/architecture/system-model.md)
- [Design ARAM Meta](docs/design/README.md)
- [Quy ước branch và commit](docs/contributing/git-workflow.md)
