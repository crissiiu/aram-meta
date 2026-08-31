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
