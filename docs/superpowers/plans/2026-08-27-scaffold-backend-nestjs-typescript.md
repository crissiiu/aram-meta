# Kế Hoạch Triển Khai Scaffold Backend NestJS TypeScript

> **Dành cho agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Các bước dùng cú pháp checkbox (`- [ ]`) để theo dõi tiến độ.

**Mục tiêu:** Hoàn thiện checklist item "Scaffold backend NestJS + TypeScript" bằng một ứng dụng NestJS tại `apps/api` trong npm workspace, build được, test được, nằm trong mô hình kiến trúc tổng thể, và sẵn sàng thêm `GET /health` cùng tích hợp Riot API ở các checklist/phase tiếp theo.

**Kiến trúc:** Giữ `apps/api` là backend NestJS độc lập trong monorepo npm workspaces, theo hướng modular monolith có boundary rõ ràng giống cách nhiều công ty công nghệ lớn khởi đầu sản phẩm: API layer, application/service layer, integration adapters, cache/queue, và persistence được tách để dễ bảo trì và scale dần. Scaffold tối thiểu gồm bootstrap, root module, root controller/service, unit test, e2e test, TypeScript config riêng cho API, và tài liệu mô hình kiến trúc để các phase Riot/data/player lookup kế thừa. Chưa tạo health endpoint, database implementation, Redis implementation, hay Riot client thật vì các mục đó nằm ở checklist/phase sau, nhưng scaffold phải để sẵn extension points cho chúng.

**Tech Stack:** NestJS 11, TypeScript 5.9, Node.js 22+, npm workspaces, Jest, Supertest.

**Spec:** `docs/phases/phase-1-technical-foundation.md`

## Ràng Buộc Toàn Cục

- Backend dùng NestJS + TypeScript.
- Đầu ra của phase có `apps/api`.
- MySQL là database chính.
- Redis dùng cho cache và queue.
- Không có Riot API key hard-coded trong repo.
- Health endpoint `GET /health` được thực hiện trong checklist item riêng sau mục scaffold backend.
- Frontend/UI khi được dùng trong phase liên quan phải kế thừa màu, spacing, radius, typography từ `docs/design/design-system.md`; không tạo palette riêng trong task backend.
- Kiến trúc phải ưu tiên tính kế thừa, tính duy trì, hướng tới khách hàng, và tính mở rộng.
- Mọi request tới Riot API phải đi qua backend; frontend, desktop companion, và shared package không được giữ `RIOT_API_KEY`.
- Riot integration sau này phải có cache-aside, queue/backoff, tôn trọng `429` và `Retry-After`, và không trả raw Riot error có khả năng chứa thông tin nhạy cảm về frontend.

---

## Nguyên Tắc Kiến Trúc

- **Tính kế thừa:** Mỗi module mới phải kế thừa contract từ `packages/shared` khi DTO/constants được tạo, và kế thừa design token từ `docs/design/design-system.md` khi có UI. Không nhân đôi response shape hoặc màu sắc bằng literal riêng nếu đã có contract/token.
- **Tính duy trì:** NestJS module tách theo domain (`health`, `meta`, `champions`, `players`, `riot`, `jobs`) và mỗi module giữ controller/service/adapter gần nhau. Test đặt gần module để reviewer có thể xác minh hành vi sau các thay đổi nhỏ.
- **Hướng tới khách hàng:** Public API tối ưu cho câu hỏi của người chơi ARAM: tướng nào mạnh, lên đồ gì, dữ liệu có mới không, và sample size có đủ tin cậy không. Lỗi trả về frontend phải ngắn gọn, an toàn, dễ hiển thị bằng tiếng Việt.
- **Tính mở rộng:** Bắt đầu bằng modular monolith để đơn giản, nhưng boundary phải cho phép tách jobs/worker, cache layer, Riot adapter, và database repositories thành service riêng khi traffic tăng.
- **Kiến trúc tham chiếu từ công ty công nghệ lớn:** Áp dụng các mẫu phổ biến ở big tech/SaaS scale-up: layered API contracts, domain modules, backend-for-frontend boundary, cache-aside Redis, async queue cho external API ingestion, centralized config, structured logging, health/readiness endpoints, và adapter pattern cho external providers.
- **Nguồn tham chiếu:** Shopify Engineering về modular monolith (`https://shopify.engineering/deconstructing-monolith-designing-software-maximizes-developer-productivity`, `https://shopify.engineering/shopify-monolith`) và Uber Engineering về domain-oriented microservice architecture (`https://www.uber.com/au/en/blog/microservice-architecture/`). Phase 1 áp dụng phần phù hợp với sản phẩm mới: một deployable backend, domain boundary rõ, contract ổn định, extension points rõ ràng.

## Cấu Trúc File

- Create: `docs/architecture/system-model.md`
  - Mô hình kiến trúc hệ thống, data flow, Riot integration boundary, scalability path, và quy tắc kế thừa UI/design-token.
- Modify: `package.json`
  - Thêm root workspace scripts để dev, build, start, và test API từ monorepo root.
- Create: `apps/api/package.json`
  - API package metadata, NestJS dependencies, dev dependencies, scripts, và Jest unit test config.
- Create: `apps/api/nest-cli.json`
  - Nest CLI project config trỏ vào `src/main.ts`.
- Create: `apps/api/tsconfig.json`
  - TypeScript settings cho NestJS compile.
- Create: `apps/api/tsconfig.build.json`
  - Build config loại bỏ test files khỏi output.
- Create: `apps/api/src/main.ts`
  - Nest bootstrap, CORS theo `PUBLIC_WEB_URL`, và port theo `API_PORT`.
- Create: `apps/api/src/app.module.ts`
  - Root Nest module nối controller/service.
- Create: `apps/api/src/app.controller.ts`
  - Root readiness placeholder endpoint `GET /` để xác minh app shell đang chạy.
- Create: `apps/api/src/app.service.ts`
  - Trả về thông tin app shell không chứa secret.
- Create: `apps/api/src/app.controller.spec.ts`
  - Unit test cho root controller.
- Create: `apps/api/test/app.e2e-spec.ts`
  - E2E smoke test cho `GET /`.
- Create: `apps/api/test/jest-e2e.json`
  - Jest config riêng cho e2e tests.
- Modify: `README.md`
  - Thêm lệnh backend local sau khi scaffold xong.

## Cổng Kiến Trúc Trước Khi Triển Khai

**Files:**
- Create: `docs/architecture/system-model.md`
- Modify: `docs/architecture/overview.md`

**Interfaces:**
- Consumes: `docs/phases/phase-1-technical-foundation.md`, `docs/product/vision.md`, `docs/product/riot-compliance.md`, `docs/design/design-system.md`, và `docs/architecture/overview.md` hiện có.
- Produces: ngôn ngữ kiến trúc dùng chung để các task backend, frontend, Riot API, database, Redis, và worker về sau phải tuân theo.

- [ ] **Step 1: Viết tài liệu mô hình hệ thống**

Create `docs/architecture/system-model.md`:

```markdown
# Mô Hình Hệ Thống

## Định Hướng Chính

ARAM Meta là nền tảng guide ARAM hướng tới người chơi. Hệ thống phải trả lời thật nhanh các câu hỏi của khách hàng: tướng nào đang mạnh, nên lên build nào, dữ liệu mới đến đâu, và đề xuất có đủ đáng tin không.

## Kiểu Kiến Trúc

Bắt đầu bằng modular monolith. Đây là hướng tăng trưởng phổ biến ở nhiều công ty công nghệ lớn: giữ một backend deployable duy nhất khi product boundary còn thay đổi, nhưng bắt buộc module boundary rõ ràng để các phần tải cao có thể tách ra sau.

Tham chiếu:

- Shopify Engineering: modular monolith và component boundaries.
- Uber Engineering: domain-oriented architecture, gateways, và extension points.

Boundary:

- `apps/web`: customer UI. Không gọi Riot API trực tiếp và không nhận secret.
- `apps/api`: NestJS backend-for-frontend và public API boundary.
- `packages/shared`: DTO, constants, enums, và response contracts dùng chung bởi web/api.
- MySQL: relational source of truth cho static data, raw data, aggregated data, và editorial data.
- Redis: cache, queue state, rate-limit coordination, và stale-data protection.
- Queue workers: Riot sync, match ingestion, aggregation, và retry/backoff execution.

## Luồng Tổng Quan

```text
Customer browser
  -> apps/web
  -> apps/api public REST endpoints
  -> service/domain modules
  -> cache-aside Redis
  -> MySQL read models
  -> response DTOs from packages/shared
```

Luồng Riot ingestion:

```text
Scheduled job/admin trigger
  -> jobs module
  -> Riot API adapter
  -> Redis rate-limit/backoff state
  -> raw MySQL tables
  -> aggregation job
  -> computed MySQL tables
  -> cached public API responses
```

## Mô Hình Module Backend

- `health`: liveness/readiness và dependency checks.
- `meta`: tier list và đề xuất theo patch.
- `champions`: chi tiết tướng, builds, stats, và guide notes.
- `players`: Riot ID lookup và match history ở các phase sau.
- `riot`: external Riot API adapter, request signing, rate-limit handling, và safe error mapping.
- `jobs`: queue producers/processors cho sync và aggregation.
- `common`: config, logging, errors, validation, và response helpers.

Mỗi domain module giữ controller, service, DTO mapping, và repository/adapter interfaces ở gần nhau.

## Quy Tắc API Hướng Khách Hàng

- Public REST endpoints trả stable DTOs từ `packages/shared` sau khi package này tồn tại.
- Mọi response phụ thuộc dữ liệu meta phải có patch, region, last updated time, và sample size khi có thể.
- User-facing errors phải an toàn để hiển thị, không lộ Riot payloads, secrets, stack traces, hoặc infrastructure details.
- Frontend copy ngắn gọn và ưu tiên tiếng Việt; giải thích dài đặt trong guide content hoặc tooltip.

## Quy Tắc Tích Hợp Riot API

- Chỉ backend đọc `RIOT_API_KEY` từ environment variables.
- Riot API calls được cô lập sau `riot` adapter interface để tests có thể dùng fake implementation.
- Xử lý `429` bằng cách đọc `Retry-After`, tạm dừng queue theo route/region bị ảnh hưởng, và retry bằng backoff.
- Cache public data mạnh khi an toàn để giảm lượng request tới Riot.
- Không log API keys, authorization headers, hoặc raw error payloads có thể chứa dữ liệu nhạy cảm.
- Không tự động hóa gameplay, client input, champion selection, item purchase, hoặc League client interaction.

## Kế Thừa Thiết Kế

Tất cả UI work kế thừa từ `docs/design/design-system.md`:

- Colors dùng token đã document như `color-bg`, `color-surface`, `color-accent`, `color-info`, `color-success`, `color-danger`, và tier colors.
- Radius giữ ở `8px` hoặc thấp hơn cho main components.
- Typography dùng scale đã document và không scale font bằng viewport.
- Components ưu tiên tốc độ scan cho người chơi kiểm tra dữ liệu ARAM trước hoặc trong champion select.

Backend tasks không được tự nghĩ UI colors. Nếu backend trả presentation hints sau này, backend trả semantic values như tier hoặc trend, không trả raw hex colors.

## Đường Mở Rộng

Khởi đầu:

- Một `apps/api` NestJS deployment.
- Một MySQL database.
- Một Redis instance.
- In-process tests và local smoke checks.

Khi tăng trưởng:

- Tách queue processors thành worker process riêng nhưng vẫn giữ shared modules/contracts.
- Thêm read replicas hoặc computed read tables cho tier/champion endpoints.
- Thêm CDN/API cache cho public meta responses.
- Chỉ tách Riot ingestion thành service riêng khi queue volume hoặc deploy cadence thật sự cần.
```

- [ ] **Step 2: Link system model từ architecture overview**

Trong `docs/architecture/overview.md`, sau `## Mục Tiêu Kiến Trúc`, thêm:

```markdown
Chi tiết mô hình hệ thống, data flow, boundary Riot API, và quy tắc kế thừa UI nằm ở `docs/architecture/system-model.md`.
```

- [ ] **Step 3: Xác minh architecture model**

Run: `Get-Content -LiteralPath docs/architecture/system-model.md -Encoding UTF8`

Expected: tài liệu có `apps/web`, `apps/api`, `packages/shared`, MySQL, Redis, queue workers, Riot API integration rules, và design inheritance từ `docs/design/design-system.md`.

Run: `rg -n "RIOT_API_KEY|Retry-After|docs/design/design-system.md|modular monolith" docs/architecture/system-model.md`

Expected: cả bốn term đều xuất hiện.

- [ ] **Step 4: Commit**

```bash
git add docs/architecture/system-model.md docs/architecture/overview.md
git commit -m "docs: define system architecture model"
```

## Task 1: Đăng Ký API Workspace Scripts Và Dependencies

**Files:**
- Modify: `package.json`
- Create: `apps/api/package.json`

**Interfaces:**
- Consumes: root npm workspaces pattern `"apps/*"` và architecture boundary từ `docs/architecture/system-model.md`.
- Produces: root commands `npm run dev:api`, `npm run build:api`, `npm run start:api`, `npm run test:api`, `npm run test:e2e:api`; package commands `start`, `start:dev`, `build`, `test`, `test:watch`, `test:e2e`.

- [x] **Step 1: Kiểm tra root package hiện tại**

Run: `Get-Content -LiteralPath package.json -Encoding UTF8`

Expected: root package có `"private": true`, workspaces include `"apps/*"`, và các frontend scripts hiện có được giữ nguyên.

- [x] **Step 2: Cập nhật root scripts**

Merge các API scripts này vào root `scripts` block hiện có mà không xóa web scripts:

```json
{
  "dev:api": "npm --workspace apps/api run start:dev",
  "build:api": "npm --workspace apps/api run build",
  "start:api": "npm --workspace apps/api run start",
  "test:api": "npm --workspace apps/api run test",
  "test:e2e:api": "npm --workspace apps/api run test:e2e"
}
```

Nếu root `scripts` block đang khớp với frontend scaffold plan, root `scripts` block cuối cùng nên là:

```json
{
  "dev:web": "npm --workspace apps/web run dev",
  "build:web": "npm --workspace apps/web run build",
  "preview:web": "npm --workspace apps/web run preview",
  "dev:api": "npm --workspace apps/api run start:dev",
  "build:api": "npm --workspace apps/api run build",
  "start:api": "npm --workspace apps/api run start",
  "test:api": "npm --workspace apps/api run test",
  "test:e2e:api": "npm --workspace apps/api run test:e2e"
}
```

- [x] **Step 3: Tạo API package manifest**

Create `apps/api/package.json`:

```json
{
  "name": "@aram-meta/api",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "start": "nest start",
    "start:dev": "nest start --watch",
    "build": "nest build",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^11.0.0",
    "@nestjs/schematics": "^11.0.0",
    "@nestjs/testing": "^11.0.0",
    "@types/express": "^5.0.0",
    "@types/jest": "^30.0.0",
    "@types/node": "^22.0.0",
    "@types/supertest": "^6.0.3",
    "jest": "^30.0.0",
    "source-map-support": "^0.5.21",
    "supertest": "^7.0.0",
    "ts-jest": "^29.4.0",
    "ts-loader": "^9.5.2",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.9.0"
  },
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}
```

- [x] **Step 4: Cài dependencies**

Run: `npm install`

Expected: npm thoát thành công và `package-lock.json` được tạo hoặc cập nhật ở repo root.

- [x] **Step 5: Xác minh workspace discovery**

Run: `npm --workspace apps/api run build`

Expected: FAIL vì `nest-cli.json` và `src/main.ts` chưa tồn tại. Việc này xác nhận npm tìm được API workspace.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json apps/api/package.json
git commit -m "chore: register api workspace"
```

## Task 2: Thêm Cấu Hình NestJS TypeScript

**Files:**
- Create: `apps/api/nest-cli.json`
- Create: `apps/api/tsconfig.json`
- Create: `apps/api/tsconfig.build.json`

**Interfaces:**
- Consumes: `@nestjs/cli` từ Task 1 và maintainability constraints từ `docs/architecture/system-model.md`.
- Produces: Nest build target `dist/main.js` từ `src/main.ts`; TypeScript compiler options có decorators và metadata enabled.

- [x] **Step 1: Tạo Nest CLI config**

Create `apps/api/nest-cli.json`:

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

- [x] **Step 2: Tạo TypeScript config**

Create `apps/api/tsconfig.json`:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strict": true,
    "strictPropertyInitialization": false,
    "noImplicitAny": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

- [x] **Step 3: Tạo build TypeScript config**

Create `apps/api/tsconfig.build.json`:

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "dist", "test", "**/*spec.ts"]
}
```

- [x] **Step 4: Chạy build để xác minh cấu hình NestJS**

Run: `npm run build:api`

Expected: PASS hoặc no-op thành công nếu `apps/api/src/main.ts` chưa được tạo. Task 3 sẽ tạo source thật và build lại để xác minh output `dist/main.js`.

- [ ] **Step 5: Commit**

```bash
git add apps/api/nest-cli.json apps/api/tsconfig.json apps/api/tsconfig.build.json
git commit -m "chore: configure api typescript build"
```

## Task 3: Tạo NestJS Application Shell Tối Thiểu

**Files:**
- Create: `apps/api/src/main.ts`
- Create: `apps/api/src/app.module.ts`
- Create: `apps/api/src/app.controller.ts`
- Create: `apps/api/src/app.service.ts`

**Interfaces:**
- Consumes: Nest TypeScript config từ Task 2 và customer-facing API rules từ `docs/architecture/system-model.md`.
- Produces: `AppModule`, `AppController`, `AppService`, và root route `GET /` trả `ApiRootResponse`.

- [x] **Step 1: Tạo app service**

Create `apps/api/src/app.service.ts`:

```ts
export type ApiRootResponse = {
  name: "aram-meta-api";
  status: "ok";
  version: string;
  architecture: "modular-monolith";
};

export class AppService {
  getRoot(): ApiRootResponse {
    return {
      name: "aram-meta-api",
      status: "ok",
      version: process.env.npm_package_version ?? "0.1.0",
      architecture: "modular-monolith",
    };
  }
}
```

- [x] **Step 2: Tạo app controller**

Create `apps/api/src/app.controller.ts`:

```ts
import { Controller, Get } from "@nestjs/common";
import { AppService, type ApiRootResponse } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(): ApiRootResponse {
    return this.appService.getRoot();
  }
}
```

- [x] **Step 3: Tạo app module**

Create `apps/api/src/app.module.ts`:

```ts
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

- [x] **Step 4: Tạo bootstrap file**

Create `apps/api/src/main.ts`:

```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

function getApiPort(): number {
  const rawPort = process.env.API_PORT ?? "3001";
  const port = Number(rawPort);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`API_PORT must be a valid TCP port, received "${rawPort}"`);
  }

  return port;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const webOrigin = process.env.PUBLIC_WEB_URL ?? "http://localhost:5173";

  app.enableCors({
    origin: webOrigin,
    credentials: true,
  });

  await app.listen(getApiPort());
}

void bootstrap();
```

- [x] **Step 5: Chạy build**

Run: `npm run build:api`

Expected: PASS và Nest emit `apps/api/dist/main.js`.

- [ ] **Step 6: Commit**

```bash
git add apps/api/src/main.ts apps/api/src/app.module.ts apps/api/src/app.controller.ts apps/api/src/app.service.ts
git commit -m "feat: scaffold nestjs api shell"
```

## Task 4: Thêm API Unit Test Và E2E Smoke Test

**Files:**
- Create: `apps/api/src/app.controller.spec.ts`
- Create: `apps/api/test/app.e2e-spec.ts`
- Create: `apps/api/test/jest-e2e.json`

**Interfaces:**
- Consumes: `AppModule`, `AppController`, và `AppService` từ Task 3.
- Produces: unit coverage cho `AppController.getRoot()` và e2e smoke coverage cho `GET /`.

- [x] **Step 1: Viết unit test**

Create `apps/api/src/app.controller.spec.ts`:

```ts
import { Test, type TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it("returns API shell metadata", () => {
    expect(appController.getRoot()).toEqual({
      name: "aram-meta-api",
      status: "ok",
      version: expect.any(String),
      architecture: "modular-monolith",
    });
  });
});
```

- [x] **Step 2: Tạo e2e Jest config**

Create `apps/api/test/jest-e2e.json`:

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}
```

- [x] **Step 3: Viết e2e smoke test**

Create `apps/api/test/app.e2e-spec.ts`:

```ts
import { type INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it("GET / returns API shell metadata", async () => {
    await request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual({
          name: "aram-meta-api",
          status: "ok",
          version: expect.any(String),
          architecture: "modular-monolith",
        });
      });
  });
});
```

- [x] **Step 4: Chạy unit tests**

Run: `npm run test:api`

Expected: PASS `AppController` unit test.

- [x] **Step 5: Chạy e2e tests**

Run: `npm run test:e2e:api`

Expected: PASS `GET / returns API shell metadata`.

- [x] **Step 6: Chạy build lại**

Run: `npm run build:api`

Expected: PASS với tests được exclude khỏi `dist`.

- [ ] **Step 7: Commit**

```bash
git add apps/api/src/app.controller.spec.ts apps/api/test/app.e2e-spec.ts apps/api/test/jest-e2e.json
git commit -m "test: cover api scaffold smoke path"
```

## Task 5: Document Backend Local Commands

**Files:**
- Modify: `README.md`
- Modify: `docs/architecture/overview.md`

**Interfaces:**
- Consumes: root scripts từ Task 1 và app shell từ Task 3.
- Produces: backend commands cho developer và architecture note rằng API scaffold nằm ở `apps/api`.

- [x] **Step 1: Thêm README backend section**

Append section này vào `README.md` gần phần local development commands:

````markdown
## Chạy Backend Local

Yêu cầu:

- Node.js 22 hoặc mới hơn.
- npm đi kèm Node.js.

Lệnh:

```bash
npm install
npm run dev:api
npm run test:api
npm run test:e2e:api
npm run build:api
```

Backend chạy trong workspace `apps/api` bằng NestJS + TypeScript. Mặc định API lắng nghe `API_PORT=3001` và cho phép CORS từ `PUBLIC_WEB_URL` hoặc `http://localhost:5173`.
````

- [x] **Step 2: Thêm architecture scaffold note**

Trong `docs/architecture/overview.md`, dưới section `## Backend`, thêm paragraph này sau module list:

```markdown
Phase 1 scaffold bắt đầu với một NestJS app tối thiểu trong `apps/api`: root module, root controller, root service, unit test, và e2e smoke test. Scaffold tuân theo `docs/architecture/system-model.md`; database, Redis, Riot API client, và public resource modules được thêm trong các checklist item/phase sau.
```

- [x] **Step 3: Xác minh nội dung docs**

Run: `Get-Content -LiteralPath README.md -Encoding UTF8`

Expected: backend section có đủ năm root API commands và không chứa Riot API key thật.

Run: `Get-Content -LiteralPath docs/architecture/overview.md -Encoding UTF8`

Expected: backend section nhắc tới `apps/api` và giữ nguyên module list hiện có.

- [ ] **Step 4: Commit**

```bash
git add README.md docs/architecture/overview.md
git commit -m "docs: add api scaffold commands"
```

## Self-Review

**Spec coverage:** Plan này cover checklist item "Scaffold backend NestJS + TypeScript" và thêm architecture gate còn thiếu trước khi triển khai. Plan tạo `apps/api`, định nghĩa system architecture model, dùng NestJS + TypeScript, phù hợp npm workspaces, thêm build/test/dev scripts, và giữ secrets ngoài source. Plan cố ý để `GET /health`, MySQL, Redis, `.env.example`, shared package, và frontend-to-backend integration cho các checklist item riêng, đồng thời document boundary của chúng.

**Placeholder scan:** Không có task nào chứa placeholder language. Các file mới có nội dung cụ thể, scripts có lệnh cụ thể, và tests có assertions cụ thể.

**Type consistency:** `ApiRootResponse`, `AppService.getRoot()`, `AppController.getRoot()`, và tests dùng cùng response shape: `{ name: "aram-meta-api", status: "ok", version: string, architecture: "modular-monolith" }`.

## Execution Handoff

Plan hoàn tất và đã lưu tại `docs/superpowers/plans/2026-08-27-scaffold-backend-nestjs-typescript.md`. Có hai cách thực thi:

**1. Subagent-Driven (khuyến nghị)** - Dispatch một subagent mới cho mỗi task, review giữa các task, lặp nhanh.

**2. Inline Execution** - Thực thi các task trong session này bằng executing-plans, batch execution với checkpoints.

Bạn muốn đi theo hướng nào?
