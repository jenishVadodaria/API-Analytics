import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from './entities/log.entity';
import { User, UserDocument } from './entities/user.entity';
import { Response, Request } from 'express';
import { TimeRangeDto } from './dto/timeRange.dto';
import { CreateLogDto } from './dto/createLog.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Log.name) private logModel: Model<LogDocument>,
  ) {}

  async createLog(
    createLogDto: CreateLogDto,
    req: Request,
    res: Response,
  ): Promise<Response> {
    const userId = createLogDto.userId;
    const shouldFail = Math.random() < 0.1;

    let user = await this.userModel.findOne({ userId });
    const { method, url, headers, body } = req;
    const { statusCode, statusMessage } = res;

    if (!user) {
      user = new this.userModel({ userId });
      await user.save();
    }

    const userObjectId = user._id;
    const status = shouldFail ? 'failure' : 'success';
    const errorMessage = shouldFail ? 'API Log failure' : undefined;

    const createdLog = new this.logModel({
      userId: userObjectId,
      userName: userId,
      timestamp: new Date(),
      status,
      errorMessage,
      request: {
        method,
        url,
        headers,
        body,
      },
      response: {
        statusCode,
        statusMessage,
        headers: res.getHeaders(),
      },
    });
    await createdLog.save();

    if (shouldFail) {
      return res.status(500).json({ message: 'API failure' });
    }

    return res.status(200).json({ message: 'Hello World' });
  }

  async getAnalyticsData(timeRangeDto: TimeRangeDto): Promise<object> {
    const { range, startDate, endDate } = timeRangeDto;

    const dateFilter: Record<string, any> = {};
    let interval;
    if (range === 'last_24_hours') {
      const now = new Date();
      dateFilter.timestamp = {
        $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000),
        $lte: now,
      };
      interval = 60 * 60 * 1000;
    } else if (range === 'last_7_days') {
      const now = new Date();
      dateFilter.timestamp = {
        $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        $lte: now,
      };
      interval = 24 * 60 * 60 * 1000;
    } else if (range === 'custom' && startDate && endDate) {
      dateFilter.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };

      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      interval = (end - start) / 10;
    }

    const intervals = [];
    for (
      let i = dateFilter.timestamp.$gte.getTime();
      i < dateFilter.timestamp.$lte.getTime();
      i += interval
    ) {
      intervals.push({ start: new Date(i), end: new Date(i + interval) });
    }

    const analyticsData = await Promise.all(
      intervals.map(async ({ start, end }) => {
        const intervalFilter = { timestamp: { $gte: start, $lte: end } };

        const uniqueUserCount = await this.logModel
          .distinct('userId', intervalFilter)
          .exec();

        const totalCalls = await this.logModel
          .countDocuments(intervalFilter)
          .exec();

        const totalFailures = await this.logModel
          .countDocuments({ ...intervalFilter, status: 'failure' })
          .exec();

        return {
          time: start.toISOString(),
          users: uniqueUserCount.length,
          calls: totalCalls,
          failures: totalFailures,
        };
      }),
    );

    return { analyticsData };
  }

  async getLogs(): Promise<Log[]> {
    return this.logModel
      .find()
      .select('userId userName timestamp status errorMessage request response')
      .sort({ timestamp: -1 })
      .exec();
  }
}
