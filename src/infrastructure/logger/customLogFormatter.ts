import { TransformableInfo } from "logform";

export const customLogFormatter = ({ level, label, message, timestamp, layer, stack }: TransformableInfo): string => {
    const environment = process.env.ENV || "development";
    return `[${timestamp}] [${label || "default"}] [${environment}] [${layer || "unknown"}] [${level.toUpperCase()}]: ${message}${stack ? `\nStack: ${stack}` : ""}`;
};
