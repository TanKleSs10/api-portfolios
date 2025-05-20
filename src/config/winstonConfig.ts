import { createLogger, format, transports, Logger } from "winston";
import { customLogFormatter } from "../infrastructure/logger/customLogFormatter";
import { isProd } from "./envs";
import DailyRotateFile from "winston-daily-rotate-file";

export interface LoggerInterface {
  info(message: string, context?: Record<string, any>, label?: string): void;
  warn(message: string, context?: Record<string, any>, label?: string): void;   
  error(message: string, context?: Record<string, any>, label?: string): void;
  debug?(message: string, context?: Record<string, any>, label?: string): void;
}

export class WinstonLogger implements LoggerInterface { 
  private readonly isProduction: boolean = isProd;
  private logger: Logger;

  constructor(loggerInstance?: Logger) {
    this.logger =
      loggerInstance ||
      createLogger({
        level: this.isProduction ? "info" : "debug",
        format: this.isProduction ? 
            format.combine(format.timestamp(), format.json()) :
            format.combine(format.label({ label: "MyApp" }), format.combine(format.timestamp(), format.printf(customLogFormatter))),
        transports: [
          new transports.Console(),
          new DailyRotateFile({
            filename: "logs/application-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxSize: "20m",
            maxFiles: "14d",
          }),
          new transports.File({ filename: "logs/error.log", level: "error" }),
          new transports.File({ filename: "logs/combined.log" })
        ],
        exceptionHandlers: [
          new transports.File({ filename: "logs/exceptions.log" })
        ],
        rejectionHandlers: [
          new transports.File({ filename: "logs/rejections.log" })
        ]
      });
  }

  info(message: string, context?: Record<string, any>, label?: string): void {
    this.logger.info({message, ...context, label});
  }

  warn(message: string, context?: Record<string, any>, label?: string): void {
    this.logger.warn({message, ...context, label});
  }

  error(message: string, context?: Record<string, any>, label?: string): void {
    this.logger.error({message, ...context, label});
  }

  debug(message: string, context?: Record<string, any>, label?: string): void {
    this.logger.debug({message, ...context, label});
  }
}
