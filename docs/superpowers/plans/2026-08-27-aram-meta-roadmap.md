# Kế Hoạch Triển Khai ARAM Meta

> **Dành cho agent/engineer triển khai:** Nên dùng từng tác vụ nhỏ có checkbox (`- [ ]`) để theo dõi tiến độ. Mỗi phase cần có thay đổi độc lập, kiểm thử được, và commit riêng.

**Mục tiêu:** Xây dựng website dành cho người chơi ARAM trong Liên Minh Huyền Thoại, giúp người dùng nắm meta hiện tại, chọn cách lên đồ phù hợp, xem số liệu, và về sau mở rộng sang theo dõi người chơi, cộng đồng lập đội, cùng phần mềm companion.

**Kiến trúc:** Bắt đầu bằng MVP website tập trung vào guide và dữ liệu meta. Toàn bộ truy cập Riot API nằm ở backend, dữ liệu trận/static được chuẩn hóa trong MySQL, thống kê public được tính qua job định kỳ và cache. Sản phẩm ưu tiên người dùng Việt Nam trước nhưng giữ khả năng mở rộng đa ngôn ngữ và đa khu vực.

**Công nghệ:** React với TypeScript cho frontend, NestJS với TypeScript cho backend, MySQL cho dữ liệu quan hệ, Redis cho cache/queue/rate-limit, Docker Compose cho môi trường local. Framework frontend có thể là Next.js hoặc Vite, nhưng UI phải được xây trên React.

**Đặc tả:** Tài liệu này triển khai định hướng sản phẩm từ trao đổi khởi tạo dự án `aram-meta`.

## Ràng Buộc Chung

- MVP ưu tiên guide meta trước, chưa tập trung vào chat cộng đồng hoặc phân tích người chơi đầy đủ.
- Người dùng ban đầu là người chơi ARAM Việt Nam, có lộ trình mở rộng global.
- Frontend bắt buộc dùng React với TypeScript theo yêu cầu ban đầu của dự án.
- Chiến lược dữ liệu là Riot API kết hợp phân tích riêng; không phụ thuộc mặc định vào dữ liệu bên thứ ba nếu chưa xác nhận quyền dùng.
- Riot API key tuyệt đối không được xuất hiện trong frontend, bundle trình duyệt, log public, hoặc phần mềm phân phối cho client.
- Trước khi public rộng cần đăng ký sản phẩm với Riot và hiển thị thông tin pháp lý/chính sách cần thiết.
- Repo hiện tại gần như trống, chỉ có `README.md`, nên giai đoạn triển khai phải bao gồm scaffolding dự án.

---

## Tóm Tắt

Dự án nên phát triển theo các giai đoạn:

1. Nền tảng sản phẩm và repository.
2. MVP guide: tier list, trang tướng, build, thống kê theo patch.
3. Pipeline dữ liệu từ Riot.
4. Tra cứu người chơi và lịch sử đấu.
5. Cộng đồng và lập đội qua Discord.
6. Nghiên cứu phần mềm desktop companion/overlay an toàn theo chính sách Riot.

Phiên bản đầu tiên cần chứng minh một giá trị thật rõ: khi người chơi mở website trước hoặc trong trận ARAM, họ có thể nhanh chóng biết nên lên đồ gì và vì sao build đó đang hợp meta.

## Roadmap Sản Phẩm

### Phase 0: Nền Tảng Sản Phẩm

**Files:**
- Create: `docs/product/vision.md`
- Create: `docs/product/sitemap.md`
- Create: `docs/product/riot-compliance.md`
- Modify: `README.md`

**Interfaces:**
- Produces: tầm nhìn sản phẩm, sitemap, và ghi chú tuân thủ dùng cho mọi phase sau.
- Consumes: không phụ thuộc code.

- [ ] Định nghĩa lời hứa sản phẩm: "guide ARAM nhanh, đúng patch, dễ hiểu cho người chơi Liên Minh."
- [ ] Tài liệu hóa các luồng người dùng chính:
  - Mở tier list và chọn tướng mạnh.
  - Tìm tướng và copy build được khuyến nghị.
  - Xem build thay thế khi đội hình team hoặc địch thay đổi.
  - Tìm người chơi và xem lịch sử đấu ARAM ở các phase sau.
- [ ] Tài liệu hóa sitemap ban đầu:
  - Home
  - Tier List
  - Champion Detail
  - Items / Augments / Cores
  - Player Search
  - Match History
  - Leaderboard
  - Guides
  - Patch Notes
  - Community
- [ ] Tài liệu hóa các nguyên tắc tuân thủ Riot:
  - Đăng ký sản phẩm public với Riot trước khi phân phối rộng.
  - Giữ API key ở server-side.
  - Thêm boilerplate pháp lý của Riot ở footer hoặc trang legal dễ thấy.
  - Tôn trọng rate limit và header `Retry-After`.
  - Không xây tính năng tự động hóa gameplay hoặc can thiệp League client.
- [ ] Cập nhật `README.md` với mục tiêu dự án, định hướng stack, placeholder setup local, và link roadmap.
- [ ] Commit với message: `docs: define aram meta product foundation`.

### Phase 1: Nền Tảng Kỹ Thuật

**Files:**
- Create: `apps/web`
- Create: `apps/api`
- Create: `packages/shared`
- Create: `docker-compose.yml`
- Create: `.env.example`
- Create: `docs/architecture/overview.md`

**Interfaces:**
- Produces:
  - App shell frontend.
  - App shell backend.
  - Shared TypeScript package cho DTO và constants.
  - Dịch vụ local MySQL và Redis.
- Consumes: tài liệu sản phẩm từ Phase 0.

- [ ] Chọn framework React: ưu tiên Next.js nếu cần SEO mạnh cho guide/trang tướng; dùng Vite React nếu muốn app shell đơn giản hơn trong giai đoạn prototype.
- [ ] Scaffold `apps/web` với TypeScript, routing, linting, formatting, và test tooling.
- [ ] Scaffold `apps/api` với NestJS, TypeScript, config validation, health endpoint, và test tooling.
- [ ] Thêm `packages/shared` cho các DTO dùng chung như `Region`, `PatchVersion`, `ChampionSlug`, và response shape cho thống kê public.
- [ ] Thêm Docker Compose services:
  - `mysql`
  - `redis`
  - `api`
  - `web`
- [ ] Định nghĩa biến môi trường trong `.env.example`:
  - `RIOT_API_KEY`
  - `DATABASE_URL`
  - `REDIS_URL`
  - `PUBLIC_WEB_URL`
  - `API_PORT`
- [ ] Thêm backend health endpoint `GET /health` trả về trạng thái service và build metadata.
- [ ] Thêm route health hoặc landing shell phía frontend có thể gọi `GET /health`.
- [ ] Thêm tài liệu kiến trúc mô tả frontend, backend, database, queue, cache, và boundary với Riot API.
- [ ] Chạy unit tests và smoke startup checks.
- [ ] Commit với message: `chore: scaffold aram meta platform`.

### Phase 2: MVP Guide Meta

**Files:**
- Create: frontend pages cho tier list và champion detail.
- Create: backend endpoints cho public meta summaries.
- Create: MySQL tables cho champions, items, patches, builds, và computed stats.
- Create: seed scripts cho dữ liệu static ban đầu.

**Interfaces:**
- Produces:
  - `GET /meta/tier-list?patch=&region=&rank=`
  - `GET /champions/:slug`
  - `GET /champions/:slug/builds?patch=&region=`
- Consumes:
  - Dữ liệu static champion và item.
  - Computed stats từ Phase 3 khi đã sẵn sàng.
  - Dữ liệu seed/manual trước khi có thống kê tự động.

- [ ] Xây UI tier list với bộ lọc patch, region, và rank bracket nếu có.
- [ ] Hiển thị chỉ số tướng:
  - tier
  - win rate
  - pick rate
  - sample size
  - nhãn role/playstyle khuyến nghị
- [ ] Xây trang chi tiết tướng với:
  - core items
  - situational items
  - starter options
  - boots
  - runes hoặc augment/core nếu dữ liệu game hiện tại hỗ trợ
  - ghi chú guide tiếng Việt ngắn gọn
- [ ] Hỗ trợ editorial notes để đội ngũ giải thích vì sao build được khuyến nghị.
- [ ] Thêm trạng thái loading, empty, và stale-data cho các trang public.
- [ ] Tối ưu responsive cho mobile, phục vụ việc tra nhanh khi đang chọn tướng hoặc loading game.
- [ ] Viết frontend tests cho filter behavior và champion detail rendering.
- [ ] Viết backend tests cho response shape, sorting, và missing data behavior.
- [ ] Commit với message: `feat: add aram guide meta mvp`.

### Phase 3: Pipeline Dữ Liệu Riot

**Files:**
- Create: Riot API client module trong backend.
- Create: queue workers cho match collection và stat aggregation.
- Create: database tables cho raw matches, participants, participant builds, và aggregate stats.
- Create: docs cho data freshness và rate-limit behavior.

**Interfaces:**
- Produces:
  - bản ghi match đã chuẩn hóa
  - thống kê champion/item/build đã tính
  - metadata về độ mới dữ liệu
- Consumes:
  - `RIOT_API_KEY`
  - Riot Account, Summoner, Match v5, và Spectator v5 APIs khi cần.

- [ ] Implement Riot API client chạy server-side với typed errors.
- [ ] Thêm request logging có redact API key và dữ liệu tài khoản nhạy cảm.
- [ ] Implement cache keys cho Riot responses với expiry theo loại endpoint.
- [ ] Implement xử lý rate limit:
  - đọc response `429`
  - tôn trọng `Retry-After`
  - tạm dừng queue jobs bị ảnh hưởng
  - retry bằng backoff
- [ ] Tạo scheduled jobs:
  - sync patch/static data
  - discovery match ID
  - ingestion match detail
  - aggregation thống kê theo patch và region
- [ ] Lưu đủ raw data để recompute stats khi logic aggregation thay đổi.
- [ ] Thêm data quality checks cho malformed matches, missing champions, missing items, và unknown patches.
- [ ] Viết integration tests với mocked Riot responses.
- [ ] Commit với message: `feat: add riot data pipeline`.

### Phase 4: Tra Cứu Người Chơi Và Lịch Sử Đấu

**Files:**
- Create: player search backend endpoints.
- Create: player profile và match history frontend pages.
- Create: player cache tables.

**Interfaces:**
- Produces:
  - `GET /players/search?gameName=&tagLine=&region=`
  - `GET /players/:puuid/matches`
  - optional `GET /players/:puuid/live-game`
- Consumes:
  - Riot account/player APIs
  - dữ liệu match đã lưu từ Phase 3

- [ ] Thêm tìm kiếm Riot ID bằng `gameName`, `tagLine`, và region.
- [ ] Xây trang hồ sơ người chơi với các trận ARAM gần đây.
- [ ] Hiển thị tóm tắt trận:
  - champion
  - result
  - KDA
  - damage
  - items
  - game duration
  - date
- [ ] Thêm so sánh build người chơi đã dùng với meta hiện tại của tướng đó.
- [ ] Thêm live game lookup bằng Spectator API nếu ổn định cho region mục tiêu.
- [ ] Cache theo hướng tôn trọng quyền riêng tư và tránh expose account identifiers không cần thiết.
- [ ] Viết tests cho lookup thành công, không tìm thấy người chơi, Riot API outage, và lịch sử đấu trống.
- [ ] Commit với message: `feat: add player lookup and aram history`.

### Phase 5: Cộng Đồng Và Discord

**Files:**
- Create: community landing page.
- Create: Discord integration docs hoặc OAuth flow tùy lựa chọn triển khai.
- Create: account/profile tables nếu cần cho tính năng trong site.

**Interfaces:**
- Produces:
  - Link Discord server hoặc OAuth integration.
  - Luồng tìm đội.
- Consumes:
  - User identity nếu cần.

- [ ] Bắt đầu bằng link Discord community đơn giản từ website.
- [ ] Chỉ thêm tìm đội sau khi guide và player features đã có retention đáng kể.
- [ ] Nếu thêm tài khoản trong site, hỗ trợ các field profile cơ bản:
  - display name
  - Riot ID
  - preferred region
  - preferred ARAM role/playstyle
  - Discord handle hoặc linked Discord account
- [ ] Thêm moderation controls trước khi mở chat public.
- [ ] Viết tests cho profile visibility và group listing permissions nếu có account.
- [ ] Commit với message: `feat: add aram community foundation`.

### Phase 6: Nghiên Cứu Desktop Companion

**Files:**
- Create: `docs/research/desktop-companion.md`
- Create: prototype folder chỉ sau khi review compliance.

**Interfaces:**
- Produces:
  - decision document cho Tauri vs Electron.
  - boundary tích hợp an toàn theo chính sách Riot.
- Consumes:
  - web API từ các phase trước.

- [ ] Nghiên cứu ràng buộc chính sách Riot cho companion app trước khi build client phân phối rộng.
- [ ] Ưu tiên Tauri nếu chỉ cần desktop app nhẹ.
- [ ] Chỉ ưu tiên Electron nếu cần rendering giống browser, extension, hoặc desktop APIs nặng hơn.
- [ ] Giữ mọi hướng dẫn gameplay ở dạng thông tin hỗ trợ.
- [ ] Không tự động hóa gameplay, input, hoặc hành vi client.
- [ ] Prototype champion search, current build guide, và match lookup bằng backend API hiện có.
- [ ] Commit với message: `docs: research desktop companion path`.

## Mặc Định Public API

- Dùng REST cho MVP vì đơn giản, dễ cache, dễ inspect.
- Dùng JSON response bodies với DTO ổn định export từ `packages/shared`.
- Version public backend routes dưới `/v1` trước khi launch nếu có external consumers.
- Chỉ thêm GraphQL nếu độ phức tạp query phía frontend đủ lớn để xứng đáng.

## Mặc Định Data Model

- `champions`: metadata chuẩn của champion theo version Riot/Data Dragon.
- `items`: metadata item theo patch.
- `patches`: patch version, ngày phát hành, trạng thái active.
- `matches`: raw match metadata và source region.
- `participants`: dữ liệu từng người chơi trong match.
- `participant_builds`: item/rune/spell/build details trích xuất từ match data.
- `computed_champion_stats`: aggregate cấp champion theo patch và region.
- `computed_build_stats`: aggregate cấp build theo champion, patch, và region.
- `editorial_guides`: ghi chú guide tiếng Việt thủ công gắn với champion/build/page.

## Kế Hoạch Kiểm Thử

- Unit test stat aggregation cho win rate, pick rate, sample size, tier sorting, và build grouping.
- Integration test Riot API client với mocked responses cho success, `404`, `429`, và `5xx`.
- Integration test queue jobs cho retry và rate-limit pause behavior.
- Backend contract test toàn bộ public endpoints frontend sử dụng.
- Frontend component test tier list filtering và champion detail rendering.
- E2E smoke test:
  - mở home
  - xem tier list
  - lọc theo patch
  - mở champion detail
  - tìm người chơi sau Phase 4
- Manual QA trên mobile viewport để đảm bảo tra cứu nhanh trong luồng chơi game.

## Tiêu Chí Chấp Nhận

- Người dùng có thể mở site và tìm khuyến nghị tướng/build ARAM trong tối đa ba click.
- Trang tướng hiển thị build khuyến nghị kèm thống kê theo patch và giải thích tiếng Việt.
- Backend có thể ingest Riot match data mà không expose API key hoặc crash khi gặp rate limit.
- Người dùng nhìn thấy độ mới dữ liệu khi thống kê có thể đã stale.
- App có lộ trình đăng ký Riot product rõ ràng trước khi public launch.

## Tài Liệu Tham Khảo

- Riot Developer Portal: https://developer.riotgames.com/docs/portal
- Riot League of Legends Developer Policy: https://developer.riotgames.com/docs/lol
- Danh sách Riot APIs: https://developer.riotgames.com/apis/
