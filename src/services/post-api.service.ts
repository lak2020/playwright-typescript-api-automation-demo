import { APIRequestContext, APIResponse } from "@playwright/test";
import { CreatePostRequest, UpdatePostRequest } from "../models";
import { logger } from "../base";

/**
 * Service layer encapsulating all Post API operations (JSONPlaceholder /posts).
 * Follows the Service Object Pattern for clean test code.
 */
export class PostApiService {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * GET /posts — Retrieve all posts.
   */
  async getPosts(): Promise<APIResponse> {
    logger.info("GET /posts");
    return await this.request.get("/posts");
  }

  /**
   * GET /posts/{id} — Retrieve a single post by ID.
   */
  async getPostById(id: number): Promise<APIResponse> {
    logger.info(`GET /posts/${id}`);
    return await this.request.get(`/posts/${id}`);
  }

  /**
   * GET /posts?userId={userId} — Retrieve posts filtered by user.
   */
  async getPostsByUserId(userId: number): Promise<APIResponse> {
    logger.info(`GET /posts?userId=${userId}`);
    return await this.request.get(`/posts?userId=${userId}`);
  }

  /**
   * GET /posts/{id}/comments — Retrieve comments for a specific post.
   */
  async getPostComments(postId: number): Promise<APIResponse> {
    logger.info(`GET /posts/${postId}/comments`);
    return await this.request.get(`/posts/${postId}/comments`);
  }

  /**
   * POST /posts — Create a new post.
   */
  async createPost(post: CreatePostRequest): Promise<APIResponse> {
    logger.info(
      `POST /posts — Title: ${post.title}, UserId: ${post.userId}`
    );
    return await this.request.post("/posts", { data: post });
  }

  /**
   * PUT /posts/{id} — Full update of a post.
   */
  async updatePost(
    id: number,
    post: UpdatePostRequest
  ): Promise<APIResponse> {
    logger.info(`PUT /posts/${id} — Title: ${post.title}`);
    return await this.request.put(`/posts/${id}`, { data: post });
  }

  /**
   * PATCH /posts/{id} — Partial update of a post.
   */
  async patchPost(
    id: number,
    patchData: Record<string, unknown>
  ): Promise<APIResponse> {
    logger.info(`PATCH /posts/${id}`);
    return await this.request.patch(`/posts/${id}`, { data: patchData });
  }

  /**
   * DELETE /posts/{id} — Delete a post.
   */
  async deletePost(id: number): Promise<APIResponse> {
    logger.info(`DELETE /posts/${id}`);
    return await this.request.delete(`/posts/${id}`);
  }
}
