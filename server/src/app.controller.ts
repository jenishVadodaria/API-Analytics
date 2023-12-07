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
  async getGraphAnalyticsData(
    @Query() timeRangeDto: TimeRangeDto,
  ): Promise<object> {
    return this.appService.getGraphAnalyticsData(timeRangeDto);
  }

  @Get('logs')
  async getLogs(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query() timeRangeDto: TimeRangeDto,
  ) {
    return this.appService.getLogs(
      timeRangeDto,
      Number(limit) || 10,
      Number(offset) || 0,
    );
  }

  @Get('total-analytics')
  async getTotalAnalyticsData(@Query() timeRangeDto: TimeRangeDto) {
    return this.appService.getTotalAnalyticsData(timeRangeDto);
  }
}
