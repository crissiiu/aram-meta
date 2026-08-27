# Phase 6: Desktop Companion

## Mục Tiêu

Nghiên cứu và prototype phần mềm companion giúp người chơi tra cứu guide/build nhanh hơn, nhưng vẫn an toàn theo chính sách Riot.

## Phạm Vi

Bao gồm:

- Decision document cho Tauri vs Electron.
- Prototype đọc dữ liệu từ backend API.
- Tra cứu champion/build.
- Tra cứu match/player nếu đã có backend.

Không bao gồm:

- Tự động chọn tướng.
- Tự động mua đồ.
- Tự động gửi input.
- Inject hoặc can thiệp League client.

## Định Hướng Kỹ Thuật

- Ưu tiên Tauri nếu cần app nhẹ, ít tài nguyên.
- Chỉ chọn Electron nếu cần hệ sinh thái browser/desktop API nặng hơn.
- App desktop không chứa Riot API key.
- App desktop gọi backend của dự án, tương tự frontend web.

## Checklist

- [ ] Review chính sách Riot mới nhất trước khi prototype public.
- [ ] Viết decision document Tauri vs Electron.
- [ ] Xác định boundary: chỉ hiển thị thông tin, không tự động hóa.
- [ ] Prototype champion search.
- [ ] Prototype current build guide.
- [ ] Prototype match/player lookup nếu Phase 4 đã sẵn sàng.

## Tiêu Chí Hoàn Thành

- Có quyết định rõ nên dùng Tauri hay Electron.
- Prototype không chứa Riot API key.
- Prototype không vi phạm nguyên tắc không tự động hóa gameplay.
