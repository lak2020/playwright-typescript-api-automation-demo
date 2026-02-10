import { test, expect } from "@playwright/test";
import { PostApiService } from "../../src/services";
import { PostResponse, UpdatePostRequest } from "../../src/models";
import { assertStatusCode, generateUpdatePostRequest } from "../../src/utils";

/**
 * Tests for PUT and PATCH /posts/{id} endpoints.
 * Covers: full update, partial update, and response validation.
 */
test.describe("Update Posts @posts @put @patch", () => {
  let postService: PostApiService;

  test.beforeEach(async ({ request }) => {
    postService = new PostApiService(request);
  });

  test("PUT /posts/{id} fully updates a post and returns 200 @smoke", async () => {
    // Arrange
    const postId = 1;
    const updateData: UpdatePostRequest = {
      title: "Updated Title",
      body: "Updated body content",
      userId: 1,
    };

    // Act
    const response = await postService.updatePost(postId, updateData);

    // Assert
    assertStatusCode(response, 200);

    const result: PostResponse = await response.json();
    expect(result.id).toBe(postId);
    expect(result.title).toBe(updateData.title);
    expect(result.body).toBe(updateData.body);
    expect(result.userId).toBe(updateData.userId);
  });

  test("PATCH /posts/{id} partially updates a post @smoke", async () => {
    // Arrange
    const postId = 1;
    const patchData = { title: "Patched Title Only" };

    // Act
    const response = await postService.patchPost(postId, patchData);

    // Assert
    assertStatusCode(response, 200);

    const result: PostResponse = await response.json();
    expect(result.id).toBe(postId);
    expect(result.title).toBe("Patched Title Only");
    // Body and userId should still exist (not cleared)
    expect(result.userId).toBeGreaterThan(0);
  });

  test("PUT /posts/{id} with random data updates correctly", async () => {
    // Arrange
    const postId = 5;
    const updateData = generateUpdatePostRequest();

    // Act
    const response = await postService.updatePost(postId, updateData);

    // Assert
    assertStatusCode(response, 200);

    const result: PostResponse = await response.json();
    expect(result.id).toBe(postId);
    expect(result.title).toBe(updateData.title);
    expect(result.body).toBe(updateData.body);
  });
});
