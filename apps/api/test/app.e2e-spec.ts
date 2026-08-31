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

  it("GET /champions/demo returns demo champion data", async () => {
    await request(app.getHttpServer())
      .get("/champions/demo")
      .expect(200)
      .expect(({ body }) => {
        expect(body.data).toHaveLength(3);
        expect(body.data[0]).toMatchObject({
          slug: "jinx",
          name: "Jinx",
          tier: "S",
          winRate: 54.2,
        });
        expect(body.meta).toMatchObject({
          patch: "16.17",
          region: "VN",
          source: "demo",
        });
      });
  });

  it("GET /champions/demo/:slug returns one demo champion", async () => {
    await request(app.getHttpServer())
      .get("/champions/demo/lux")
      .expect(200)
      .expect(({ body }) => {
        expect(body.data).toMatchObject({
          slug: "lux",
          name: "Lux",
          role: "Pháp sư cấu rỉa",
        });
        expect(body.data.recommendedBuild).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              slot: "core",
              name: "Bão Tố Luden",
            }),
          ]),
        );
      });
  });
});
