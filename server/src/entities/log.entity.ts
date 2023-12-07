/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type LogDocument = Log & Document;

@Schema()
export class Log {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  userName: string;

  @Prop({ default: Date.now, required: true, index: true })
  timestamp: Date;

  @Prop()
  status: string;

  @Prop()
  errorMessage: string;

  @Prop({ type: Object })
  request: object;

  @Prop({ type: Object })
  response: object;
}

export const LogSchema = SchemaFactory.createForClass(Log);
