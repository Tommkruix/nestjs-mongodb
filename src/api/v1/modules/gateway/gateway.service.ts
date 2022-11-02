import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Gateway } from './schema/gateway.schema';
import { GatewayDto } from './dto/gateway.dto';
import { GatewayDoc } from './interface/gateway-document.interface';
import { PeripheralDeviceDoc } from '../peripheral-device/interface/peripheral-device-document.interface';

import {
  generateSerialNumber,
  isIpV4,
  isObjEmpty,
  serviceResponse,
} from '../../../../core/helpers';
import LoggerService from '../../../../core/utils/logger';
import { PeripheralDevice } from '../peripheral-device/schema/peripheral-device.schema';

const TAG = 'gateway.service.ts';

@Injectable()
export class GatewayService {
  constructor(
    @InjectModel(Gateway.name)
    private readonly gatewayModel: Model<GatewayDoc>,
    private readonly logger: LoggerService,
    @InjectModel(PeripheralDevice.name)
    private readonly peripheralDeviceModel: Model<PeripheralDeviceDoc>,
  ) {}

  async create(gateway: GatewayDto) {
    try {
      if (isObjEmpty(gateway))
        return serviceResponse({
          status: false,
          message: 'Gateway data is an empty object',
        });

      if (!isIpV4(gateway.iPv4))
        return serviceResponse({
          status: false,
          message: 'Gateway iPv4 is invalid',
        });

      gateway.serialNumber = generateSerialNumber();
      const createdGateway = await this.gatewayModel.create(gateway);

      return serviceResponse({
        status: true,
        message: 'Gateway created successfully',
        data: createdGateway,
      });
    } catch (error) {
      this.logger.error(`${TAG}: ${error}`);
    }
  }

  async findAll() {
    try {
      const gateways = await this.gatewayModel.find().exec();

      return serviceResponse({
        status: true,
        message: 'Gateways retrieved successfully',
        data: gateways,
      });
    } catch (error) {
      this.logger.error(`${TAG}: ${error}`);
    }
  }

  async findAllWithPeripheralDevices() {
    try {
      const gatewaysWithPeripheralDevices = await this.gatewayModel.aggregate([
        {
          $lookup: {
            from: 'peripheraldevices',
            localField: '_id',
            foreignField: 'gatewayId',
            as: 'peripheralDevices',
          },
        },
      ]);

      return serviceResponse({
        status: true,
        message: 'Gateways with Peripheral devices retrieved successfully',
        data: gatewaysWithPeripheralDevices,
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
          message: 'Gateway id is not a valid MongoDB id',
        });

      const checkId = await this.gatewayModel.findOne({ _id });
      if (!checkId)
        return serviceResponse({
          status: false,
          message: 'Gateway id does not exists',
        });

      const gateway = await this.gatewayModel.findOne({ _id }).exec();

      return serviceResponse({
        status: true,
        message: 'Gateway retrieved successfully',
        data: gateway,
      });
    } catch (error) {
      this.logger.error(`${TAG}: ${error}`);
    }
  }

  async update(gateway: GatewayDto) {
    try {
      const { _id } = gateway;

      if (!_id)
        return serviceResponse({
          status: false,
          message: 'Gateway id is undefined or null',
        });

      if (!mongoose.isValidObjectId(_id))
        return serviceResponse({
          status: false,
          message: 'Gateway id is not a valid MongoDB id',
        });

      const checkId = await this.gatewayModel.findOne({ _id });
      if (!checkId)
        return serviceResponse({
          status: false,
          message: 'Gateway id does not exists',
        });

      const updatedGateway = await this.gatewayModel
        .findOneAndUpdate({ _id }, gateway, { new: true })
        .exec();

      return serviceResponse({
        status: true,
        message: 'Gateway updated successfully',
        data: updatedGateway,
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
          message: 'Gateway id is not a valid MongoDB id',
        });

      const checkId = await this.gatewayModel.findOne({ _id });
      if (!checkId)
        return serviceResponse({
          status: false,
          message: 'Gateway id does not exists',
        });

      await this.gatewayModel.deleteOne({ _id });

      return serviceResponse({
        status: true,
        message: 'Gateway deleted successfully',
        data: {},
      });
    } catch (error) {
      this.logger.error(`${TAG}: ${error}`);
    }
  }
}
