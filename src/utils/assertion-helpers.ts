import { APIResponse, expect } from "@playwright/test";
import { logger } from "../base";

/**
 * Assert that the response has the expected status code.
 */
export function assertStatusCode(
  response: APIResponse,
  expectedStatusCode: number
): void {
  logger.info(
    `Response status: ${response.status()} (expected: ${expectedStatusCode})`
  );
  expect(response.status()).toBe(expectedStatusCode);
}

/**
 * Assert that the response has a specific header value.
 */
export function assertHeader(
  response: APIResponse,
  headerName: string,
  expectedValue: string
): void {
  const headers = response.headers();
  const actualValue = headers[headerName.toLowerCase()];
  expect(actualValue).toBeDefined();
  expect(actualValue).toContain(expectedValue);
}

/**
 * Assert that the response content type is JSON.
 */
export function assertJsonContentType(response: APIResponse): void {
  const contentType = response.headers()["content-type"];
  expect(contentType).toBeDefined();
  expect(contentType).toContain("application/json");
}

/**
 * Assert that response was successful (2xx status code).
 */
export function assertSuccessful(response: APIResponse): void {
  const status = response.status();
  expect(status).toBeGreaterThanOrEqual(200);
  expect(status).toBeLessThan(300);
}

/**
 * Assert response body contains specific text.
 */
export async function assertBodyContains(
  response: APIResponse,
  expectedText: string
): Promise<void> {
  const body = await response.text();
  expect(body).toContain(expectedText);
}

/**
 * Log and return response details for debugging.
 */
export async function logResponse(response: APIResponse): Promise<string> {
  const body = await response.text();
  logger.info(`Response [${response.status()}]: ${body}`);
  return body;
}
