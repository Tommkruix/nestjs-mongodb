import mongoose, { Document } from 'mongoose';

import { StatusType } from '../../../../../core/types';

export interface PeripheralDeviceDoc extends Document {
  uid: number;

  vendor: string;

  gatewayId: mongoose.Types.ObjectId;

  dateCreated: Date;

  status: StatusType;
}
