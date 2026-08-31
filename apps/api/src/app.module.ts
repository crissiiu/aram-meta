import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ChampionsModule } from "./champions/champions.module";

@Module({
  imports: [ChampionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
