import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PeripheralDeviceController } from './peripheral-device.controller';
import { PeripheralDeviceService } from './peripheral-device.service';
import {
  PeripheralDevice,
  PeripheralDeviceSchema,
} from './schema/peripheral-device.schema';
import { GatewayService } from '../gateway/gateway.service';
import { Gateway, GatewaySchema } from '../gateway/schema/gateway.schema';

import LoggerService from '../../../../core/utils/logger';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PeripheralDevice.name, schema: PeripheralDeviceSchema },
      { name: Gateway.name, schema: GatewaySchema },
    ]),
  ],
  controllers: [PeripheralDeviceController],
  providers: [LoggerService, PeripheralDeviceService, GatewayService],
  exports: [PeripheralDeviceService],
})
export class PeripheralDeviceModule {}
