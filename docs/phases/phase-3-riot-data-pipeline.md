# Phase 3: Pipeline Dữ Liệu Riot

## Mục Tiêu

Tạo pipeline lấy, chuẩn hóa, lưu và aggregate dữ liệu Riot để website có thống kê ARAM theo patch.

## Phạm Vi

Bao gồm:

- Riot API client server-side.
- Cache response.
- Queue jobs.
- Match ingestion.
- Stat aggregation.
- Rate-limit handling.

Không bao gồm:

- Public desktop client.
- Tính năng tự động trong League client.
- Dữ liệu bên thứ ba chưa xác nhận quyền sử dụng.

## Luồng Dữ Liệu

1. Sync static data theo patch.
2. Discovery match IDs phù hợp.
3. Fetch match detail.
4. Chuẩn hóa participants và build.
5. Aggregate stats theo patch, champion, item/build và region.
6. Public API đọc aggregate stats đã cache.

## Checklist

- [ ] Implement Riot API client ở backend.
- [ ] Redact API key khỏi log.
- [ ] Xử lý `429` và `Retry-After`.
- [ ] Thiết kế queue retry/backoff.
- [ ] Lưu raw match data đủ để recompute.
- [ ] Aggregate win rate, pick rate, sample size.
- [ ] Ghi data freshness metadata.
- [ ] Mock Riot responses trong integration tests.

## Tiêu Chí Hoàn Thành

- Pipeline chạy được mà không expose API key.
- Gặp rate limit thì pause/retry đúng thay vì crash.
- Public meta API trả dữ liệu aggregate theo patch.
