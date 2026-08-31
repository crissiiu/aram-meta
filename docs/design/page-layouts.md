# Layout Màn Hình

Tài liệu này mô tả layout ở mức wireframe để triển khai frontend React sau này.

## App Shell

Desktop:

```text
┌─────────────────────────────────────────────────────────────┐
│ Header: Logo | Search | Tier List | Champions | Community   │
├─────────────────────────────────────────────────────────────┤
│ Page content                                                 │
└─────────────────────────────────────────────────────────────┘
```

Mobile:

```text
┌──────────────────────────┐
│ Header: Logo | Search | ☰ │
├──────────────────────────┤
│ Page content              │
└──────────────────────────┘
```

Header cần ưu tiên search. Navigation mobile mở bằng drawer hoặc menu đơn giản.

## Home

Mục tiêu: đưa người dùng vào hành động chính ngay.

Desktop:

```text
┌─────────────────────────────────────────────────────────────┐
│ Search lớn: "Tìm tướng ARAM..."                             │
├───────────────────────────────┬─────────────────────────────┤
│ Tướng mạnh patch hiện tại      │ Meta snapshot               │
│ - Champion card compact        │ - Patch                     │
│ - Champion card compact        │ - Last updated              │
│ - Champion card compact        │ - Sample size               │
├───────────────────────────────┴─────────────────────────────┤
│ Tier list preview                                            │
└─────────────────────────────────────────────────────────────┘
```

Mobile:

```text
┌──────────────────────────┐
│ Search                   │
├──────────────────────────┤
│ Tướng mạnh patch hiện tại │
├──────────────────────────┤
│ Meta snapshot             │
├──────────────────────────┤
│ Tier list preview         │
└──────────────────────────┘
```

## Tier List

Mục tiêu: scan nhanh tướng mạnh/yếu theo patch.

Desktop:

```text
┌─────────────────────────────────────────────────────────────┐
│ Title: ARAM Tier List | Patch | Last updated                 │
├─────────────────────────────────────────────────────────────┤
│ Filters: Patch | Region | Rank | Playstyle                   │
├────┬──────────────┬──────┬────────┬────────┬────────┬───────┤
│ #  │ Champion      │ Tier │ Win %  │ Pick % │ Sample │ Build │
├────┼──────────────┼──────┼────────┼────────┼────────┼───────┤
│ 1  │ Jinx          │ S    │ 54.2   │ 12.1   │ 18k    │ icons │
└────┴──────────────┴──────┴────────┴────────┴────────┴───────┘
```

Mobile:

```text
┌──────────────────────────┐
│ ARAM Tier List            │
│ Patch | Region            │
├──────────────────────────┤
│ Horizontal filters         │
├──────────────────────────┤
│ Champion compact card      │
│ Avatar Name Tier Win%      │
│ Build icons                │
├──────────────────────────┤
│ Champion compact card      │
└──────────────────────────┘
```

Quy tắc:

- Desktop ưu tiên table.
- Mobile ưu tiên card compact.
- Filter không được đẩy nội dung chính xuống quá sâu.

## Champion Detail

Mục tiêu: trả lời ngay "nên lên gì?".

Desktop:

```text
┌─────────────────────────────────────────────────────────────┐
│ Champion header: Avatar | Name | Tier | Win% | Pick%         │
├───────────────────────────────┬─────────────────────────────┤
│ Recommended Build             │ Stats                       │
│ - Starter                     │ - Win rate                  │
│ - Core items                  │ - Pick rate                 │
│ - Situational items           │ - Sample size               │
│ - Boots                       │ - Last updated              │
├───────────────────────────────┴─────────────────────────────┤
│ Guide notes: cách chơi, khi nào đổi build                    │
├─────────────────────────────────────────────────────────────┤
│ Alternative builds                                            │
└─────────────────────────────────────────────────────────────┘
```

Mobile:

```text
┌──────────────────────────┐
│ Avatar Name Tier          │
│ Win% Pick% Sample         │
├──────────────────────────┤
│ Core build                │
├──────────────────────────┤
│ Situational items         │
├──────────────────────────┤
│ Guide notes               │
├──────────────────────────┤
│ Alternative builds        │
└──────────────────────────┘
```

Thứ tự ưu tiên mobile:

1. Tướng + tier.
2. Core build.
3. Situational items.
4. Stats.
5. Guide notes.

## Player Search

Mục tiêu: tìm người chơi bằng Riot ID.

```text
┌─────────────────────────────────────────────────────────────┐
│ Search: gameName | tagLine | region                         │
├─────────────────────────────────────────────────────────────┤
│ Result state: profile card / empty / error                   │
├─────────────────────────────────────────────────────────────┤
│ Recent ARAM matches                                          │
└─────────────────────────────────────────────────────────────┘
```

Trạng thái cần có:

- Default: hướng dẫn ngắn trong placeholder.
- Loading: giữ nguyên layout search.
- Not found: "Không tìm thấy người chơi."
- Error: "Không thể kết nối Riot API lúc này."

## Match History

Mục tiêu: đọc nhanh trận gần đây và build đã dùng.

Desktop:

```text
┌──────────┬──────────┬──────┬────────┬────────────┬──────────┐
│ Result   │ Champion │ KDA  │ Damage │ Items      │ Time     │
└──────────┴──────────┴──────┴────────┴────────────┴──────────┘
```

Mobile:

```text
┌──────────────────────────┐
│ Win/Loss | Champion | Time│
│ KDA | Damage              │
│ Item strip                │
└──────────────────────────┘
```

## Community

Mục tiêu: dẫn người dùng sang Discord hoặc flow lập đội mà không làm loãng core guide.

Layout:

```text
┌─────────────────────────────────────────────────────────────┐
│ Community intro + Join Discord button                       │
├─────────────────────────────────────────────────────────────┤
│ Group finding rules / channels                              │
├─────────────────────────────────────────────────────────────┤
│ Safety and moderation notes                                 │
└─────────────────────────────────────────────────────────────┘
```

Giai đoạn đầu không cần chat UI phức tạp.

## Trạng Thái Data Freshness

Mọi trang dùng số liệu cần có trạng thái:

- Patch đang xem.
- Lần cập nhật gần nhất.
- Sample size.
- Cảnh báo nếu dữ liệu stale.

Vị trí:

- Tier List: gần title/filter.
- Champion Detail: trong stat panel.
- Home: trong meta snapshot.
