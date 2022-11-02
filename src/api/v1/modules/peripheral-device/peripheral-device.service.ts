import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { PeripheralDevice } from './schema/peripheral-device.schema';
import {
  CreatePeripheralDeviceDto,
  PeripheralDeviceDto,
} from './dto/peripheral-device.dto';
import { PeripheralDeviceDoc } from './interface/peripheral-device-document.interface';
import { Gateway } from '../gateway/schema/gateway.schema';
import { GatewayDoc } from '../gateway/interface/gateway-document.interface';

import { isObjEmpty, serviceResponse } from '../../../../core/helpers';
import LoggerService from '../../../../core/utils/logger';
import { MAXIMUM_ALLOWED_PERIPHERAL_DEVICES_FOR_A_GATEWAY } from '../../../../core/constants';

const TAG = 'peripheral-device.service.ts';

@Injectable()
export class PeripheralDeviceService {
  constructor(
    @InjectModel(PeripheralDevice.name)
    private readonly peripheralDeviceModel: Model<PeripheralDeviceDoc>,
    private readonly logger: LoggerService,
    @InjectModel(Gateway.name)
    private readonly gatewayModel: Model<GatewayDoc>,
  ) {}

  async create(peripheralDevice: CreatePeripheralDeviceDto) {
    try {
      if (isObjEmpty(peripheralDevice))
        return serviceResponse({
          status: false,
          message: 'Peripheral Device data is an empty object',
        });

      const checkGatewayId = await this.gatewayModel.findOne({
        _id: peripheralDevice.gatewayId,
      });
      if (!checkGatewayId)
        return serviceResponse({
          status: false,
          message:
            'Gateway Id attached to this Peripheral device does not exists',
        });

      peripheralDevice.dateCreated = new Date();
      peripheralDevice.gatewayId = new mongoose.Types.ObjectId(
        peripheralDevice.gatewayId,
      );

      const checkTotalGatewayForPeripheralDevice =
        await this.peripheralDeviceModel.count({
          gatewayId: peripheralDevice.gatewayId,
        });
      if (
        checkTotalGatewayForPeripheralDevice >
        MAXIMUM_ALLOWED_PERIPHERAL_DEVICES_FOR_A_GATEWAY
      )
        return serviceResponse({
          status: false,
          message:
            'Maximum number of Peripheral devices for a Gateway has been reached',
        });

      const createdPeripheralDevice = await this.peripheralDeviceModel.create(
        peripheralDevice,
      );

      return serviceResponse({
        status: true,
        message: 'Peripheral Device created successfully',
        data: createdPeripheralDevice,
      });
    } catch (error) {
      this.logger.error(`${TAG}: ${error}`);
    }
  }

  async findAll() {
    try {
      const peripheralDevices = await this.peripheralDeviceModel.find().exec();

      return serviceResponse({
        status: true,
        message: 'Peripheral Devices retrieved successfully',
        data: peripheralDevices,
      });
    } catch (error) {
      this.logger.error(`${TAG}: ${error}`);
    }
  }

  async findOneById(_id: string) {
    try {
      if (!mongoose.isValidObjectId(_id))
        return serviceResponse({
          status: false,
          message: 'Peripheral Device id is not a valid MongoDB id',
        });

      const checkId = await this.peripheralDeviceModel.findOne({ _id });
      if (!checkId)
        return serviceResponse({
          status: false,
          message: 'Peripheral Device id does not exists',
        });

      const peripheralDevice = await this.peripheralDeviceModel.findOne({
        _id,
      });

      return serviceResponse({
        status: true,
        message: 'Peripheral Device retrieved successfully',
        data: peripheralDevice,
      });
    } catch (error) {
      this.logger.error(`${TAG}: ${error}`);
    }
  }

  async update(peripheralDevice: PeripheralDeviceDto) {
    try {
      const { _id } = peripheralDevice;

      if (!_id)
        return serviceResponse({
          status: false,
          message: 'Peripheral Device id is undefined or null',
        });

      if (!mongoose.isValidObjectId(_id))
        return serviceResponse({
          status: false,
          message: 'Peripheral Device id is not a valid MongoDB id',
        });

      const checkId = await this.peripheralDeviceModel.findOne({ _id }).exec();
      if (!checkId)
        return serviceResponse({
          status: false,
          message: 'Peripheral Device id does not exists',
        });

      if (!mongoose.isValidObjectId(peripheralDevice.gatewayId))
        return serviceResponse({
          status: false,
          message: 'Gateway id is not a valid MongoDB id',
        });

      const checkGatewayId = await this.gatewayModel.findOne({
        _id: peripheralDevice.gatewayId,
      });
      if (!checkGatewayId)
        return serviceResponse({
          status: false,
          message:
            'Gateway Id attached to this Peripheral device does not exists',
        });

      const updatedPeripheralDevice = await this.peripheralDeviceModel
        .findOneAndUpdate({ _id }, peripheralDevice, { new: true })
        .exec();

      return serviceResponse({
        status: true,
        message: 'Peripheral Device updated successfully',
        data: updatedPeripheralDevice,
      });
    } catch (error) {
      this.logger.error(`${TAG}: ${error}`);
    }
  }

  async delete(_id: string) {
    try {
      if (!mongoose.isValidObjectId(_id))
        return serviceResponse({
          status: false,
          message: 'Peripheral Device id is not a valid MongoDB id',
        });

      const checkId = await this.peripheralDeviceModel.findOne({ _id });
      if (!checkId)
        return serviceResponse({
          status: false,
          message: 'Peripheral Device id does not exists',
        });

      await this.peripheralDeviceModel.deleteOne({ _id });

      return serviceResponse({
        status: true,
        message: 'Peripheral Device deleted successfully',
        data: {},
      });
    } catch (error) {
      this.logger.error(`${TAG}: ${error}`);
    }
  }
}
