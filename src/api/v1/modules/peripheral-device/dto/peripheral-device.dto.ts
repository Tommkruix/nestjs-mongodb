import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

import { StatusType } from '../../../../../core/types';

export class PeripheralDeviceDto {
  @ApiProperty({
    required: false,
    default: '635d40a1bb8bddc1b86083d0',
    description: 'The auto generated MongoDB id of the gateway',
    type: String,
  })
  readonly _id?: string;

  @ApiProperty({
    required: true,
    default: 323457,
    description: 'The UID of the peripheral device',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  uid: number;

  @ApiProperty({
    required: true,
    default: 'musala soft',
    description: 'The vendor of the peripheral device',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  vendor: string;

  @ApiProperty({
    required: true,
    default: '635d40a1bb8bddc1b86083d0',
    description: 'The gateway id of the peripheral device',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  gatewayId: mongoose.Types.ObjectId;

  @ApiProperty({
    required: true,
    default: new Date(),
    description: 'The created date of the peripheral device',
    type: Date,
  })
  @IsDate()
  @IsNotEmpty()
  dateCreated: Date;

  @ApiProperty({
    required: true,
    default: 'online',
    description: 'The status of the peripheral device',
  })
  @IsEnum(StatusType)
  @IsNotEmpty()
  status: StatusType;
}

export class CreatePeripheralDeviceDto {
  @ApiProperty({
    required: true,
    default: 323457,
    description: 'The UID of the peripheral device',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  uid: number;

  @ApiProperty({
    required: true,
    default: 'musala soft',
    description: 'The vendor of the peripheral device',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  vendor: string;

  @ApiProperty({
    required: true,
    default: '635d40a1bb8bddc1b86083d0',
    description: 'The gateway id of the peripheral device',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  gatewayId: mongoose.Types.ObjectId;

  @ApiProperty({
    required: true,
    default: new Date(),
    description: 'The created date of the peripheral device',
    type: Date,
  })
  @IsDate()
  @IsNotEmpty()
  dateCreated: Date;

  @ApiProperty({
    required: true,
    default: 'online',
    description: 'The status of the peripheral device',
  })
  @IsEnum(StatusType)
  @IsNotEmpty()
  status: StatusType;
}
