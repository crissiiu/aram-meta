# Champions Module

Module này là demo feature để minh họa cấu trúc backend NestJS của ARAM Meta.

## Cấu Trúc

- `champions.module.ts`: đăng ký controller, service, repository provider.
- `champions.controller.ts`: HTTP boundary cho `GET /champions/demo`.
- `champions.service.ts`: application logic, mapping response, safe not-found error.
- `dto/`: response contracts trả về cho frontend.
- `models/`: domain model nội bộ của backend.
- `repositories/`: data access interface và demo implementation.
- `data/`: dữ liệu giả thay cho Riot/MySQL trong Phase 1.

## Nguyên Tắc Kế Thừa

- Khi có `packages/shared`, DTO public nên được chuyển hoặc mirror từ package dùng chung.
- Khi có MySQL, thay `DemoChampionsRepository` bằng repository thật nhưng giữ `ChampionsRepository` interface.
- Khi có Riot API integration, dữ liệu Riot đi qua backend adapter/cache/queue trước khi tới module này.
- Backend chỉ trả semantic values như `tier`, `winRate`, `sampleSize`; UI tự áp màu theo `docs/design/design-system.md`.
