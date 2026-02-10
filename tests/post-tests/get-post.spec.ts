import { test, expect, APIRequestContext } from "@playwright/test";
import { PostApiService } from "../../src/services";
import { PostResponse } from "../../src/models";
import { AssertionExtensions } from "../../src/utils";
import { logger } from "../../src/base";

/**
 * Tests for GET /posts and GET /posts/{id} endpoints.
 * Covers: list posts, single post, filter by user, nested comments, and not found.
 */
test.describe("Get Posts @posts @get", () => {
  let postService: PostApiService;

  test.beforeEach(async ({ request }) => {
    postService = new PostApiService(request);
  });

  test("GET /posts returns list of 100 posts @smoke", async () => {
    // Act
    const response = await postService.getPosts();

    // Assert
    AssertionExtensions.assertStatusCode(response, 200);

    const posts: PostResponse[] = await response.json();
    expect(posts).toHaveLength(100);
    for (const post of posts) {
      expect(post.id).toBeGreaterThan(0);
      expect(post.userId).toBeGreaterThan(0);
      expect(post.title).toBeTruthy();
      expect(post.body).toBeTruthy();
    }
  });

  test("GET /posts/1 returns a single post with correct data @smoke", async () => {
    // Arrange
    const postId = 1;

    // Act
    const response = await postService.getPostById(postId);

    // Assert
    AssertionExtensions.assertStatusCode(response, 200);

    const post: PostResponse = await response.json();
    expect(post.id).toBe(postId);
    expect(post.userId).toBeGreaterThan(0);
    expect(post.title).toBeTruthy();
    expect(post.body).toBeTruthy();
  });

  test("GET /posts/999 returns 404 for non-existent post @negative", async () => {
    // Act
    const response = await postService.getPostById(999);

    // Assert
    AssertionExtensions.assertStatusCode(response, 404);
  });

  test("GET /posts?userId=1 returns only posts for user 1", async () => {
    // Arrange
    const userId = 1;

    // Act
    const response = await postService.getPostsByUserId(userId);

    // Assert
    AssertionExtensions.assertStatusCode(response, 200);

    const posts: PostResponse[] = await response.json();
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post.userId).toBe(userId);
    }
  });

  test("GET /posts/1/comments returns comments for post 1", async () => {
    // Arrange
    const postId = 1;

    // Act
    const response = await postService.getPostComments(postId);

    // Assert
    AssertionExtensions.assertStatusCode(response, 200);

    const comments = await response.json();
    expect(comments.length).toBeGreaterThan(0);
    for (const comment of comments) {
      expect(comment.postId).toBe(postId);
      expect(comment.id).toBeGreaterThan(0);
      expect(comment.name).toBeTruthy();
      expect(comment.email).toBeTruthy();
      expect(comment.body).toBeTruthy();
    }
  });
});
