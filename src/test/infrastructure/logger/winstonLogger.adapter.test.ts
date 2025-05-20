
import { Logger } from "winston";
import { WinstonLogger } from "../../../config/winstonConfig";
import { customLogFormatter } from "../../../infrastructure/logger/customLogFormatter";

describe("Winston Logger Adapter", () => {
  let winstonLogger: WinstonLogger;

  beforeEach(() => {
    winstonLogger = new WinstonLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should have all logger methods", () => {
    expect(typeof winstonLogger.info).toBe("function");
    expect(typeof winstonLogger.warn).toBe("function");
    expect(typeof winstonLogger.error).toBe("function");
    expect(typeof winstonLogger.debug).toBe("function");
  });

  it("should call underlying logger.info with correct message", () => {
    const spy = jest.spyOn(winstonLogger['logger'], 'info').mockImplementation(() => ({} as any));
    const message = "Test info message";
    winstonLogger.info(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  it("should call underlying logger.warn with correct message", () => {
    const spy = jest.spyOn(winstonLogger['logger'], 'warn').mockImplementation(() => ({} as any));
    const message = "Test warn message";
    winstonLogger.warn(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  it("should call underlying logger.error with correct message", () => {
    const spy = jest.spyOn(winstonLogger['logger'], 'error').mockImplementation(() => ({} as any));
    const message = "Test error message";
    winstonLogger.error(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  it("should call underlying logger.debug with correct message", () => {
    const spy = jest.spyOn(winstonLogger['logger'], 'debug').mockImplementation(() => ({} as any));
    const message = "Test debug message";
    winstonLogger.debug(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  it("should format log messages correctly with customLogFormatter", () => {
    const logObject = {
      level: "info",
      message: "Formatted message",
      timestamp: "2025-04-29T12:34:56.789Z",
    };
    const formattedMessage = customLogFormatter(logObject);
    expect(formattedMessage).toBe("[2025-04-29T12:34:56.789Z] [INFO]: Formatted message");
  });
});
