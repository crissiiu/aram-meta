# Định Hướng Thiết Kế

## Tính Cách Giao Diện

ARAM Meta nên có cảm giác:

- Nhanh.
- Sắc nét.
- Có chất game.
- Đọc số liệu tốt.
- Dễ dùng trên mobile.
- Đủ tin cậy như một công cụ meta, không quá màu mè.

Không nên có cảm giác:

- Fantasy rối mắt.
- Landing page quảng cáo.
- Dashboard doanh nghiệp khô cứng.
- UI chỉ đẹp nhưng khó scan khi đang chơi.

## Người Dùng Và Ngữ Cảnh

Người dùng có thể mở site trong các tình huống:

- Trước khi vào trận để xem tướng đang mạnh.
- Khi đang chọn tướng trong ARAM.
- Khi vừa roll ra tướng và cần build nhanh.
- Sau trận để xem mình lên đồ có lệch meta không.
- Khi đọc guide sâu hơn lúc không chơi.

Do đó giao diện cần:

- Tìm kiếm tướng luôn nổi bật.
- Không bắt người dùng đọc dài mới thấy build.
- Số liệu quan trọng nằm trên màn hình đầu.
- Mobile layout không bị chật icon item/tướng.

## Hướng Thị Giác

Phong cách đề xuất: **dark tactical game guide**.

Đặc điểm:

- Nền tối trung tính để icon tướng/item nổi bật.
- Accent vàng nhẹ cho meta/highlight.
- Cyan dùng cho thông tin/interactive focus.
- Green/red dùng cho trend tăng/giảm, win/loss.
- Border mảnh, ít shadow, nhiều khoảng thở vừa đủ.
- Component bán kính nhỏ, tối đa 8px.

## Ngôn Ngữ UI

Copy nên ngắn, rõ, ưu tiên hành động:

- "Tìm tướng"
- "Xem build"
- "Patch hiện tại"
- "Đang cập nhật dữ liệu"
- "Không đủ dữ liệu"
- "Build phổ biến"
- "Build thắng cao"
- "Tình huống"

Không nên dùng câu giải thích dài trong UI chính. Phần giải thích dài đặt trong guide hoặc tooltip.

## Ưu Tiên Thiết Kế Theo Màn Hình

1. Tier List: phải scan tốt nhất.
2. Champion Detail: phải trả lời ngay câu hỏi lên đồ.
3. Home: phải đưa người dùng vào tìm kiếm/tier list nhanh.
4. Player Search: phase sau, cần rõ trạng thái lỗi/loading.
5. Community: đơn giản, không lấn át core guide.

## Hình Ảnh Và Asset

- Dùng icon/chân dung tướng và icon item chính thức nếu được phép theo chính sách Riot.
- Luôn có fallback khi asset thiếu hoặc chưa load.
- Icon item/tướng phải có kích thước ổn định để layout không nhảy.
- Không dùng ảnh nền tối, mờ, crop mạnh ở các trang cần đọc số liệu.
