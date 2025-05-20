import { createLogger, format, transports, Logger } from "winston";
import { customLogFormatter } from "../infrastructure/logger/customLogFormatter";
import { isProd } from "./envs";
import DailyRotateFile from "winston-daily-rotate-file";

export interface LoggerInterface {
  info(message: string, context?: Record<string, any> | Error, layer?: string): void;
  warn(message: string, context?: Record<string, any> | Error, layer?: string): void;   
  error(message: string, context?: Record<string, any> | Error, layer?: string): void;
  debug?(message: string, context?: Record<string, any> | Error, layer?: string): void;
}

export class WinstonLogger implements LoggerInterface {
  private readonly isProduction: boolean = isProd;
  private logger: Logger;

  constructor(loggerInstance?: Logger) {
    this.logger =
      loggerInstance ||
      createLogger({
        level: this.isProduction ? "info" : "debug",
        format: this.isProduction
          ? format.combine(
              format.errors({ stack: true }), // Incluye el stack trace
              format.timestamp(),
              format.json()
            )
          : format.combine(
              format.errors({ stack: true }),
              format.label({ label: "Quantum API" }),
              format.timestamp(),
              format.printf(customLogFormatter)
            ),
        transports: [
          new transports.Console(),
          new DailyRotateFile({
            filename: "logs/application-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxSize: "20m",
            maxFiles: "14d",
          }),
          new transports.File({ filename: "logs/error.log", level: "error" }),
          new transports.File({ filename: "logs/combined.log" }),
        ],
        exceptionHandlers: [
          new transports.File({ filename: "logs/exceptions.log" }),
        ],
        rejectionHandlers: [
          new transports.File({ filename: "logs/rejections.log" }),
        ],
      });
  }

  private normalizeContext(contextOrError?: Record<string, any> | Error): Record<string, any> {
    if (!contextOrError) return {};

    if (contextOrError instanceof Error) {
        return {
            message: contextOrError.message,
            stack: contextOrError.stack,
        };
    }

    if (contextOrError.error instanceof Error) {
        return {
            ...contextOrError,
            errorMessage: contextOrError.error.message,
            errorStack: contextOrError.error.stack,
        };
    }

    return contextOrError;
  }

  info(message: string, context?: Record<string, any> | Error, layer = "default"): void {
    this.logger.info(message, { ...this.normalizeContext(context), layer });
  }

  warn(message: string, context?: Record<string, any> | Error, layer = "default"): void {
    this.logger.warn(message, { ...this.normalizeContext(context), layer });
  }

  error(message: string, context?: Record<string, any> | Error, layer = "default"): void {
    this.logger.error(message, { ...this.normalizeContext(context), layer });
  }

  debug(message: string, context?: Record<string, any> | Error, layer = "default"): void {
    this.logger.debug(message, { ...this.normalizeContext(context), layer });
  }
}