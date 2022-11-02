import validator from 'validator';
import * as crypto from 'crypto';

import LoggerService from '../utils/logger';

const logger = new LoggerService();

export const successResponse = (
  res: any,
  message = 'Operation successful',
  data?: unknown,
  meta?: unknown,
) => {
  return res.status(200).json({
    status: true,
    message,
    payload: data,
    meta,
  });
};

export const errorResponse = (
  res: any,
  message = 'An error occurred',
  data?: unknown,
) => {
  return res.status(400).json({
    status: false,
    message,
    payload: data,
  });
};

export const serviceResponse = ({
  status,
  message,
  data,
}: {
  status: boolean;
  message: string;
  data?: any;
}) => {
  return { status, message, data };
};

export const isIpV4 = (ipAddress: string): boolean => {
  try {
    return validator.isIP(ipAddress, '4');
  } catch (error) {
    logger.error(`isIpV4: ${error}`);
  }
};

export const isObjEmpty = (obj: object): boolean => Object.keys(obj).length < 1;

export const generateSerialNumber = (): string => {
  try {
    return crypto.randomUUID({ disableEntropyCache: true }).toString();
  } catch (error) {
    logger.error(`generateSerialNumber: ${error}`);
  }
};
