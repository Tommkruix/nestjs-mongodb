import mongoose from 'mongoose';

import { StatusType } from '../../../../../core/types';

export interface Gateway {
  _id: string;

  uid: number;

  vendor: string;

  gatewayId: mongoose.Types.ObjectId;

  dateCreated: Date;

  status: StatusType;
}
