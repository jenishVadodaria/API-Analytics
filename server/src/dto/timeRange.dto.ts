/* eslint-disable prettier/prettier */

import { IsEnum, IsOptional, IsString } from 'class-validator';

enum TimeRange {
  Last24Hours = 'last_24_hours',
  Last7Days = 'last_7_days',
  Custom = 'custom',
}

export class TimeRangeDto {
  @IsEnum(TimeRange)
  range: TimeRange;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;
}
