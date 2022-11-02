import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { createMock } from '@golevelup/ts-jest';
import { Model, Query } from 'mongoose';

import { GatewayService } from './gateway.service';
import { GatewayDoc } from './interface/gateway-document.interface';
import { Gateway } from './schema/gateway.schema';
import { PeripheralDeviceService } from '../peripheral-device/peripheral-device.service';
import { PeripheralDevice } from '../peripheral-device/schema/peripheral-device.schema';

import LoggerService from '../../../../core/utils/logger';

const mockGateway = (
  name = 'musalaGateway',
  iPv4 = '69.89.31.226',
  serialNumber = 'randomstring1',
): Gateway => ({
  name,
  iPv4,
  serialNumber,
});

const mockGatewayDoc = (mock?: Partial<Gateway>): Partial<GatewayDoc> => ({
  name: mock?.name || 'musalaGateway',
  iPv4: mock?.iPv4 || '69.89.31.226',
  serialNumber: mock?.serialNumber || 'randomstring1',
});

const gatewayDocArray = [
  mockGatewayDoc(),
  mockGatewayDoc({
    name: 'musalaGateway',
    iPv4: '69.89.31.226',
    serialNumber: 'randomstring1',
  }),
  mockGatewayDoc({
    name: 'tommyGateway',
    iPv4: '69.89.32.226',
    serialNumber: 'randomstring2',
  }),
];

describe('Gateway', () => {
  let service: GatewayService;
  let model: Model<GatewayDoc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GatewayService,
        LoggerService,
        PeripheralDeviceService,
        {
          provide: getModelToken(Gateway.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockGateway()),
            constructor: jest.fn().mockResolvedValue(mockGateway()),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            create: jest.fn(),
            deleteOne: jest.fn(),
            exec: jest.fn(),
          },
        },
        {
          provide: getModelToken(PeripheralDevice.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<GatewayService>(GatewayService);
    model = module.get<Model<GatewayDoc>>(getModelToken('Gateway'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all gateways', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(gatewayDocArray),
    } as any);
    const gateways = await service.findAll();
    expect(gateways.data).toEqual(gatewayDocArray);
  });

  it('should not find one by id', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<Query<GatewayDoc, GatewayDoc>>({
        exec: jest.fn().mockResolvedValueOnce(
          mockGatewayDoc({
            name: 'musalaGateway',
            iPv4: '69.89.31.226',
            serialNumber: 'randomstring1',
          }),
        ),
      }),
    );

    const foundGateway = await service.findOneById('an id');

    expect(foundGateway.status).toEqual(false);
    expect(foundGateway.data).toEqual(undefined);
  });

  it('should create a new gateway', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'musalaGateway',
        iPv4: '69.89.31.226',
        serialNumber: 'randomstring1',
      }),
    );

    const newGateway = await service.create({
      name: 'musalaGateway',
      iPv4: '69.89.31.226',
      serialNumber: 'randomstring1',
    });
    expect(newGateway.status).toEqual(true);
    expect(newGateway.data).toEqual(
      mockGateway('musalaGateway', '69.89.31.226', 'randomstring1'),
    );
  });

  it('should not update a gateway', async () => {
    jest.spyOn(model, 'findOneAndUpdate').mockReturnValueOnce(
      createMock<Query<GatewayDoc, GatewayDoc>>({
        exec: jest.fn().mockResolvedValueOnce({
          _id: 'mongoDbId',
          name: 'musalaGateway',
          iPv4: '69.89.31.226',
          serialNumber: 'randomstring1',
        }),
      }) as any,
    );
    const updatedGateway = await service.update({
      _id: 'mongoDbId',
      name: 'musalaGateway',
      iPv4: '69.89.31.226',
      serialNumber: 'randomstring1',
    });
    expect(updatedGateway.status).toEqual(false);
    expect(updatedGateway.data).toEqual(undefined);
  });

  it('should not delete a gateway', async () => {
    jest.spyOn(model, 'deleteOne').mockResolvedValueOnce(true as any);

    const deletedGateway = await service.delete('mongoDbId');

    expect(deletedGateway.status).toEqual(false);
    expect(deletedGateway.data).toEqual(undefined);
  });
});
