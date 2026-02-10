import * as winston from "winston";
import * as path from "path";
import { TestConfiguration } from "../config";

/**
 * Centralized logger using Winston.
 * Provides console + file logging similar to Serilog in the C# version.
 */
const logger = winston.createLogger({
  level: TestConfiguration.logLevel,
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp} ${level.toUpperCase().padEnd(5)}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "HH:mm:ss" }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${timestamp} ${level}] ${message}`;
        })
      ),
    }),
    new winston.transports.File({
      filename: path.join(TestConfiguration.logDirectory, "test-log.txt"),
      maxsize: 5_242_880, // 5MB
      maxFiles: 5,
    }),
  ],
});

export { logger };
