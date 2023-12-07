import { Controller, Get, Post, Body, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { TimeRangeDto } from './dto/timeRange.dto';
import { CreateLogDto } from './dto/createLog.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('log')
  async createLog(
    @Body() createLogDto: CreateLogDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.appService.createLog(createLogDto, req, res);
  }

  @Get('analytics-data')
  async getAnalyticsData(@Query() timeRangeDto: TimeRangeDto): Promise<object> {
    return this.appService.getAnalyticsData(timeRangeDto);
  }

  @Get('logs')
  async getLogs() {
    return this.appService.getLogs();
  }
}
