# Design System

## Token Màu

Palette dùng nhiều nhóm màu để tránh giao diện một màu. Tông chủ đạo là nền tối trung tính, accent dùng tiết chế.

| Token | Hex | Dùng cho |
| --- | --- | --- |
| `color-bg` | `#0B0D10` | Nền app |
| `color-bg-elevated` | `#12161C` | Header, sidebar, panel nổi |
| `color-surface` | `#171C23` | Card item/tướng, table row |
| `color-surface-hover` | `#202733` | Hover row/card |
| `color-border` | `#2B3442` | Border chính |
| `color-border-strong` | `#3F4B5D` | Border focus/selected |
| `color-text` | `#F3F6FA` | Text chính |
| `color-text-muted` | `#A8B3C2` | Text phụ |
| `color-text-dim` | `#6F7B8A` | Label, metadata |
| `color-accent` | `#D9A441` | Meta highlight, tier mạnh |
| `color-accent-soft` | `#473718` | Background accent nhẹ |
| `color-info` | `#38BDF8` | Link, focus, filter active |
| `color-success` | `#22C55E` | Win, trend tăng, positive |
| `color-danger` | `#EF4444` | Loss, trend giảm, warning nặng |
| `color-warning` | `#F59E0B` | Stale data, cần chú ý |
| `color-purple` | `#A78BFA` | Rune/augment hoặc category phụ |

## Tier Colors

| Tier | Text | Background | Border |
| --- | --- | --- | --- |
| `S+` | `#FFF7D6` | `#5C3B00` | `#D9A441` |
| `S` | `#FDE68A` | `#3F2A05` | `#B8831F` |
| `A` | `#BAF7D0` | `#0F3D25` | `#22C55E` |
| `B` | `#BFE9FF` | `#10384D` | `#38BDF8` |
| `C` | `#D6D3FF` | `#2E2858` | `#A78BFA` |
| `D` | `#FFC4C4` | `#4A1717` | `#EF4444` |

## Typography

Font đề xuất:

- UI chính: `Inter`, `Arial`, `sans-serif`.
- Số liệu/stat: dùng cùng font nhưng `font-variant-numeric: tabular-nums`.

Scale:

| Token | Size | Line height | Dùng cho |
| --- | --- | --- | --- |
| `text-xs` | `12px` | `16px` | Label nhỏ, metadata |
| `text-sm` | `14px` | `20px` | Body phụ, table cell |
| `text-base` | `16px` | `24px` | Body chính |
| `text-lg` | `18px` | `28px` | Card title |
| `text-xl` | `22px` | `30px` | Section heading |
| `text-2xl` | `28px` | `36px` | Page title |
| `text-3xl` | `36px` | `44px` | Home title nếu cần |

Quy tắc:

- Không scale font bằng viewport width.
- Letter spacing mặc định là `0`.
- Số liệu quan trọng dùng tabular numbers để table không rung layout.

## Spacing

Dùng thang spacing theo 4px:

| Token | Value |
| --- | --- |
| `space-1` | `4px` |
| `space-2` | `8px` |
| `space-3` | `12px` |
| `space-4` | `16px` |
| `space-5` | `20px` |
| `space-6` | `24px` |
| `space-8` | `32px` |
| `space-10` | `40px` |
| `space-12` | `48px` |

## Radius Và Border

- `radius-sm`: `4px`
- `radius-md`: `6px`
- `radius-lg`: `8px`

Không dùng radius lớn hơn 8px cho component chính. UI cần cảm giác gọn, chính xác, giống công cụ.

## Layout

- App max width desktop: `1280px`.
- Page padding desktop: `24px`.
- Page padding tablet: `20px`.
- Page padding mobile: `16px`.
- Header height: `64px`.
- Filter bar height tối thiểu: `48px`.
- Champion/item icon size:
  - Mobile: `32px`
  - Desktop table: `40px`
  - Champion header: `72px`

## Component Cốt Lõi

### Button

Variants:

- `primary`: hành động chính như "Xem build".
- `secondary`: hành động phụ.
- `ghost`: icon action, tab phụ, menu.
- `danger`: destructive action trong admin sau này.

Quy tắc:

- Icon button dùng lucide icons khi có.
- Button text không được wrap xấu; nếu text dài, dùng label ngắn hơn.
- Height mặc định: `40px`; compact: `32px`.

### Search Input

Dùng cho tìm tướng và người chơi.

Yêu cầu:

- Icon search bên trái.
- Clear button khi có nội dung.
- Gợi ý autocomplete ổn định chiều cao.
- Trạng thái loading khi query player/champion.

### Filter Bar

Dùng segmented controls, select hoặc tabs:

- Patch.
- Region.
- Rank.
- Role/playstyle.

Trên mobile, filter có thể chuyển thành horizontal scroll hoặc bottom sheet.

### Tier Badge

Hiển thị tier bằng màu mạnh nhưng kích thước nhỏ.

Yêu cầu:

- Width ổn định.
- Text căn giữa.
- Có tooltip giải thích cách tính tier sau khi có data logic.

### Champion Row

Dùng ở tier list.

Nội dung:

- Rank.
- Champion avatar.
- Champion name.
- Tier badge.
- Win rate.
- Pick rate.
- Sample size.
- Build preview.
- Action "Xem".

Trên mobile, chuyển thành card compact nhưng vẫn giữ thứ tự ưu tiên: champion, tier, win rate, build.

### Stat Card

Dùng cho thông tin tướng/trang detail.

Nội dung:

- Label.
- Value.
- Delta/trend nếu có.
- Tooltip giải thích chỉ số.

### Item Strip

Dùng để hiển thị build.

Yêu cầu:

- Icon item cùng kích thước.
- Slot trống có placeholder.
- Tooltip item sau khi có data item.
- Không làm layout thay đổi khi ảnh chưa load.

### Empty / Loading / Error State

Copy mẫu:

- Empty: "Chưa đủ dữ liệu cho bộ lọc này."
- Loading: "Đang tải dữ liệu meta..."
- Error: "Không thể tải dữ liệu lúc này."
- Stale: "Dữ liệu có thể chưa cập nhật theo patch mới nhất."

## Accessibility

- Contrast text phải đủ rõ trên nền tối.
- Tất cả icon-only buttons cần `aria-label`.
- Filter/tabs dùng keyboard được.
- Không truyền ý nghĩa chỉ bằng màu; tier/trend phải có text hoặc icon.
- Loading state không được làm mất bố cục chính.
