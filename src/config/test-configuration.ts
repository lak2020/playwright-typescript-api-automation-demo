import * as fs from "fs";
import * as path from "path";

/**
 * Application settings interface matching appsettings.json structure.
 */
interface AppSettings {
  ApiSettings: {
    BaseUrl: string;
    Timeout: number;
    RetryCount: number;
    Headers: Record<string, string>;
  };
  Logging: {
    LogDirectory: string;
    LogLevel: string;
  };
  Allure: {
    ResultsDirectory: string;
  };
}

/**
 * Centralized configuration management using appsettings.json and environment variables.
 */
class TestConfigurationClass {
  private settings: AppSettings;

  constructor() {
    const configPath = path.resolve(__dirname, "../../appsettings.json");
    const configData = fs.readFileSync(configPath, "utf-8");
    this.settings = JSON.parse(configData) as AppSettings;
  }

  get baseUrl(): string {
    return (
      process.env.BASE_URL ||
      this.settings.ApiSettings.BaseUrl ||
      "https://jsonplaceholder.typicode.com"
    );
  }

  get timeout(): number {
    return (
      Number(process.env.API_TIMEOUT) || this.settings.ApiSettings.Timeout || 30000
    );
  }

  get retryCount(): number {
    return (
      Number(process.env.RETRY_COUNT) || this.settings.ApiSettings.RetryCount || 2
    );
  }

  get logDirectory(): string {
    return this.settings.Logging.LogDirectory || "logs";
  }

  get logLevel(): string {
    return process.env.LOG_LEVEL || this.settings.Logging.LogLevel || "info";
  }

  getCustomHeader(key: string): string {
    return this.settings.ApiSettings.Headers?.[key] ?? "";
  }
}

export const TestConfiguration = new TestConfigurationClass();
