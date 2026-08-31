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
