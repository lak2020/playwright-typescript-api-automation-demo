import { test, expect } from "@playwright/test";
import { UserApiService } from "../../src/services";
import { UserResponse } from "../../src/models";
import { AssertionExtensions } from "../../src/utils";

/**
 * Tests for GET /users and GET /users/{id} endpoints.
 * Covers: list users, single user, user data structure, and not found.
 */
test.describe("Get Users @users @get", () => {
  let userService: UserApiService;

  test.beforeAll(async ({ playwright }) => {
    const context = await playwright.request.newContext({
      baseURL: "https://jsonplaceholder.typicode.com",
      extraHTTPHeaders: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    userService = new UserApiService(context);
  });

  test("GET /users returns list of 10 users @smoke", async () => {
    // Act
    const response = await userService.getUsers();

    // Assert
    AssertionExtensions.assertStatusCode(response, 200);

    const users: UserResponse[] = await response.json();
    expect(users).toHaveLength(10);
    for (const user of users) {
      expect(user.id).toBeGreaterThan(0);
      expect(user.name).toBeTruthy();
      expect(user.username).toBeTruthy();
      expect(user.email).toBeTruthy();
    }
  });

  test("GET /users/1 returns user with complete data structure @smoke", async () => {
    // Arrange
    const userId = 1;

    // Act
    const response = await userService.getUserById(userId);

    // Assert
    AssertionExtensions.assertStatusCode(response, 200);

    const user: UserResponse = await response.json();
    expect(user.id).toBe(userId);
    expect(user.name).toBeTruthy();
    expect(user.username).toBeTruthy();
    expect(user.email).toBeTruthy();
    expect(user.phone).toBeTruthy();
    expect(user.website).toBeTruthy();
    expect(user.address).toBeDefined();
    expect(user.company).toBeDefined();
  });

  test("GET /users/999 returns 404 for non-existent user @negative", async () => {
    // Act
    const response = await userService.getUserById(999);

    // Assert
    AssertionExtensions.assertStatusCode(response, 404);
  });

  const testCaseIds = [1, 5, 10];

  for (const userId of testCaseIds) {
    test(`GET /users/${userId} returns matching user`, async () => {
      // Act
      const response = await userService.getUserById(userId);

      // Assert
      AssertionExtensions.assertStatusCode(response, 200);

      const user: UserResponse = await response.json();
      expect(user.id).toBe(userId);
    });
  }
});
