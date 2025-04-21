import mongoose from "mongoose";
import { LoggerInterface } from "../infrastructure/logger/winstonLogger.adapter";

interface Options {
  MONGODB_URI: string;
  logger: LoggerInterface;
}

export class DbConfig {
  private readonly uri: string;
  private readonly logger: LoggerInterface;

  constructor(options: Options) { 
    this.uri = options.MONGODB_URI;
    this.logger = options.logger;
  }

  async dbConnection(): Promise<void> {
    try {
      await mongoose.connect(this.uri);
      this.logger.info("🟢 MongoDB connected successfully.");
    } catch (error) {
      this.logger.error("🔴 Error connecting to MongoDB:" + error);
      throw new Error("MongoDB connection failed.");
    }
  }
}
