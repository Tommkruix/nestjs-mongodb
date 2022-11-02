import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { StatusType } from '../../../../../core/types';

export type PeripheralDeviceDocument = PeripheralDevice & Document;

@Schema()
export class PeripheralDevice {
  @Prop({ type: Number, required: true })
  uid: number;

  @Prop({ type: String, required: true })
  vendor: string;

  @Prop({ required: true })
  gatewayId: mongoose.Types.ObjectId;

  @Prop({ type: Date, required: true })
  dateCreated: Date;

  @Prop({ type: String, required: true })
  status: StatusType;
}

export const PeripheralDeviceSchema =
  SchemaFactory.createForClass(PeripheralDevice);
