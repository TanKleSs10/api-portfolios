import mongoose from "mongoose";
import { LoggerInterface } from "./winstonConfig";


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
      this.logger.info("MongoDB connected successfully.", {}, "dbConfig");
    } catch (error) {
      this.logger.error("Error connecting to MongoDB:", { error }, "dbConfig");
      throw new Error("MongoDB connection failed.");
    }
  }

  async dbDisconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      this.logger.info("MongoDB disconnected successfully.", {}, "dbConfig");
    } catch (error) {
      this.logger.error("Error disconnecting from MongoDB:", { error }, "dbConfig");
      throw new Error("MongoDB disconnection failed.");
    }
  }
}