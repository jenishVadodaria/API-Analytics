/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLogDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
