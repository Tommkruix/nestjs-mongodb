import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GatewayDto {
  @ApiProperty({
    required: false,
    default: '635d40a1bb8bddc1b86083d0',
    description: 'The auto generated MongoDB id of the gateway',
    type: String,
  })
  readonly _id?: string;

  @ApiProperty({
    required: true,
    default: 'musalaGateway1',
    description: 'The name of the gateway',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    default: '69.89.31.226',
    description: 'The iPv4 of the gateway',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  iPv4: string;

  @ApiProperty({
    required: false,
    default: 'cd6ec6bc-31ad-4f6d-a6f7-2debd7fbd976',
    description: 'The auto-generated serial number of the gateway',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  serialNumber?: string;
}

export class CreateGatewayDto {
  @ApiProperty({
    required: true,
    default: 'musalaGateway1',
    description: 'The name of the gateway',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    default: '69.89.31.226',
    description: 'The iPv4 of the gateway',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  iPv4: string;
}
