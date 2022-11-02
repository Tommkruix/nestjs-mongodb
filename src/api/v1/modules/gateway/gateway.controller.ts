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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CreateGatewayDto, GatewayDto } from './dto/gateway.dto';
import { GatewayService } from './gateway.service';

import { errorResponse, successResponse } from '../../../../core/helpers';

@ApiTags('Gateway')
@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @ApiOperation({
    summary: 'This endpoint is used to create a new gateway',
  })
  @Post()
  async create(@Body() createGateway: CreateGatewayDto, @Response() res?) {
    const { status, message, data } = await this.gatewayService.create(
      createGateway,
    );

    if (!status) return errorResponse(res, message);
    return successResponse(res, message, data);
  }

  @ApiOperation({
    summary:
      'This endpoint is used to retrieve gateways without peripheral devices information',
  })
  @Get()
  async findAll(@Response() res?) {
    const { status, message, data } = await this.gatewayService.findAll();

    if (!status) return errorResponse(res, message);
    return successResponse(res, message, data);
  }

  @ApiOperation({
    summary:
      'This endpoint is used to retrieve gateways with peripheral devices information',
  })
  @Get('peripheral-devices')
  async findAllWithPeripheralDevices(@Response() res?) {
    const { status, message, data } =
      await this.gatewayService.findAllWithPeripheralDevices();

    if (!status) return errorResponse(res, message);
    return successResponse(res, message, data);
  }

  @ApiOperation({
    summary: 'This endpoint is used to retrieve a gateway with an id',
  })
  @Get(':id')
  async findOneById(@Param('id') id: string, @Response() res?) {
    const { status, message, data } = await this.gatewayService.findOneById(id);

    if (!status) return errorResponse(res, message);
    return successResponse(res, message, data);
  }

  @ApiOperation({
    summary:
      'This endpoint is used to update an existing gateway with the _id inside the body',
  })
  @Put()
  async update(@Body() gateway: GatewayDto, @Response() res?) {
    const { status, message, data } = await this.gatewayService.update(gateway);

    if (!status) return errorResponse(res, message);
    return successResponse(res, message, data);
  }

  @ApiOperation({
    summary: 'This endpoint is used to delete a gateway with an id',
  })
  @Delete(':id')
  async delete(@Param('id') id: string, @Response() res?) {
    const { status, message, data } = await this.gatewayService.delete(id);

    if (!status) return errorResponse(res, message);
    return successResponse(res, message, data);
  }
}
