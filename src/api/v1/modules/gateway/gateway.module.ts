import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { Gateway, GatewaySchema } from './schema/gateway.schema';
import { PeripheralDeviceService } from '../peripheral-device/peripheral-device.service';

import LoggerService from '../../../../core/utils/logger';
import {
  PeripheralDevice,
  PeripheralDeviceSchema,
} from '../peripheral-device/schema/peripheral-device.schema';
import { PeripheralDeviceModule } from '../peripheral-device/peripheral-device.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Gateway.name, schema: GatewaySchema },
      { name: PeripheralDevice.name, schema: PeripheralDeviceSchema },
    ]),
  ],
  controllers: [GatewayController],
  providers: [LoggerService, GatewayService, PeripheralDeviceModule],
  exports: [GatewayService],
})
export class GatewayModule {}
