# Phase 2: MVP Guide Meta

## Mục Tiêu

Xây trải nghiệm cốt lõi: tier list ARAM và trang chi tiết tướng có build khuyến nghị, số liệu cơ bản và giải thích tiếng Việt.

## Phạm Vi

Bao gồm:

- Tier list theo patch.
- Trang chi tiết tướng.
- Core items và situational items.
- Win rate, pick rate, sample size.
- Ghi chú guide thủ công.

Không bao gồm:

- Lịch sử đấu người chơi.
- Chat cộng đồng.
- Desktop companion.

## API Dự Kiến

- `GET /meta/tier-list?patch=&region=&rank=`
- `GET /champions/:slug`
- `GET /champions/:slug/builds?patch=&region=`

## Dữ Liệu Ban Đầu

Trước khi pipeline Riot hoàn chỉnh, MVP có thể dùng dữ liệu seed/manual:

- champion metadata.
- item metadata.
- build khuyến nghị.
- ghi chú guide.
- sample stats để kiểm tra UI.

## Checklist

- [ ] Xây tier list với filter patch, region và rank bracket nếu có.
- [ ] Xây champion detail page.
- [ ] Hiển thị core items, situational items, boots và phép bổ trợ.
- [ ] Hiển thị win rate, pick rate, sample size.
- [ ] Hiển thị data freshness/stale state.
- [ ] Thêm nội dung giải thích tiếng Việt.
- [ ] Kiểm thử responsive mobile.

## Tiêu Chí Hoàn Thành

- Người dùng tìm được build ARAM của một tướng trong tối đa ba click.
- Trang tướng có đủ build, số liệu và ghi chú giải thích.
- UI đọc tốt trên mobile.
