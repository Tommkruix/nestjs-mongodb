import { Document } from 'mongoose';

export interface GatewayDoc extends Document {
  name: string;

  iPv4: string;

  serialNumber: string;
}
