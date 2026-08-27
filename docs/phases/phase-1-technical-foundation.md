# Phase 1: Nền Tảng Kỹ Thuật

## Mục Tiêu

Scaffold nền tảng monorepo để frontend React, backend NestJS, package dùng chung, MySQL và Redis có thể chạy local.

## Phạm Vi

Bao gồm:

- Frontend app shell.
- Backend app shell.
- Shared TypeScript package.
- Docker Compose.
- `.env.example`.
- Health check.

Không bao gồm:

- UI tier list đầy đủ.
- Riot API integration thật.
- Pipeline ingest match.

## Quyết Định Kỹ Thuật

- Frontend bắt buộc dùng React + TypeScript.
- Ưu tiên Next.js nếu muốn SEO cho guide/trang tướng.
- Có thể dùng Vite React nếu cần prototype thật nhanh.
- Backend dùng NestJS + TypeScript.
- MySQL là database chính.
- Redis dùng cho cache và queue.

## Đầu Ra

- `apps/web`
- `apps/api`
- `packages/shared`
- `docker-compose.yml`
- `.env.example`
- `docs/architecture/overview.md`

## Checklist

- [ ] Scaffold frontend React + TypeScript.
- [ ] Scaffold backend NestJS + TypeScript.
- [ ] Tạo health endpoint `GET /health`.
- [ ] Tạo package shared cho DTO/constants.
- [ ] Tạo Docker Compose cho MySQL và Redis.
- [ ] Tạo `.env.example` với `RIOT_API_KEY`, `DATABASE_URL`, `REDIS_URL`, `PUBLIC_WEB_URL`, `API_PORT`.
- [ ] Chạy smoke test local.

## Tiêu Chí Hoàn Thành

- Dev mới có thể clone repo, cài dependencies và chạy app local.
- Frontend gọi được health endpoint backend.
- Không có Riot API key hard-coded trong repo.
