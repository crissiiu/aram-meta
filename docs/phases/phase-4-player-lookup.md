# Phase 4: Tra Cứu Người Chơi Và Lịch Sử Đấu

## Mục Tiêu

Cho phép người dùng tìm Riot ID, xem lịch sử ARAM gần đây và so sánh build đã dùng với meta hiện tại.

## Phạm Vi

Bao gồm:

- Tìm kiếm người chơi.
- Trang profile cơ bản.
- Lịch sử đấu ARAM.
- Tóm tắt trận.
- So sánh build với meta.

Không bao gồm:

- Social profile đầy đủ.
- Chat realtime.
- Overlay desktop.

## API Dự Kiến

- `GET /players/search?gameName=&tagLine=&region=`
- `GET /players/:puuid/matches`
- `GET /players/:puuid/live-game`

`/live-game` là optional và chỉ triển khai nếu Spectator API ổn định cho khu vực mục tiêu.

## Checklist

- [ ] Tìm người chơi bằng Riot ID.
- [ ] Cache kết quả lookup theo hướng tôn trọng quyền riêng tư.
- [ ] Hiển thị danh sách trận ARAM gần đây.
- [ ] Hiển thị champion, result, KDA, damage, items, game duration và date.
- [ ] So sánh build trong trận với build meta hiện tại.
- [ ] Xử lý missing player, API outage và empty history.

## Tiêu Chí Hoàn Thành

- Người dùng tìm được profile bằng Riot ID.
- Lịch sử ARAM hiển thị ổn định và không làm lộ dữ liệu nhạy cảm không cần thiết.
- Khi Riot API lỗi, UI có thông báo dễ hiểu.
