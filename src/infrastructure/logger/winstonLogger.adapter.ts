import { createLogger, format, transports } from "winston";

export interface LoggerInterface {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    debug?(message: string): void;
  }
  

export class WinstonLogger implements LoggerInterface {
  private logger;

  constructor() {
    this.logger = createLogger({
      level: "info",
      format: format.combine(
        format.timestamp(),
        format.printf(({ level, message, timestamp }) => {
          return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
        })
      ),
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
