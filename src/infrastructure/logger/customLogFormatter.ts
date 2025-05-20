import { TransformableInfo } from "logform";

export const customLogFormatter = ({ level, label, message, timestamp }: TransformableInfo): string => {
  const environment = process.env.ENV || "development";
  return `[${timestamp}] [${environment}] [${label || "default"}] [${level.toUpperCase()}]: ${message}`;
};