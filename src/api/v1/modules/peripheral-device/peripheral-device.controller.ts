import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Response,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  CreatePeripheralDeviceDto,
  PeripheralDeviceDto,
} from './dto/peripheral-device.dto';
import { PeripheralDeviceService } from './peripheral-device.service';

import { errorResponse, successResponse } from '../../../../core/helpers';

@ApiTags('Peripheral Device')
@Controller('peripheral-device')
export class PeripheralDeviceController {
  constructor(
    private readonly peripheralDeviceService: PeripheralDeviceService,
  ) {}

  @ApiOperation({
    summary:
      'This endpoint is used to create a new peripheral device in addition with the gateway id',
  })
  @Post()
  async create(
    @Body() createPeripheralDevice: CreatePeripheralDeviceDto,
    @Response() res,
  ) {
    const { status, message, data } = await this.peripheralDeviceService.create(
      createPeripheralDevice,
    );

    if (!status) return errorResponse(res, message);
    return successResponse(res, message, data);
  }

  @ApiOperation({
    summary: 'This endpoint is used to retrieve peripheral devices',
  })
  @Get()
  async findAll(@Response() res) {
    const { status, message, data } =
      await this.peripheralDeviceService.findAll();

    if (!status) return errorResponse(res, message);
    return successResponse(res, message, data);
  }

  @ApiOperation({
    summary: 'This endpoint is used to retrieve a peripheral device with an id',
  })
  @Get(':id')
  async findOneById(@Param('id') id: string, @Response() res) {
    const { status, message, data } =
      await this.peripheralDeviceService.findOneById(id);

    if (!status) return errorResponse(res, message);
    return successResponse(res, message, data);
  }

  @ApiOperation({
    summary:
      'This endpoint is used to update an existing peripheral device with the _id inside the body',
  })
  @Put()
  async update(@Body() peripheralDevice: PeripheralDeviceDto, @Response() res) {
    const { status, message, data } = await this.peripheralDeviceService.update(
      peripheralDevice,
    );

    if (!status) return errorResponse(res, message);
    return successResponse(res, message, data);
  }

  @ApiOperation({
    summary: 'This endpoint is used to delete a peripheral device with an id',
  })
  @Delete(':id')
  async delete(@Param('id') id: string, @Response() res) {
    const { status, message, data } = await this.peripheralDeviceService.delete(
      id,
    );

    if (!status) return errorResponse(res, message);
    return successResponse(res, message, data);
  }
}
