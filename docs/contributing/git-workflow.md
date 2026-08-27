# Quy Ước Branch Và Commit

Tài liệu này định nghĩa cách đặt tên branch và viết commit message cho dự án ARAM Meta. Mục tiêu là giữ lịch sử Git dễ đọc, dễ review và dễ tự động hóa changelog/release về sau.

## Nguyên Tắc Chung

- Mỗi branch chỉ nên phục vụ một mục tiêu rõ ràng.
- Tên branch dùng chữ thường, không dấu, phân tách bằng dấu gạch ngang `-`.
- Commit message dùng tiếng Anh theo chuẩn Conventional Commits để dễ đọc trong tooling quốc tế.
- Nội dung mô tả trong pull request hoặc tài liệu có thể viết tiếng Việt có dấu.
- Commit nhỏ, có ý nghĩa; tránh gom nhiều thay đổi không liên quan vào một commit.

## Quy Ước Đặt Tên Branch

Format:

```text
<type>/<scope>-<short-description>
```

Trong đó:

- `type`: loại công việc.
- `scope`: khu vực bị ảnh hưởng.
- `short-description`: mô tả ngắn, không dấu, dùng kebab-case.

Ví dụ:

```text
feat/web-tier-list
feat/api-champion-builds
fix/api-riot-rate-limit
docs/product-sitemap
chore/docker-compose
refactor/shared-dtos
test/meta-aggregation
```

## Branch Type

| Type | Khi dùng | Ví dụ |
| --- | --- | --- |
| `feat` | Thêm tính năng mới | `feat/web-champion-detail` |
| `fix` | Sửa bug | `fix/api-empty-tier-list` |
| `docs` | Thay đổi tài liệu | `docs/git-workflow` |
| `chore` | Cấu hình, tooling, dependency, việc bảo trì | `chore/eslint-config` |
| `refactor` | Đổi cấu trúc code không đổi hành vi | `refactor/api-riot-client` |
| `test` | Thêm/sửa test | `test/build-stats-aggregation` |
| `perf` | Cải thiện hiệu năng | `perf/meta-cache` |
| `ci` | CI/CD pipeline | `ci/github-actions` |
| `hotfix` | Sửa lỗi khẩn cấp trên production | `hotfix/riot-api-key-rotation` |

## Scope Khuyến Nghị

| Scope | Khu vực |
| --- | --- |
| `web` | Frontend React |
| `api` | Backend NestJS |
| `shared` | Package TypeScript dùng chung |
| `db` | Migration, schema, seed data |
| `riot` | Riot API client hoặc data sync |
| `meta` | Logic thống kê meta |
| `docs` | Tài liệu |
| `infra` | Docker, deploy, environment |
| `community` | Discord, group, chat |
| `desktop` | Companion app sau này |

## Quy Ước Commit Message

Format:

```text
<type>(<scope>): <short summary>
```

Ví dụ:

```text
feat(web): add aram tier list filters
feat(api): add champion builds endpoint
fix(riot): respect retry-after on rate limit
docs(product): add sitemap and vision
chore(infra): add mysql and redis compose services
test(meta): cover champion win rate aggregation
```

## Commit Type

| Type | Khi dùng |
| --- | --- |
| `feat` | Thêm tính năng người dùng hoặc API mới |
| `fix` | Sửa lỗi hành vi |
| `docs` | Chỉ thay đổi tài liệu |
| `style` | Format code, không đổi logic |
| `refactor` | Đổi cấu trúc code, không đổi hành vi |
| `test` | Thêm/sửa test |
| `chore` | Tooling, dependency, cấu hình |
| `perf` | Tối ưu hiệu năng |
| `ci` | CI/CD |
| `build` | Build system hoặc package manager |
| `revert` | Revert commit trước đó |

## Quy Tắc Viết Summary

- Dùng tiếng Anh.
- Viết ở dạng mệnh lệnh hiện tại: `add`, `fix`, `update`, `remove`.
- Không viết hoa chữ đầu nếu không phải tên riêng.
- Không đặt dấu chấm ở cuối.
- Giữ ngắn gọn, lý tưởng dưới 72 ký tự.

Đúng:

```text
feat(web): add champion detail layout
fix(api): return empty builds for unknown champion
docs(riot): document api key handling
```

Không nên:

```text
Added champion detail layout.
fix bug
update code
```

## Commit Body

Thêm body khi commit cần giải thích lý do hoặc tradeoff.

Format:

```text
feat(api): add champion builds endpoint

Expose build recommendations by champion slug, patch and region.
The endpoint returns empty arrays instead of 404 when no build data exists.
```

Body nên dùng khi:

- Có thay đổi API hoặc data model.
- Có workaround do Riot API/rate limit.
- Có migration.
- Có quyết định kỹ thuật quan trọng.

## Breaking Change

Nếu thay đổi phá vỡ API, schema hoặc workflow cũ, ghi rõ `BREAKING CHANGE`.

```text
feat(api): version public meta endpoints

BREAKING CHANGE: public meta routes now live under /v1.
```

## Liên Kết Issue Hoặc Task

Nếu có issue/task ID, thêm ở cuối body:

```text
Refs: ARAM-123
```

Nếu commit đóng issue:

```text
Closes: ARAM-123
```

## Pull Request

Tên pull request nên giống commit summary chính:

```text
feat(web): add aram tier list page
```

PR description nên có:

- Mục tiêu thay đổi.
- Ảnh/screenshot nếu thay đổi UI.
- Cách test.
- Rủi ro hoặc phần chưa làm.

## Ví Dụ Theo Dự Án

### Tài Liệu

Branch:

```text
docs/git-workflow
```

Commit:

```text
docs(contributing): add branch and commit conventions
```

### Frontend React

Branch:

```text
feat/web-tier-list
```

Commit:

```text
feat(web): add aram tier list page
```

### Backend NestJS

Branch:

```text
feat/api-champion-builds
```

Commit:

```text
feat(api): add champion builds endpoint
```

### Riot Data Pipeline

Branch:

```text
feat/riot-match-ingestion
```

Commit:

```text
feat(riot): add match ingestion worker
```

### Bug Fix

Branch:

```text
fix/meta-empty-sample-size
```

Commit:

```text
fix(meta): handle zero sample size in tier calculation
```

## Checklist Trước Khi Commit

- [ ] Branch đúng format `<type>/<scope>-<short-description>`.
- [ ] Commit message đúng format `<type>(<scope>): <short summary>`.
- [ ] Thay đổi trong commit cùng một mục tiêu.
- [ ] Không commit `.env`, API key, token hoặc dữ liệu nhạy cảm.
- [ ] Đã chạy test hoặc ghi rõ lý do chưa chạy trong PR.
- [ ] Docs được cập nhật nếu thay đổi hành vi public, API hoặc workflow.
