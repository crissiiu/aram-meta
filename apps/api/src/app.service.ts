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
