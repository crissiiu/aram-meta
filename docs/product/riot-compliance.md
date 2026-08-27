# Tuân Thủ Riot

## Nguyên Tắc Bắt Buộc

- Không đặt Riot API key trong frontend, bundle trình duyệt hoặc phần mềm client.
- Mọi request tới Riot API đi qua backend.
- Tôn trọng rate limit và header `Retry-After`.
- Không tự động hóa gameplay, input, chọn tướng, mua đồ hoặc tương tác với League client.
- Trước khi public rộng, chuẩn bị đăng ký sản phẩm trên Riot Developer Portal.

## Hiển Thị Pháp Lý

Website cần có footer hoặc trang legal hiển thị thông tin rằng sản phẩm không được Riot Games bảo trợ, xác nhận hoặc quản lý. Nội dung chính xác nên được kiểm tra lại trực tiếp từ tài liệu Riot trước khi launch.

## API Key

Quy tắc xử lý:

- Chỉ lưu trong biến môi trường backend: `RIOT_API_KEY`.
- Không log header request chứa key.
- Không trả lỗi raw từ Riot API về frontend nếu lỗi có thể chứa thông tin nhạy cảm.
- Có cơ chế rotate key khi bị lộ hoặc hết hạn.

## Rate Limit

Backend cần:

- Nhận biết response `429`.
- Đọc `Retry-After`.
- Tạm dừng queue theo endpoint hoặc region bị ảnh hưởng.
- Retry bằng backoff.
- Cache response public để giảm số request.

## Desktop Companion

Nếu phát triển app desktop:

- Chỉ hiển thị thông tin hỗ trợ.
- Không inject vào client.
- Không tự động bấm, chọn, mua, cast hoặc gửi input.
- Cần review lại chính sách Riot trước khi phân phối.
