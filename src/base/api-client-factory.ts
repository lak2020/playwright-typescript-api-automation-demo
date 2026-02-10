import { APIRequestContext } from "@playwright/test";
import { logger } from "./logger";

/**
 * Factory for creating and managing Playwright API request contexts.
 * Provides centralized configuration for all API calls.
 *
 * In Playwright for TypeScript, the APIRequestContext is typically provided
 * by the test fixture via `request`. This factory wraps it for service usage.
 */
export class ApiClientFactory {
  private _request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this._request = request;
    logger.info("API client initialized");
  }

  get requestContext(): APIRequestContext {
    return this._request;
  }
}
