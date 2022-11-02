import { ConsoleLogger, LoggerService as NLoggerService } from '@nestjs/common';

class LoggerService extends ConsoleLogger implements NLoggerService {
  log(message: unknown, ...optionalParams: unknown[]) {
    super.log(message, ...optionalParams);
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    super.error(message, ...optionalParams);
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    super.warn(message, ...optionalParams);
  }

  debug(message: unknown, ...optionalParams: unknown[]) {
    super.debug(message, ...optionalParams);
  }

  verbose(message: unknown, ..._optionalParams: unknown[]) {
    super.verbose(message);
  }
}

export default LoggerService;
