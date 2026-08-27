# Tổng Quan Kiến Trúc

## Mục Tiêu Kiến Trúc

Kiến trúc phải hỗ trợ website guide ARAM trước, sau đó mở rộng sang pipeline dữ liệu, player lookup, community và desktop companion mà không phải viết lại nền tảng.

## Thành Phần Chính

- `apps/web`: frontend React + TypeScript.
- `apps/api`: backend NestJS + TypeScript.
- `packages/shared`: DTO, constants và type dùng chung.
- MySQL: lưu dữ liệu quan hệ và thống kê đã tính.
- Redis: cache, queue state và rate-limit coordination.
- Queue workers: crawl/sync Riot data và aggregate thống kê.

## Frontend

Frontend bắt buộc dùng React với TypeScript.

Framework đề xuất:

- Next.js nếu ưu tiên SEO cho guide, tier list và trang tướng.
- Vite React nếu ưu tiên prototype đơn giản, ít cấu hình.

Frontend không gọi Riot API trực tiếp. Mọi dữ liệu public lấy từ backend API của dự án.

## Backend

Backend dùng NestJS để tách module rõ:

- Health.
- Meta.
- Champions.
- Players.
- Riot API client.
- Jobs.
- Admin/editorial sau MVP.

Backend chịu trách nhiệm:

- Giữ Riot API key.
- Chuẩn hóa dữ liệu.
- Cache response.
- Tính thống kê.
- Che lỗi nhạy cảm trước khi trả về frontend.

## Database

MySQL lưu các nhóm dữ liệu:

- Static data: champions, items, patches.
- Raw match data: matches, participants, participant builds.
- Aggregated data: computed champion stats, computed build stats.
- Editorial data: ghi chú guide tiếng Việt.

## Cache Và Queue

Redis dùng cho:

- Cache response Riot API.
- Cache response public API có tần suất đọc cao.
- Queue jobs crawl/sync/aggregate.
- Theo dõi pause/retry khi gặp rate limit.

## API Public

MVP dùng REST:

- `GET /health`
- `GET /meta/tier-list?patch=&region=&rank=`
- `GET /champions/:slug`
- `GET /champions/:slug/builds?patch=&region=`

Phase sau:

- `GET /players/search?gameName=&tagLine=&region=`
- `GET /players/:puuid/matches`
- `GET /players/:puuid/live-game`
