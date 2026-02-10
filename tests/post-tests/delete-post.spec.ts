import { test } from "@playwright/test";
import { PostApiService } from "../../src/services";
import { AssertionExtensions } from "../../src/utils";

/**
 * Tests for DELETE /posts/{id} endpoint.
 */
test.describe("Delete Posts @posts @delete", () => {
  let postService: PostApiService;

  test.beforeAll(async ({ playwright }) => {
    const context = await playwright.request.newContext({
      baseURL: "https://jsonplaceholder.typicode.com",
      extraHTTPHeaders: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    postService = new PostApiService(context);
  });

  test("DELETE /posts/{id} deletes a post and returns 200 @smoke", async () => {
    // Arrange
    const postId = 1;

    // Act
    const response = await postService.deletePost(postId);

    // Assert
    AssertionExtensions.assertStatusCode(response, 200);
  });

  const testCaseIds = [1, 50, 100];

  for (const postId of testCaseIds) {
    test(`DELETE /posts/${postId} returns 200`, async () => {
      // Act
      const response = await postService.deletePost(postId);

      // Assert
      AssertionExtensions.assertStatusCode(response, 200);
    });
  }
});
