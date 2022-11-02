import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GatewayDocument = Gateway & Document;

@Schema()
export class Gateway {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  iPv4: string;

  @Prop({ type: String, required: true })
  serialNumber: string;
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
