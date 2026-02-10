import { test, expect } from "@playwright/test";
import { PostApiService } from "../../src/services";
import { PostResponse, CreatePostRequest } from "../../src/models";
import { AssertionExtensions, TestDataGenerator } from "../../src/utils";

/**
 * Tests for POST /posts endpoint.
 * Covers: creating posts with valid data, random data, and data-driven tests.
 */
test.describe("Create Posts @posts @post", () => {
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

  test("POST /posts creates a new post and returns 201 @smoke", async () => {
    // Arrange
    const newPost: CreatePostRequest = {
      title: "Test Post Title",
      body: "This is the body of the test post.",
      userId: 1,
    };

    // Act
    const response = await postService.createPost(newPost);

    // Assert
    AssertionExtensions.assertStatusCode(response, 201);

    const result: PostResponse = await response.json();
    expect(result.title).toBe(newPost.title);
    expect(result.body).toBe(newPost.body);
    expect(result.userId).toBe(newPost.userId);
    expect(result.id).toBeGreaterThan(0);
  });

  test("POST /posts with random data creates post correctly @smoke", async () => {
    // Arrange
    const newPost = TestDataGenerator.generateCreatePostRequest();

    // Act
    const response = await postService.createPost(newPost);

    // Assert
    AssertionExtensions.assertStatusCode(response, 201);

    const result: PostResponse = await response.json();
    expect(result.title).toBe(newPost.title);
    expect(result.body).toBe(newPost.body);
    expect(result.userId).toBe(newPost.userId);
  });

  const testCases = [
    { title: "First Post", body: "Body of first post", userId: 1 },
    { title: "Second Post", body: "Body of second post", userId: 2 },
    { title: "Third Post", body: "Body of third post", userId: 3 },
  ];

  for (const { title, body, userId } of testCases) {
    test(`POST /posts works with data: ${title}`, async () => {
      // Arrange
      const newPost: CreatePostRequest = { title, body, userId };

      // Act
      const response = await postService.createPost(newPost);

      // Assert
      AssertionExtensions.assertStatusCode(response, 201);

      const result: PostResponse = await response.json();
      expect(result.title).toBe(title);
      expect(result.body).toBe(body);
      expect(result.userId).toBe(userId);
    });
  }
});
