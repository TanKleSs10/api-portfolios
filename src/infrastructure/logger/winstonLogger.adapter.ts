import { createLogger, format, transports, Logger } from "winston";
import { TransformableInfo } from "logform";

export interface LoggerInterface {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  debug?(message: string): void;
}




export const customLogFormatter = ({ level, message, timestamp }: TransformableInfo) : string => {
  return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
};

export class WinstonLogger implements LoggerInterface {
  private logger: Logger;

  constructor(loggerInstance?: Logger) {
    this.logger =
      loggerInstance ||
      createLogger({
        level: "info",
        format: format.combine(format.timestamp(), format.printf(customLogFormatter)),
        transports: [new transports.Console()],
      });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}
